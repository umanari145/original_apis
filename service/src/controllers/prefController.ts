import { Request, Response, NextFunction } from 'express';
import * as prefService from '../services/prefService';
import { AppError } from '../middleware/errorHandler';

/**
 * GET /api/prefs
 * 全都道府県を取得
 */
export const getAllPrefs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const prefs = await prefService.getAllPrefs();

    res.status(200).json({
      success: true,
      count: prefs.length,
      data: prefs,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/prefs/:prefCode
 * 都道府県コードで都道府県を取得
 */
export const getPrefByCode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { prefCode } = req.params;

    const pref = await prefService.getPrefByCode(prefCode);

    if (!pref) {
      throw new AppError(`Prefecture with code ${prefCode} not found`, 404);
    }

    res.status(200).json({
      success: true,
      data: pref,
    });
  } catch (error) {
    next(error);
  }
};
