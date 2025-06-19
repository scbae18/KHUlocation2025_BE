const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: '행궁동 반려견 지도 API',
      version: '1.0.0',
      description: '유저 인증 / 장소 정보 / 스탬프 기능 등 API 문서',
    },
    servers: [
      {
        url: 'http://api.daenggoong.shop',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./routes/*.js'], // Swagger 주석이 있는 파일 경로
};

const specs = swaggerJsdoc(options);
module.exports = specs;
