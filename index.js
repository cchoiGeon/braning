import express from 'express';
import { indexRouter } from './src/route/index.js';
import { db } from './model/index.js';
import cached from './src/cached/cached.js';
cached.init();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/braining/v1', indexRouter);  // 라우트 파일 사용

const PORT = 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
