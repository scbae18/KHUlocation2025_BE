const Place = require('../models/Place');

// 전체 장소 목록 조회
// 전체 장소 목록 조회
exports.getPlaces = async (req, res) => {
  try {
    const places = await Place.find({}, 'name coordinates detail address summary category hours phone instagram');

    // coordinates가 있고 lat/lng가 유효한 숫자인 경우만 필터링
    const validPlaces = places.filter(place =>
      place.coordinates &&
      typeof place.coordinates.lat === 'number' &&
      typeof place.coordinates.lng === 'number'
    );

    res.json(validPlaces);
  } catch (err) {
    res.status(500).json({ message: '장소 불러오기 실패' });
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
