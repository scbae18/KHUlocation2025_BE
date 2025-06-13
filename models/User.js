const { userConnection } = require('../config/db');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  nickname: { type: String, required: true },

  stampCount: { type: Number, default: 0 },

  title: {
    type: String,
    default: '🐾댕궁동 입문자'
  }
}, { timestamps: true });

module.exports = userConnection.model('User', userSchema);
