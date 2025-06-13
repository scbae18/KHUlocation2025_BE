const Archive = require('../models/Archive');
const User = require('../models/User');

exports.uploadArchive = async (req, res) => {
  const { placeId, photoUrl } = req.body;
  const userId = req.user.id;

  if (!placeId || !photoUrl) {
    return res.status(400).json({ message: '필수 정보가 누락되었습니다.' });
  }

  try {
    // 아카이브 생성
    const archive = await Archive.create({ placeId, userId, photoUrl });

    // 유저 스탬프 수 증가
    const user = await User.findById(userId);
    user.stampCount = (user.stampCount || 0) + 1;

    // 칭호 변경 로직 (예시)
    if (user.stampCount >= 20) {
      user.title = '👑댕궁동 마스터';
    } else if (user.stampCount >= 11) {
      user.title = '🌟댕궁동 전문가';
    } else if (user.stampCount >= 6 ) {
        user.title = '🗺️댕궁동 탐험가'; 
    } else {
        user.title = '🐾댕궁동 입문자'
    }

    await user.save();

    res.status(201).json(archive);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '아카이브 업로드 실패' });
  }
};

exports.getMyArchives = async (req, res) => {
  try {
    const archives = await Archive.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(archives);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '내 아카이브 조회 실패' });
  }
};

exports.getAllArchives = async (req, res) => {
  try {
    const archives = await Archive.find().sort({ createdAt: -1 });
    res.json(archives);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '전체 아카이브 조회 실패' });
  }
};

exports.deleteArchive = async (req, res) => {
  const { id } = req.params;
  try {
    const archive = await Archive.findOne({ _id: id, userId: req.user.id });
    if (!archive) return res.status(404).json({ message: '아카이브를 찾을 수 없습니다.' });

    await archive.deleteOne();
    res.json({ message: '삭제 완료' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '아카이브 삭제 실패' });
  }
};
