const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: 유저 회원가입
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - nickname
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               nickname:
 *                 type: string
 *     responses:
 *       201:
 *         description: 회원가입 성공
 */
router.post('/register', authController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: 유저 로그인
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: 로그인 성공
 */
router.post('/login', authController.login);

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: 현재 로그인한 사용자 정보 조회
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 사용자 정보 반환
 */
router.get('/me', authMiddleware, authController.getMe);

/**
 * @swagger
 * /get/{id}:
 *   get:
 *     summary: 사용자 정보 조회
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: 사용자 ObjectId (MongoDB _id)
 *     responses:
 *       200:
 *         description: 사용자 정보 조회 성공
 *         schema:
 *           type: object
 *           properties:
 *             nickname:
 *               type: string
 *               example: 닉네임
 *             stampCount:
 *               type: integer
 *               example: 8
 *             title:
 *               type: string
 *               example: 🗺️댕궁동 탐험가
 *       404:
 *         description: 사용자를 찾을 수 없음
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: User not found
 *       500:
 *         description: 서버 오류
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: 서버 오류로 인해 유저 정보를 불러올 수 없습니다.
 */

router.get('/get/:id',authController.getUser)

module.exports = router;
