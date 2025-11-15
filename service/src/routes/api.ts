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
 * @route   GET /api/town/zip/:zipCode
 * @desc    都道府県コードから市区町村を取得
 * @param   prefCode: 都道府県コード（2桁）
 * @access  Public
 */
 router.get('/town/zip/:zipCode', cityController.getCityByZipCode);


 /**
 * @route   GET /api/cities/pref:prefCode
 * @desc    都道府県コードから市区町村を取得
 * @param   prefCode: 都道府県コード（2桁）
 * @access  Public
 */
router.get('/cities/pref/:prefCode', cityController.getCitiesByPrefCode);

/**
 * @route   GET /api/towns/:word
 * @desc    郵便番号で市区町村を取得
 * @param   word 任意の文字列
 * @access  Public
 */
 router.get('/towns/:word', cityController.getCitiesByWord);
export default router;
