const express = require('express');
const { protect } = require('../middleware/auth');
const {
  getConversations,
  getMessages,
  sendMessage,
  createConversation
} = require('../controllers/messageController');

const router = express.Router();

// Protect all routes
router.use(protect);

router.get('/conversations', getConversations);
router.get('/conversations/:conversationId/messages', getMessages);
router.post('/conversations/:conversationId/messages', sendMessage);
router.post('/conversations', createConversation);

module.exports = router; 