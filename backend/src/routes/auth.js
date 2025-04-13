const express = require('express');
const { protect } = require('../middleware/auth');
const {
  register,
  login,
  logout,
  refreshAccessToken,
  updatePassword
} = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/refresh-token', refreshAccessToken);
router.patch('/update-password', protect, updatePassword);

module.exports = router; 