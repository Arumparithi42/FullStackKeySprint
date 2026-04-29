const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    uid: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      default: '',
    },
    bio: {
      type: String,
      default: '',
    },
    location: {
      type: String,
      default: '',
    },
    stats: {
      wpm: {
        type: Number,
        default: 0,
      },
      accuracy: {
        type: Number,
        default: 0,
      },
      weakestLetter: {
        type: String,
        default: '-',
      },
      totalTests: {
        type: Number,
        default: 0,
      },
      averageWpm: {
        type: Number,
        default: 0,
      },
      averageAccuracy: {
        type: Number,
        default: 0,
      },
      mostFrequentWeakLetter: {
        type: String,
        default: '-',
      },
    },
    testHistory: [{
      wpm: {
        type: Number,
      },
      accuracy: {
        type: Number,
      },
      weakestLetter: {
        type: String,
      },
      errors: {
        type: Number,
      },
      testDuration: {
        type: Number,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    }],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
