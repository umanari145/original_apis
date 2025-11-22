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
 * @route   GET /api/pref/:prefCode
 * @desc    都道府県コードで都道府県を取得
 * @access  Public
 */
router.get('/prefs/:prefCode', prefController.getPrefByCode);

/**
 * @route   GET /api/pref/:prefCode/cities
 * @desc    都道府県に所属している市区町村が欲しい
 * @param   prefCode: 都道府県コード（2桁）
 * @access  Public
 */
 router.get('/prefs/:prefCode/cities', cityController.getCitiesByPrefCode);


 /**
 * @route   GET /api/cities/:cityCode
 * @desc    特定の市区町村コードにある市が欲しい
 * @param   prefCode: 都道府県コード（2桁）
 * @access  Public
 */
router.get('/cities/:cityCode', cityController.getCityByCityCode);

 /**
 * @route   GET /api/cities/:cityCode/towns
 * @desc    特定の市区町村のコードに所属している字
 * @param   prefCode: 都道府県コード（2桁）
 * @access  Public
 */
router.get('/cities/:cityCode/towns', cityController.getTownsByCityCode);

 /**
 * @route   GET /api/cities/pref:prefCode
 * @desc    字を郵便番号やキーワードで字を検索
 * @query   zip &keyword
 * @access  Public
 */
//router.get('/towns', cityController.getCitiesByPrefCode);


export default router;
