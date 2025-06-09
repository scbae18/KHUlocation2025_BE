const { placeConnection } = require('../config/db');
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  placeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Place',
    required: true
  },
  author: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = placeConnection.model('Review', reviewSchema);
