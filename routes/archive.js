const express = require('express');
const router = express.Router();
const multer = require('multer');
const auth = require('../middleware/authMiddleware');
const archiveController = require('../controllers/archiveController');

const upload = multer({ dest: 'uploads/' }); // 임시 파일 저장 위치

/**
 * @swagger
 * tags:
 *   name: Archives
 *   description: 댕궁동 아카이빙 API
 */

/**
 * @swagger
 * /archives:
 *   post:
 *     summary: 사진 URL 기반으로 장소 아카이빙 업로드 (구 방식)
 *     tags: [Archives]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - placeId
 *               - photoUrl
 *             properties:
 *               placeId:
 *                 type: string
 *                 example: 60f123abc456def789012345
 *               photoUrl:
 *                 type: string
 *                 example: https://example.com/photo.jpg
 *     responses:
 *       201:
 *         description: 아카이빙 성공
 *       400:
 *         description: 필수 정보 누락
 *       500:
 *         description: 서버 오류
 */
router.post('/', auth, archiveController.uploadArchive); // (구 방식 사용 시)

/**
 * @swagger
 * /archives/upload:
 *   post:
 *     summary: 사진 파일 기반으로 장소 아카이빙 업로드 (권장)
 *     tags: [Archives]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - placeId
 *               - photo
 *             properties:
 *               placeId:
 *                 type: string
 *                 description: 장소 ID
 *                 example: 60f123abc456def789012345
 *               photo:
 *                 type: string
 *                 format: binary
 *                 description: 업로드할 사진 파일
 *     responses:
 *       201:
 *         description: 파일 업로드 및 아카이빙 성공
 *       400:
 *         description: 필수 정보 누락
 *       500:
 *         description: 서버 오류
 */
router.post('/upload', auth, upload.single('photo'), archiveController.uploadArchive);

/**
 * @swagger
 * /archives/mine:
 *   get:
 *     summary: 내가 업로드한 아카이빙 사진 목록 조회
 *     tags: [Archives]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 아카이빙 목록 반환
 *       500:
 *         description: 서버 오류
 */
router.get('/mine', auth, archiveController.getMyArchives);

/**
 * @swagger
 * /archives/all:
 *   get:
 *     summary: 전체 아카이빙 사진 조회
 *     tags: [Archives]
 *     responses:
 *       200:
 *         description: 전체 사진 목록 반환
 *       500:
 *         description: 서버 오류
 */
router.get('/all', archiveController.getAllArchives);

/**
 * @swagger
 * /archives/{id}:
 *   delete:
 *     summary: 내가 업로드한 아카이빙 삭제
 *     tags: [Archives]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: 삭제할 아카이브의 ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 삭제 성공
 *       404:
 *         description: 아카이브를 찾을 수 없음
 *       500:
 *         description: 서버 오류
 */
router.delete('/:id', auth, archiveController.deleteArchive);

/**
 * @swagger
 * /archives/place/{placeId}:
 *   get:
 *     summary: 특정 장소의 아카이빙 사진 조회
 *     tags: [Archives]
 *     parameters:
 *       - in: path
 *         name: placeId
 *         required: true
 *         description: 조회할 장소 ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 해당 장소의 아카이브 목록 반환
 *       500:
 *         description: 서버 오류
 */
router.get('/place/:placeId', archiveController.getArchivesByPlace);

module.exports = router;
