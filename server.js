const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const placeRoutes = require('./routes/place');
const stampRoutes = require('./routes/stamp');
const reviewRoutes = require('./routes/reviews');
const archiveRoutes = require('./routes/archive');
const { userConnection, placeConnection } = require('./config/db');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./swagger');

dotenv.config();
const app = express();

const allowedOrigins = [
  'http://localhost:3000',              // ✅ 로컬 개발용
  'https://daenggoong.shop',
  'https://www.daenggoong.shop',
  'https://api.daenggoong.shop'
];


app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());

userConnection.once('open', () => {
  console.log('✅ 사용자 DB 연결 성공');
});
placeConnection.once('open', () => {
  console.log('✅ 장소 DB 연결 성공');
});

app.use(express.json({limit:"20mb"}));
app.use(express.urlencoded({ extended:true, limit:"20mb"}));
app.use('/auth', authRoutes);
app.use('/places', placeRoutes);
app.use('/stamps', stampRoutes);
app.use('/reviews', reviewRoutes);
app.use('/archives', archiveRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`서버 실행 중: ${PORT}`));
