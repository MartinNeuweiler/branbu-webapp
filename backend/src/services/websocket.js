const jwt = require('jsonwebtoken');
const User = require('../models/user');

const clients = new Map();

const verifyClient = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    return user;
  } catch (error) {
    return null;
  }
};

const setupWebSocket = (wss) => {
  wss.on('connection', async (ws, req) => {
    const token = req.url.split('token=')[1];
    const user = await verifyClient(token);

    if (!user) {
      ws.close(4001, 'Unauthorized');
      return;
    }

    // Store client connection
    clients.set(user.id, ws);

    // Handle incoming messages
    ws.on('message', async (message) => {
      try {
        const data = JSON.parse(message);
        
        switch (data.type) {
          case 'message':
            handleMessage(user.id, data);
            break;
          case 'typing':
            handleTyping(user.id, data);
            break;
          default:
            console.warn('Unknown message type:', data.type);
        }
      } catch (error) {
        console.error('WebSocket message error:', error);
      }
    });

    // Handle client disconnect
    ws.on('close', () => {
      clients.delete(user.id);
    });

    // Send initial connection success
    ws.send(JSON.stringify({
      type: 'connection',
      status: 'connected',
      userId: user.id
    }));
  });
};

const handleMessage = async (senderId, data) => {
  try {
    // Save message to database
    const message = await saveMessage({
      senderId,
      receiverId: data.receiverId,
      content: data.content
    });

    // Send to receiver if online
    const receiverWs = clients.get(data.receiverId);
    if (receiverWs) {
      receiverWs.send(JSON.stringify({
        type: 'message',
        message
      }));
    }
  } catch (error) {
    console.error('Handle message error:', error);
  }
};

const handleTyping = (senderId, data) => {
  const receiverWs = clients.get(data.receiverId);
  if (receiverWs) {
    receiverWs.send(JSON.stringify({
      type: 'typing',
      senderId,
      isTyping: data.isTyping
    }));
  }
};

const saveMessage = async (messageData) => {
  const { db } = require('../config/database');
  
  const [message] = await db('messages')
    .insert({
      sender_id: messageData.senderId,
      receiver_id: messageData.receiverId,
      content: messageData.content
    })
    .returning('*');

  return message;
};

const broadcastToUser = (userId, data) => {
  const ws = clients.get(userId);
  if (ws) {
    ws.send(JSON.stringify(data));
  }
};

module.exports = {
  setupWebSocket,
  broadcastToUser
}; 