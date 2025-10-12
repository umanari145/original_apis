import { Router } from 'express';
import * as prefController from '../controllers/prefController';
import * as cityController from '../controllers/cityController';

const router = Router();

/**
 * @route   GET /api/prefs
 * @desc    全都道府県を取得
 * @access  Public
 */
router.get('/prefs', prefController.getAllPrefs);

/**
 * @route   GET /api/prefs/:prefCode
 * @desc    都道府県コードで都道府県を取得
 * @access  Public
 */
router.get('/prefs/:prefCode', prefController.getPrefByCode);

/**
 * @route   GET /api/city/zip/:zipCode
 * @desc    郵便番号で市区町村を取得
 * @param   zipCode: 郵便番号（7桁）
 * @access  Public
 */
router.get('/city/zip/:zipCode', cityController.getCityByZipCode);

/**
 * @route   GET /api/town/:cityCode
 * @desc    郵便番号で市区町村を取得
 * @param   zipCode: 郵便番号（7桁）
 * @access  Public
 */
 router.get('/town/:cityCode', cityController.getTownsByCityCode);
export default router;
