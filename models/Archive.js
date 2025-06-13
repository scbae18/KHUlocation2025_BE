const mongoose = require('mongoose');
const { archiveConnection } = require('../config/db');

const archiveSchema = new mongoose.Schema({
  placeId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'Place'
  },
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  photoUrl: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = archiveConnection.model('Archive', archiveSchema);
