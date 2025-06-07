const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const placeRoutes = require('./routes/place');
const stampRoutes = require('./routes/stamp');
const { userConnection, placeConnection } = require('./config/db');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./swagger');

dotenv.config();
const app = express();
app.use(cors());

app.use(express.json());

userConnection.once('open', () => {
  console.log('✅ 사용자 DB 연결 성공');
});
placeConnection.once('open', () => {
  console.log('✅ 장소 DB 연결 성공');
});

app.use('/auth', authRoutes);
app.use('/places', placeRoutes);
app.use('/stamps', stampRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`서버 실행 중: ${PORT}`));
