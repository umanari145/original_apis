import { Router } from 'express';
import * as prefController from '../controllers/prefController';

const router = Router();

/**
 * @route   GET /api/prefs
 * @desc    全都道府県を取得
 * @access  Public
 */
router.get('/', prefController.getAllPrefs);

/**
 * @route   GET /api/prefs/:prefCode
 * @desc    都道府県コードで都道府県を取得
 * @access  Public
 */
router.get('/:prefCode', prefController.getPrefByCode);

export default router;
