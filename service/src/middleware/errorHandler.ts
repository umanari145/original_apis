import { Request, Response, NextFunction } from 'express';

// カスタムエラークラス
export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({
      error: 'Not Found',
      message: `Route ${req.originalUrl} not found`,
      timestamp: new Date().toISOString()
    });
  };
  
  // グローバルエラーハンドラー
  export const errorHandler = (
    err: Error | AppError,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    // デフォルトのステータスコード
    let statusCode = 500;
    let message = 'Internal Server Error';
  
    // AppErrorの場合
    if (err instanceof AppError) {
      statusCode = err.statusCode;
      message = err.message;
    }
  
    // Prismaエラーハンドリング
    if (err.name === 'PrismaClientKnownRequestError') {
      statusCode = 400;
      message = 'Database operation failed';
    }
  
    if (err.name === 'PrismaClientValidationError') {
      statusCode = 400;
      message = 'Invalid data provided';
    }
  
    // エラーログ出力
    console.error('Error:', {
      message: err.message,
      stack: err.stack,
      url: req.originalUrl,
      method: req.method,
      timestamp: new Date().toISOString()
    });
  
    // レスポンス
    res.status(statusCode).json({
      error: message,
      message: process.env.NODE_ENV === 'development' ? err.message : message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
      timestamp: new Date().toISOString()
    });
  };