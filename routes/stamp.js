const express = require('express');
const router = express.Router();
const stampController = require('../controllers/stampController');
const authMiddleware = require('../middleware/authMiddleware');

/**
 * @swagger
 * /stamps/{placeId}:
 *   post:
 *     summary: 장소 스탬프 찍기
 *     tags: [Stamps]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: placeId
 *         required: true
 *         schema:
 *           type: string
 *         description: 장소 ID
 *     responses:
 *       201:
 *         description: 스탬프 저장 성공
 *       400:
 *         description: 이미 찍은 장소
 */
router.post('/:placeId', authMiddleware, stampController.createStamp);

/**
 * @swagger
 * /stamps:
 *   get:
 *     summary: 내가 찍은 장소 목록 조회
 *     tags: [Stamps]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 장소 목록 반환
 */
router.get('/', authMiddleware, stampController.getMyStamps);

/**
 * @swagger
 * /stamps/status:
 *   get:
 *     summary: 내 칭호와 스탬프 수 조회
 *     tags: [Stamps]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 칭호와 스탬프 수 반환
 */
router.get('/status', authMiddleware, stampController.getStampStatus);

module.exports = router;
