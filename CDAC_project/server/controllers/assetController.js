import asyncHandler from 'express-async-handler';
import path from 'path';
import fs from 'fs';
import Asset from '../models/assetModel.js';
import User from '../models/userModel.js';

// Helper function to determine asset type
const getAssetType = (mimetype) => {
  if (mimetype.startsWith('image/')) return 'image';
  if (mimetype.startsWith('video/')) return 'video';
  if (mimetype.startsWith('audio/')) return 'audio';
  if (
    mimetype.includes('pdf') ||
    mimetype.includes('document') ||
    mimetype.includes('text/') ||
    mimetype.includes('application/vnd')
  )
    return 'document';
  return 'other';
};

// @desc    Upload asset
// @route   POST /api/assets
// @access  Private
const uploadAsset = asyncHandler(async (req, res) => {
  try {
    if (!req.file) {
      res.status(400);
      throw new Error('No file uploaded');
    }

    // Check if file size exceeds 10GB (10 * 1024 * 1024 * 1024 bytes)
    const TEN_GB = 10 * 1024 * 1024 * 1024;
    if (req.file.size > TEN_GB) {
      // Check if user has payment verified (mock check, replace with real logic)
      const userHasPaid = req.user.hasPaidForLargeUploads || false;

      if (!userHasPaid) {
        res.status(402); // Payment Required
        throw new Error('File size exceeds 10GB. Payment required to upload large files.');
      }
    }

    const assetType = getAssetType(req.file.mimetype);

    const asset = await Asset.create({
      fileName: req.file.originalname,
      fileSize: req.file.size,
      fileType: req.file.mimetype,
      assetType,
      url: `/uploads/${req.file.filename}`,
      uploadedBy: req.user._id,
    });

    res.status(201).json(asset);
  } catch (error) {
    console.error('Upload asset error:', error);
    res.status(error.statusCode || 500).json({ message: error.message || 'Server error during file upload' });
  }
});

// @desc    Get all assets for a user
// @route   GET /api/assets
// @access  Private
const getAssets = asyncHandler(async (req, res) => {
  const { type, query } = req.query;
  let filter = { uploadedBy: req.user._id };

  // Add asset type filter if provided
  if (type && type !== 'all') {
    filter.assetType = type;
  }

  // Add search query if provided
  if (query) {
    filter.$text = { $search: query };
  }

  // Also include assets shared with the user
  const assets = await Asset.find({
    $or: [filter, { sharedWith: req.user._id }],
  })
    .populate('uploadedBy', 'name email')
    .sort({ createdAt: -1 });

  res.json(assets);
});

// @desc    Get asset by ID
// @route   GET /api/assets/:id
// @access  Private
const getAssetById = asyncHandler(async (req, res) => {
  const asset = await Asset.findById(req.params.id);

  if (!asset) {
    res.status(404);
    throw new Error('Asset not found');
  }

  // Check if user owns the asset or it's shared with them
  if (
    asset.uploadedBy.toString() !== req.user._id.toString() &&
    !asset.sharedWith.includes(req.user._id)
  ) {
    res.status(401);
    throw new Error('Not authorized to access this asset');
  }

  res.json(asset);
});

// @desc    Update asset
// @route   PUT /api/assets/:id
// @access  Private
const updateAsset = asyncHandler(async (req, res) => {
  const { fileName } = req.body;
  const asset = await Asset.findById(req.params.id);

  if (!asset) {
    res.status(404);
    throw new Error('Asset not found');
  }

  // Check if user owns the asset
  if (asset.uploadedBy.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized to update this asset');
  }

  asset.fileName = fileName || asset.fileName;
  const updatedAsset = await asset.save();

  res.json(updatedAsset);
});

// @desc    Delete asset
// @route   DELETE /api/assets/:id
// @access  Private
const deleteAsset = asyncHandler(async (req, res) => {
  const asset = await Asset.findById(req.params.id);

  if (!asset) {
    res.status(404);
    throw new Error('Asset not found');
  }

  // Check if user owns the asset
  if (asset.uploadedBy.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized to delete this asset');
  }

  // Delete file from server
  const filePath = path.join(process.cwd(), asset.url);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }

  await asset.deleteOne();

  res.json({ message: 'Asset removed' });
});

// @desc    Share asset with user
// @route   POST /api/assets/:id/share
// @access  Private
const shareAsset = asyncHandler(async (req, res) => {
  const { sharingCode } = req.body;

  if (!sharingCode) {
    res.status(400);
    throw new Error('Please provide a sharing code');
  }

  const asset = await Asset.findById(req.params.id);

  if (!asset) {
    res.status(404);
    throw new Error('Asset not found');
  }

  // Check if user owns the asset
  if (asset.uploadedBy.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized to share this asset');
  }

  // Find user by sharing code
  const userToShareWith = await User.findOne({ sharingCode });

  if (!userToShareWith) {
    res.status(404);
    throw new Error('User with this sharing code not found');
  }

  // Check if already shared
  if (asset.sharedWith.includes(userToShareWith._id)) {
    res.status(400);
    throw new Error('Asset already shared with this user');
  }

  // Add user to sharedWith array
  asset.sharedWith.push(userToShareWith._id);
  await asset.save();

  res.json({ message: 'Asset shared successfully' });
});

// @desc    Unshare asset with user
// @route   POST /api/assets/:id/unshare
// @access  Private
const unshareAsset = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    res.status(400);
    throw new Error('Please provide a user ID');
  }

  const asset = await Asset.findById(req.params.id);

  if (!asset) {
    res.status(404);
    throw new Error('Asset not found');
  }

  // Check if user owns the asset
  if (asset.uploadedBy.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized to unshare this asset');
  }

  // Remove user from sharedWith array
  asset.sharedWith = asset.sharedWith.filter(
    (id) => id.toString() !== userId
  );
  await asset.save();

  res.json({ message: 'Asset unshared successfully' });
});

export {
  uploadAsset,
  getAssets,
  getAssetById,
  updateAsset,
  deleteAsset,
  shareAsset,
  unshareAsset,
};