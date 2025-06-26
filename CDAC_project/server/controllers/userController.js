import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  // Check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      sharingCode: user.sharingCode,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for user email
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      sharingCode: user.sharingCode,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      sharingCode: user.sharingCode,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Find user by sharing code
// @route   GET /api/users/code/:code
// @access  Private
const getUserBySharingCode = asyncHandler(async (req, res) => {
  const { code } = req.params;

  const user = await User.findOne({ sharingCode: code });

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error('User not found with this sharing code');
  }
});

// @desc    Regenerate sharing code
// @route   PUT /api/users/regenerate-code
// @access  Private
const regenerateSharingCode = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    const newCode = user.regenerateSharingCode();
    await user.save();

    res.json({
      sharingCode: newCode,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export {
  registerUser,
  loginUser,
  getUserProfile,
  getUserBySharingCode,
  regenerateSharingCode,
};