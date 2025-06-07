const { userConnection } = require('../config/db');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  nickname: { type: String, required: true },
  title: { type: String, default: '견생 입문자' }
}, { timestamps: true });

module.exports = userConnection.model('User', userSchema);
