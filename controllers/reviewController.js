const Review = require('../models/Review');

// 리뷰 작성
exports.createReview = async (req, res) => {
  const { placeId } = req.params;
  const { content } = req.body;

  if (!content?.trim()) {
    return res.status(400).json({ message: '내용이 비어 있습니다.' });
  }

  try {
    const review = await Review.create({
      placeId,
      author: req.user.nickname,
      content,
    });
    res.status(201).json(review);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '리뷰 작성 실패' });
  }
};

// 리뷰 목록 조회
exports.getReviews = async (req, res) => {
  const { placeId } = req.params;

  try {
    const reviews = await Review.find({ placeId }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '리뷰 불러오기 실패' });
  }
};
