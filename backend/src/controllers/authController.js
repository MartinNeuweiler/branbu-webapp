const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const User = require('../models/user');
const { AppError } = require('../middleware/errorHandler');
const { db } = require('../config/database');
const { catchAsync } = require('../middleware/errorHandler');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION
  });
};

const createRefreshToken = async (userId) => {
  const token = uuidv4();
  const expiresAt = new Date(Date.now() + parseInt(process.env.REFRESH_TOKEN_EXPIRATION) * 24 * 60 * 60 * 1000);

  await db('refresh_tokens').insert({
    user_id: userId,
    token,
    expires_at: expiresAt
  });

  return token;
};

exports.register = catchAsync(async (req, res, next) => {
  const { email, password, name, type } = req.body;

  // Check if user exists
  const existingUser = await User.findByEmail(email);
  if (existingUser) {
    return next(new AppError(400, 'Email already in use'));
  }

  // Create user
  const user = await User.create({
    email,
    password,
    role: 'user'
  });

  // Create profile
  await User.updateProfile(user.id, {
    name,
    type
  });

  // Generate tokens
  const token = signToken(user.id);
  const refreshToken = await createRefreshToken(user.id);

  res.status(201).json({
    status: 'success',
    data: {
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      },
      token,
      refreshToken
    }
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password exist
  if (!email || !password) {
    return next(new AppError(400, 'Please provide email and password'));
  }

  // Check if user exists & password is correct
  const user = await User.findByEmail(email);
  if (!user || !(await User.comparePasswords(password, user.password))) {
    return next(new AppError(401, 'Incorrect email or password'));
  }

  // Generate tokens
  const token = signToken(user.id);
  const refreshToken = await createRefreshToken(user.id);

  // Update last login
  await db('users')
    .where({ id: user.id })
    .update({
      last_login_at: db.fn.now()
    });

  res.json({
    status: 'success',
    data: {
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      },
      token,
      refreshToken
    }
  });
});

exports.logout = catchAsync(async (req, res) => {
  const { refreshToken } = req.body;

  if (refreshToken) {
    await db('refresh_tokens')
      .where({ token: refreshToken })
      .delete();
  }

  res.json({
    status: 'success',
    message: 'Logged out successfully'
  });
});

exports.refreshAccessToken = catchAsync(async (req, res, next) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return next(new AppError(400, 'Refresh token is required'));
  }

  // Verify refresh token
  const tokenData = await db('refresh_tokens')
    .where({
      token: refreshToken
    })
    .where('expires_at', '>', db.fn.now())
    .first();

  if (!tokenData) {
    return next(new AppError(401, 'Invalid or expired refresh token'));
  }

  // Generate new access token
  const token = signToken(tokenData.user_id);

  res.json({
    status: 'success',
    data: {
      token
    }
  });
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;

  // Get user
  const user = await User.findById(req.user.id);

  // Check current password
  if (!(await User.comparePasswords(currentPassword, user.password))) {
    return next(new AppError(401, 'Current password is incorrect'));
  }

  // Update password
  await User.updatePassword(user.id, newPassword);

  // Generate new tokens
  const token = signToken(user.id);
  const refreshToken = await createRefreshToken(user.id);

  res.json({
    status: 'success',
    data: {
      token,
      refreshToken
    }
  });
}); 