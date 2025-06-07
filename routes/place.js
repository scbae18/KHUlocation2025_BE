const express = require('express');
const router = express.Router();
const placeController = require('../controllers/placeController');

/**
 * @swagger
 * /places:
 *   get:
 *     summary: 전체 장소 목록 조회
 *     tags: [Places]
 *     responses:
 *       200:
 *         description: 장소 목록 반환
 */
router.get('/', placeController.getPlaces);

/**
 * @swagger
 * /places/{id}:
 *   get:
 *     summary: 특정 장소 상세 조회
 *     tags: [Places]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: 장소 ObjectId
 *     responses:
 *       200:
 *         description: 장소 정보 반환
 *       404:
 *         description: 장소를 찾을 수 없음
 */
router.get('/:id', placeController.getPlaceById);

module.exports = router;
