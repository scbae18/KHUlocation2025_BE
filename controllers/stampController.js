const Stamp = require('../models/Stamp');
const User = require('../models/User');
const Place = require('../models/Place');

exports.createStamp = async (req, res) => {
  try {
    const userId = req.user.id;
    const placeId = req.params.placeId;

    // 이미 찍은 적 있는지 확인
    const existing = await Stamp.findOne({ userId, placeId });
    if (existing) {
      return res.status(400).json({ message: '이미 이 장소에 스탬프를 찍었습니다.' });
    }

    // 새로운 스탬프 찍기
    const stamp = await Stamp.create({ userId, placeId });

    // 유저의 스탬프 개수 조회
    const count = await Stamp.countDocuments({ userId });

    // 칭호 자동 갱신 로직 (예시)
    let title = '견생 입문자';
    if (count<= 3) title = '산책 초보';
    if (count >= 5) title = '산책 중독자';
    if (count >= 10) title = '행궁동 마스터';

    await User.findByIdAndUpdate(userId, { title });

    res.status(201).json({ message: '스탬프가 찍혔습니다.', stamp });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '스탬프 찍기에 실패했습니다.' });
  }
};

exports.getMyStamps = async (req, res) => {
  try {
    const userId = req.user.id;

    // 스탬프 목록 조회 + 장소 정보 함께 (populate)
    const stamps = await Stamp.find({ userId }).populate('placeId', 'name address');

    const result = stamps.map(stamp => ({
      placeId: stamp.placeId._id,
      name: stamp.placeId.name,
      address: stamp.placeId.address,
      visitedAt: stamp.createdAt
    }));

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '스탬프 목록 조회 실패' });
  }
};

exports.getStampStatus = async (req, res) => {
  try {
    const userId = req.user.id;

    const count = await Stamp.countDocuments({ userId });
    const user = await User.findById(userId);

    res.json({
      nickname: user.nickname,
      title: user.title,
      totalStamps: count
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '스탬프 상태 조회 실패' });
  }
};
