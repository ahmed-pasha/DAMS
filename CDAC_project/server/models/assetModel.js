import mongoose from 'mongoose';

const assetSchema = mongoose.Schema(
  {
    fileName: {
      type: String,
      required: true,
    },
    fileSize: {
      type: Number,
      required: true,
    },
    fileType: {
      type: String,
      required: true,
    },
    assetType: {
      type: String,
      enum: ['image', 'video', 'audio', 'document', 'other'],
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    thumbnailUrl: {
      type: String,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    sharedWith: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Create indexes for efficient querying
assetSchema.index({ assetType: 1 });
assetSchema.index({ uploadedBy: 1 });
assetSchema.index({ fileName: 'text' });

const Asset = mongoose.model('Asset', assetSchema);

export default Asset;