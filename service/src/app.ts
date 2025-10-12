import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

// エラーハンドラーのインポート
import { notFoundHandler, errorHandler } from './middleware/errorHandler';

// ルーターのインポート
import routes from './routes/api';

// 環境変数の読み込み
dotenv.config();

// Expressアプリケーションの初期化
const app: Application = express();

// ミドルウェアの設定
app.use(helmet()); // セキュリティヘッダー
app.use(cors()); // CORS設定
app.use(morgan('dev')); // ログ出力
app.use(express.json()); // JSONパース
app.use(express.urlencoded({ extended: true })); // URLエンコードされたデータのパース

// ヘルスチェックエンドポイント
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// APIルーティング
app.use('/api', routes);

// ルートエンドポイント
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Welcome to Original APIs',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      prefs: '/api/prefs',
      cities: '/api/cities'
    }
  });
});

// エラーハンドリング
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
