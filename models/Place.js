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
  photoUrl: String,
  category: String,      // ✅ 추가: "산책코스" 같은 분류
  radius: Number,        // ✅ 추가: 원 표시용 반경
  detail: String         // ✅ 추가: 상세 설명
}, { timestamps: true });

module.exports = placeConnection.model('Place', placeSchema);
