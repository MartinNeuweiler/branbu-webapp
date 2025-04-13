const { db } = require('../config/database');
const { AppError } = require('../middleware/errorHandler');
const { catchAsync } = require('../middleware/errorHandler');
const { broadcastToUser } = require('../services/websocket');

exports.getConversations = catchAsync(async (req, res) => {
  const userId = req.user.id;

  const conversations = await db('conversations')
    .select(
      'conversations.*',
      'creator_profile.name as creator_name',
      'brand_profile.name as brand_name'
    )
    .leftJoin('profiles as creator_profile', 'conversations.creator_id', 'creator_profile.user_id')
    .leftJoin('profiles as brand_profile', 'conversations.brand_id', 'brand_profile.user_id')
    .where('creator_id', userId)
    .orWhere('brand_id', userId)
    .orderBy('conversations.updated_at', 'desc');

  res.json({
    status: 'success',
    data: {
      conversations
    }
  });
});

exports.getMessages = catchAsync(async (req, res, next) => {
  const { conversationId } = req.params;
  const userId = req.user.id;

  // Verify conversation access
  const conversation = await db('conversations')
    .where('id', conversationId)
    .where(function() {
      this.where('creator_id', userId).orWhere('brand_id', userId);
    })
    .first();

  if (!conversation) {
    return next(new AppError(404, 'Conversation not found'));
  }

  const messages = await db('messages')
    .where('conversation_id', conversationId)
    .orderBy('created_at', 'asc');

  // Mark messages as read
  await db('messages')
    .where({
      conversation_id: conversationId,
      receiver_id: userId,
      read: false
    })
    .update({
      read: true,
      updated_at: db.fn.now()
    });

  res.json({
    status: 'success',
    data: {
      messages
    }
  });
});

exports.sendMessage = catchAsync(async (req, res, next) => {
  const { conversationId, content } = req.body;
  const senderId = req.user.id;

  // Verify conversation access
  const conversation = await db('conversations')
    .where('id', conversationId)
    .where(function() {
      this.where('creator_id', senderId).orWhere('brand_id', senderId);
    })
    .first();

  if (!conversation) {
    return next(new AppError(404, 'Conversation not found'));
  }

  // Determine receiver
  const receiverId = conversation.creator_id === senderId
    ? conversation.brand_id
    : conversation.creator_id;

  // Create message
  const [message] = await db('messages')
    .insert({
      conversation_id: conversationId,
      sender_id: senderId,
      receiver_id: receiverId,
      content
    })
    .returning('*');

  // Update conversation timestamp
  await db('conversations')
    .where('id', conversationId)
    .update({
      updated_at: db.fn.now()
    });

  // Broadcast to receiver if online
  broadcastToUser(receiverId, {
    type: 'new_message',
    message
  });

  res.status(201).json({
    status: 'success',
    data: {
      message
    }
  });
});

exports.createConversation = catchAsync(async (req, res, next) => {
  const { partnerId } = req.body;
  const userId = req.user.id;

  // Check if conversation already exists
  const existingConversation = await db('conversations')
    .where(function() {
      this.where(function() {
        this.where('creator_id', userId).andWhere('brand_id', partnerId);
      }).orWhere(function() {
        this.where('creator_id', partnerId).andWhere('brand_id', userId);
      });
    })
    .first();

  if (existingConversation) {
    return res.json({
      status: 'success',
      data: {
        conversation: existingConversation
      }
    });
  }

  // Get user types
  const [userProfile, partnerProfile] = await Promise.all([
    db('profiles').where('user_id', userId).first(),
    db('profiles').where('user_id', partnerId).first()
  ]);

  if (!userProfile || !partnerProfile) {
    return next(new AppError(404, 'User profile not found'));
  }

  // Create new conversation
  const [conversation] = await db('conversations')
    .insert({
      creator_id: userProfile.type === 'creator' ? userId : partnerId,
      brand_id: userProfile.type === 'brand' ? userId : partnerId,
      status: 'active'
    })
    .returning('*');

  res.status(201).json({
    status: 'success',
    data: {
      conversation
    }
  });
}); 