import { Request, Response, NextFunction } from 'express';
import * as cityService from '../services/cityService';
import { AppError } from '../middleware/errorHandler';


/**
 * GET /api/cities/:prefCode/prefCode
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
      data: cities,
    });
  } catch (error) {
    next(error);
  }
};


/**
 * GET /api/cities/:cityCode
 * 市区町村コードに合致した市区町村を取得
 */
export const getCityByCityCode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { cityCode } = req.params;

    if (cityCode.length < 5 || 6 < cityCode.length) {
      throw new AppError('Invalid City code', 400);
    }

    const city = await cityService.getCityByCityCode(cityCode);

    res.status(200).json({
      success: true,
      data: city,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/cities/:cityCode/towns
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

    const towns = await cityService.getTownByCityCode(
      formattedCityCode
    );

    if (towns.length === 0) {
      throw new AppError(
        `No cities found for prefecture  city code ${formattedCityCode}`, 
        404
      );
    }

    res.status(200).json({
      success: true,
      cityCode: formattedCityCode,
      data: towns,
    });
  } catch (error) {
    next(error);
  }
};


interface TownQueryParams {
  zip?: string;
  word?: string;
}

/**
 * GET /api/towns?zip=1001000&keyword=ああああ
 * 郵便番号で市区町村を取得
 */
export const getCityByQuery = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    // 修正後のコード
    let { zip, word } = req.query as TownQueryParams;

    // 文字列型であることを保証（trimも適用）
    const zipParam = typeof zip === 'string' ? zip.trim() : undefined;
    const wordParam = typeof word === 'string' ? word.trim() : undefined;

    // 両方ともない場合は400エラー
    if (!zipParam && !wordParam) {
      throw new AppError('検索パラメータ（zipまたはword）を指定してください', 400);
    }

    // 空文字列チェック（trimの結果が空の場合も考慮）
    if ((zipParam && zipParam.length === 0) && (wordParam && wordParam.length === 0)) {
      throw new AppError('検索パラメータ（zipまたはword）を指定してください', 400);
    }

    const towns = await cityService.getTownsByQuery(zipParam, wordParam);

    if (towns.length === 0) {
      throw new AppError(
        `No towns found`, 
        404
      );
    }

    res.status(200).json({
      success: true,
      data: towns,
    });
  } catch (error) {
    next(error);
  }
};
