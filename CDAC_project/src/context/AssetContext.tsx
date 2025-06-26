import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from './AuthContext';
import { Asset, AssetState, AssetType } from '../types';

interface AssetContextType extends AssetState {
  fetchAssets: (type?: string, query?: string) => Promise<void>;
  uploadAsset: (file: File) => Promise<Asset>;
  getAssetById: (id: string) => Promise<Asset>;
  updateAsset: (id: string, fileName: string) => Promise<Asset>;
  deleteAsset: (id: string) => Promise<void>;
  shareAsset: (id: string, sharingCode: string) => Promise<void>;
  unshareAsset: (id: string, userId: string) => Promise<void>;
  setFilteredAssets: (assets: Asset[]) => void;
  clearCurrentAsset: () => void;
}

const AssetContext = createContext<AssetContextType | undefined>(undefined);

export const AssetProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  
  const [state, setState] = useState<AssetState>({
    assets: [],
    filteredAssets: [],
    currentAsset: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
  });

  const fetchAssets = useCallback(async (type?: string, query?: string) => {
    setState(prev => ({ ...prev, isLoading: true }));
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${(user as any)?.token}`,
        },
        params: {
          type,
          query,
        },
      };

      const response = await axios.get('/api/assets', config);
      
      setState(prev => ({
        ...prev,
        assets: response.data,
        filteredAssets: response.data,
        isLoading: false,
        isError: false,
        isSuccess: true,
      }));
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        isError: true,
        message: error.response?.data?.message || 'Failed to fetch assets',
      }));
      toast.error(error.response?.data?.message || 'Failed to fetch assets');
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchAssets();
    }
  }, [user, fetchAssets]);

  const uploadAsset = async (file: File) => {
    setState(prev => ({ ...prev, isLoading: true }));
    try {
      const formData = new FormData();
      formData.append('file', file);

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${user?.token}`,
        },
      };

      const response = await axios.post('/api/assets', formData, config);

      setState(prev => ({
        ...prev,
        assets: [response.data, ...prev.assets],
        filteredAssets: [response.data, ...prev.filteredAssets],
        isLoading: false,
        isError: false,
        isSuccess: true,
        message: 'Asset uploaded successfully!',
      }));

      toast.success('Asset uploaded successfully!');
      return response.data;
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        isError: true,
        message: error.response?.data?.message || 'Failed to upload asset',
      }));
      toast.error(error.response?.data?.message || 'Failed to upload asset');
      throw error;
    }
  };

  const getAssetById = async (id: string) => {
    setState(prev => ({ ...prev, isLoading: true }));
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };

      const response = await axios.get(`/api/assets/${id}`, config);

      setState(prev => ({
        ...prev,
        currentAsset: response.data,
        isLoading: false,
        isError: false,
        isSuccess: true,
      }));

      return response.data;
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        isError: true,
        message: error.response?.data?.message || 'Failed to fetch asset',
      }));
      toast.error(error.response?.data?.message || 'Failed to fetch asset');
      throw error;
    }
  };

  const updateAsset = async (id: string, fileName: string) => {
    setState(prev => ({ ...prev, isLoading: true }));
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };

      const response = await axios.put(`/api/assets/${id}`, { fileName }, config);

      // Update assets in state
      const updatedAssets = state.assets.map(asset =>
        asset._id === id ? response.data : asset
      );

      setState(prev => ({
        ...prev,
        assets: updatedAssets,
        filteredAssets: updatedAssets,
        currentAsset: response.data,
        isLoading: false,
        isError: false,
        isSuccess: true,
        message: 'Asset updated successfully!',
      }));

      toast.success('Asset updated successfully!');
      return response.data;
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        isError: true,
        message: error.response?.data?.message || 'Failed to update asset',
      }));
      toast.error(error.response?.data?.message || 'Failed to update asset');
      throw error;
    }
  };

  const deleteAsset = async (id: string) => {
    setState(prev => ({ ...prev, isLoading: true }));
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };

      await axios.delete(`/api/assets/${id}`, config);

      // Remove asset from state
      const updatedAssets = state.assets.filter(asset => asset._id !== id);

      setState(prev => ({
        ...prev,
        assets: updatedAssets,
        filteredAssets: updatedAssets,
        isLoading: false,
        isError: false,
        isSuccess: true,
        message: 'Asset deleted successfully!',
      }));

      toast.success('Asset deleted successfully!');
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        isError: true,
        message: error.response?.data?.message || 'Failed to delete asset',
      }));
      toast.error(error.response?.data?.message || 'Failed to delete asset');
      throw error;
    }
  };

  const shareAsset = async (id: string, sharingCode: string) => {
    setState(prev => ({ ...prev, isLoading: true }));
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };

      await axios.post(`/api/assets/${id}/share`, { sharingCode }, config);

      setState(prev => ({
        ...prev,
        isLoading: false,
        isError: false,
        isSuccess: true,
        message: 'Asset shared successfully!',
      }));

      toast.success('Asset shared successfully!');
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        isError: true,
        message: error.response?.data?.message || 'Failed to share asset',
      }));
      toast.error(error.response?.data?.message || 'Failed to share asset');
      throw error;
    }
  };

  const unshareAsset = async (id: string, userId: string) => {
    setState(prev => ({ ...prev, isLoading: true }));
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };

      await axios.post(`/api/assets/${id}/unshare`, { userId }, config);

      setState(prev => ({
        ...prev,
        isLoading: false,
        isError: false,
        isSuccess: true,
        message: 'Asset unshared successfully!',
      }));

      toast.success('Asset unshared successfully!');
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        isError: true,
        message: error.response?.data?.message || 'Failed to unshare asset',
      }));
      toast.error(error.response?.data?.message || 'Failed to unshare asset');
      throw error;
    }
  };

  const setFilteredAssets = (assets: Asset[]) => {
    setState(prev => ({
      ...prev,
      filteredAssets: assets,
    }));
  };

  const clearCurrentAsset = () => {
    setState(prev => ({
      ...prev,
      currentAsset: null,
    }));
  };

  return (
    <AssetContext.Provider
      value={{
        ...state,
        fetchAssets,
        uploadAsset,
        getAssetById,
        updateAsset,
        deleteAsset,
        shareAsset,
        unshareAsset,
        setFilteredAssets,
        clearCurrentAsset,
      }}
    >
      {children}
    </AssetContext.Provider>
  );
};

export const useAssets = () => {
  const context = useContext(AssetContext);
  if (context === undefined) {
    throw new Error('useAssets must be used within an AssetProvider');
  }
  return context;
};
