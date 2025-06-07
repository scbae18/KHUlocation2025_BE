const Place = require('../models/Place');

// 전체 장소 목록 조회
exports.getPlaces = async (req, res) => {
  try {
    const places = await Place.find({}, 'name'); // ← 'name' 필드만 가져오기
    res.json(places);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '장소 목록을 불러오지 못했습니다.' });
  }
};

// 특정 장소 상세 조회
exports.getPlaceById = async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);
    if (!place) return res.status(404).json({ message: '장소를 찾을 수 없습니다.' });

    res.json(place);
  } catch (err) {
    res.status(500).json({ message: '장소 상세 정보를 가져오는 데 실패했습니다.' });
  }
};
