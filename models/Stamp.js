const mongoose = require('mongoose');
const { placeConnection } = require('../config/db');

const stampSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  placeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Place', required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = placeConnection.model('Stamp', stampSchema);
