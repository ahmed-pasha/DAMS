export interface User {
  _id: string;
  name: string;
  email: string;
  sharingCode: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
}

export enum AssetType {
  IMAGE = 'image',
  VIDEO = 'video',
  AUDIO = 'audio',
  DOCUMENT = 'document',
  OTHER = 'other'
}

export interface Asset {
  _id: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  assetType: AssetType;
  url: string;
  thumbnailUrl?: string;
  uploadedBy: User | string;
  sharedWith: string[];
  createdAt: string;
  updatedAt: string;
}

export interface AssetState {
  assets: Asset[];
  filteredAssets: Asset[];
  currentAsset: Asset | null;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
}
