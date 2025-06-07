const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { email, password, nickname } = req.body;

    if (!email || !password || !nickname)
      return res.status(400).json({ message: '모든 필드를 입력해주세요.' });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: '이미 존재하는 이메일입니다.' });

    const hashedPw = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashedPw, nickname });

    res.status(201).json({ message: '회원가입 성공' });
  } catch (err) {
    res.status(500).json({ message: '서버 오류' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: '존재하지 않는 사용자입니다.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: '비밀번호가 틀립니다.' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({ token, user: { id: user._id, nickname: user.nickname, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: '서버 오류' });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: '서버 오류' });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '서버 오류' });
  }
};