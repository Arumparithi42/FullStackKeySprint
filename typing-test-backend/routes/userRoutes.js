const express = require('express');
const router = express.Router();
const User = require('../models/User');
const crypto = require('crypto');

// Helper function to hash password (simple, use bcrypt in production)
const hashPassword = (password) => {
  return crypto.createHash('sha256').update(password).digest('hex');
};

// Register endpoint
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Username, email, and password are required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Create new user
    const uid = crypto.randomUUID();
    const hashedPassword = hashPassword(password);

    const user = new User({
      uid,
      username,
      email,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).json({ uid, username, email });
  } catch (error) {
    res.status(500).json({ message: 'Error during registration', error: error.message });
  }
});

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const hashedPassword = hashPassword(password);
    if (user.password !== hashedPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.json({ uid: user.uid, username: user.username, email: user.email });
  } catch (error) {
    res.status(500).json({ message: 'Error during login', error: error.message });
  }
});

// Get user profile and stats
router.get('/user/:uid', async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.params.uid });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error: error.message });
  }
});

// Create or update user
router.post('/user', async (req, res) => {
  try {
    const { uid, username, email, phone = '', bio = '', location = '' } = req.body;

    if (!uid || !username || !email) {
      return res.status(400).json({ message: 'uid, username, and email are required' });
    }

    let user = await User.findOne({ uid });
    if (user) {
      user.username = username;
      user.email = email;
      user.phone = phone;
      user.bio = bio;
      user.location = location;
      user.updatedAt = new Date();
      await user.save();
    } else {
      user = new User({
        uid,
        username,
        email,
        phone,
        bio,
        location,
      });
      await user.save();
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error creating/updating user', error: error.message });
  }
});

// Update user stats
router.put('/user/:uid/stats', async (req, res) => {
  try {
    const { wpm, accuracy, weakestLetter } = req.body;

    let user = await User.findOne({ uid: req.params.uid });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update current test stats
    user.stats.wpm = wpm || user.stats.wpm;
    user.stats.accuracy = accuracy || user.stats.accuracy;
    user.stats.weakestLetter = weakestLetter || user.stats.weakestLetter;

    // Calculate total tests and averages
    user.stats.totalTests = (user.stats.totalTests || 0) + 1;
    user.stats.averageWpm = Math.round(
      (user.stats.averageWpm * (user.stats.totalTests - 1) + wpm) / user.stats.totalTests
    );
    user.stats.averageAccuracy = Math.round(
      (user.stats.averageAccuracy * (user.stats.totalTests - 1) + accuracy) / user.stats.totalTests
    );

    user.updatedAt = new Date();
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error updating stats', error: error.message });
  }
});

// Get user stats only
router.get('/user/:uid/stats', async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.params.uid });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user.stats);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stats', error: error.message });
  }
});

// Change password endpoint
router.post('/change-password', async (req, res) => {
  try {
    const { uid, currentPassword, newPassword } = req.body;

    if (!uid || !currentPassword || !newPassword) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const hashedCurrentPassword = hashPassword(currentPassword);
    if (user.password !== hashedCurrentPassword) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }

    user.password = hashPassword(newPassword);
    user.updatedAt = new Date();
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating password', error: error.message });
  }
});

module.exports = router;
