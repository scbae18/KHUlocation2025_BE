const { placeConnection } = require('../config/db');
const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  address: String,
  coordinates: {
    lat: Number,
    lng: Number,
  },
  photoUrl: String
}, { timestamps: true });

module.exports = placeConnection.model('Place', placeSchema);
