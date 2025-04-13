const jwt = require('jsonwebtoken');
const { AppError } = require('./errorHandler');
const { promisify } = require('util');

const protect = async (req, res, next) => {
  try {
    // 1) Get token from header
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(new AppError(401, 'You are not logged in. Please log in to get access.'));
    }

    // 2) Verify token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3) Check if user still exists
    const User = require('../models/user');
    const currentUser = await User.findById(decoded.id);
    
    if (!currentUser) {
      return next(new AppError(401, 'The user belonging to this token no longer exists.'));
    }

    // 4) Check if user changed password after the token was issued
    if (currentUser.changedPasswordAfter(decoded.iat)) {
      return next(new AppError(401, 'User recently changed password. Please log in again.'));
    }

    // Grant access to protected route
    req.user = currentUser;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return next(new AppError(401, 'Invalid token. Please log in again.'));
    }
    if (error.name === 'TokenExpiredError') {
      return next(new AppError(401, 'Your token has expired. Please log in again.'));
    }
    next(error);
  }
};

const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError(403, 'You do not have permission to perform this action'));
    }
    next();
  };
};

const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    
    if (!refreshToken) {
      return next(new AppError(400, 'Refresh token is required'));
    }

    const decoded = await promisify(jwt.verify)(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    
    const User = require('../models/user');
    const user = await User.findById(decoded.id);
    
    if (!user) {
      return next(new AppError(401, 'Invalid refresh token'));
    }

    // Generate new access token
    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION
    });

    res.json({
      status: 'success',
      accessToken
    });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return next(new AppError(401, 'Refresh token has expired. Please log in again.'));
    }
    next(error);
  }
};

module.exports = {
  protect,
  restrictTo,
  refreshToken
}; 