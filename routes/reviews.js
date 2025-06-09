const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const reviewController = require('../controllers/reviewController');

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: 장소 리뷰 관련 API
 */

/**
 * @swagger
 * /reviews/{placeId}/reviews:
 *   post:
 *     summary: 특정 장소에 리뷰 작성
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: placeId
 *         required: true
 *         schema:
 *           type: string
 *         description: 리뷰를 작성할 장소의 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: 리뷰 내용
 *     responses:
 *       201:
 *         description: 리뷰 작성 성공
 *       400:
 *         description: 잘못된 요청
 *       401:
 *         description: 인증 실패
 *       500:
 *         description: 서버 오류
 */
router.post('/:placeId/reviews', authMiddleware, reviewController.createReview);

/**
 * @swagger
 * /reviews/{placeId}/reviews:
 *   get:
 *     summary: 특정 장소의 리뷰 목록 조회
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: placeId
 *         required: true
 *         schema:
 *           type: string
 *         description: 리뷰를 조회할 장소의 ID
 *     responses:
 *       200:
 *         description: 리뷰 목록 조회 성공
 *       500:
 *         description: 서버 오류
 */
router.get('/:placeId/reviews', reviewController.getReviews);

module.exports = router;
