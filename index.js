import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger/swagger.js'; 
import { indexRouter } from './src/route/index.js';
import { db } from './model/index.js';
import cached from './src/util/cached.js';
import logger from './src/util/logging.js';

cached.init();
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  morgan('tiny', {
    stream: {
      write: (message) => logger.http(message.trim()),
    },
    skip: (req, res) => req.url === '/',
  })
);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => res.status(200).send());
app.get('/braining', (req, res) => {
    res.status(200).json({
        android: { major: 0, minor: 0, patch: 1 },
        ios: { major: 0, minor: 0, patch: 1 },
        maintenance: !1,
    });
});
app.use('/braining/v1', indexRouter);  // 라우트 파일 사용
app.use((req, res, next) => { // 정의되지 않은 라우트에 대한 에러 처리 (404 처리)
  return res.status(404).json({
    error: "NotFound"
  })
});
app.listen(PORT, () => logger.info(`Server is running on port ${PORT}`));
