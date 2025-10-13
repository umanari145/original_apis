import { Request, Response, NextFunction } from 'express';
import * as cityService from '../services/cityService';
import { AppError } from '../middleware/errorHandler';


/**
 * GET /api/cities/pref/:prefCode
 * 都道府県コードに合致した市区町村を取得
 */
 export const getCitiesByPrefCode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { prefCode } = req.params;

    const prefCodeNum = parseInt(prefCode)
    if (isNaN(prefCodeNum) || prefCodeNum < 1 || prefCodeNum > 47) {
      throw new AppError('Invalid Pref code', 400);
    }

    const formattedPrefCode = prefCode.padStart(2, '0');

    const cities = await cityService.getCitiesByPrefCode(
      formattedPrefCode
    );

    res.status(200).json({
      success: true,
      count: 0,
      data: cities,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/town/:cityCode
 * 都道府県コードに合致した市区町村を取得
 */
export const getTownsByCityCode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { cityCode } = req.params;

    const cityCodeNum = parseInt(cityCode)
    if (isNaN(cityCodeNum)) {
      throw new AppError('Invalid city code', 400);
    }

    const formattedCityCode = cityCode.padStart(5, '0');

    const cities = await cityService.getTownByCityCode(
      formattedCityCode
    );

    if (cities.length === 0) {
      throw new AppError(
        `No cities found for prefecture  city code ${formattedCityCode}`, 
        404
      );
    }

    res.status(200).json({
      success: true,
      count: cities.length,
      cityCode: formattedCityCode,
      data: cities,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/cities/zip/:zipCode
 * 郵便番号で市区町村を取得
 */
export const getCityByZipCode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { zipCode } = req.params;

    const cities = await cityService.getCityByZipCode(zipCode);

    if (cities.length === 0) {
      throw new AppError(`No cities found for zip code ${zipCode}`, 404);
    }

    res.status(200).json({
      success: true,
      count: cities.length,
      zipCode,
      data: cities,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/cities
 * 全市区町村を取得（ページネーション対応）
 */
export const getAllCities = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 100;

    // バリデーション
    if (page < 1) {
      throw new AppError('Page number must be greater than 0', 400);
    }
    if (limit < 1 || limit > 1000) {
      throw new AppError('Limit must be between 1 and 1000', 400);
    }

    const skip = (page - 1) * limit;
    const { cities, total } = await cityService.getAllCities(skip, limit);

    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      success: true,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
      data: cities,
    });
  } catch (error) {
    next(error);
  }
};
