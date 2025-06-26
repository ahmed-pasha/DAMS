import express from 'express';
import {
  uploadAsset,
  getAssets,
  getAssetById,
  updateAsset,
  deleteAsset,
  shareAsset,
  unshareAsset,
} from '../controllers/assetController.js';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router
  .route('/')
  .post(protect, upload.single('file'), uploadAsset)
  .get(protect, getAssets);

router
  .route('/:id')
  .get(protect, getAssetById)
  .put(protect, updateAsset)
  .delete(protect, deleteAsset);

router.post('/:id/share', protect, shareAsset);
router.post('/:id/unshare', protect, unshareAsset);

export default router;