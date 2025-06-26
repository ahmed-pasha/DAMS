import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search, Filter, X } from 'lucide-react';
import { useAssets } from '../context/AssetContext';
import AssetCard from '../components/AssetCard';
import FileUploader from '../components/FileUploader';
import ReceivedFilesSection from '../components/ReceivedFilesSection';
import { Asset, AssetType } from '../types';

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { assets, filteredAssets, fetchAssets, setFilteredAssets, isLoading } = useAssets();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [showUploader, setShowUploader] = useState(false);
  const [currentType, setCurrentType] = useState<string>('all');

  // Parse type from URL query params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const typeParam = params.get('type');
    
    if (typeParam && Object.values(AssetType).includes(typeParam as AssetType)) {
      setCurrentType(typeParam);
      fetchAssets(typeParam);
    } else {
      setCurrentType('all');
      fetchAssets();
    }
  }, [location.search]);

  // Filter assets based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredAssets(assets);
    } else {
      const filtered = assets.filter((asset) =>
        asset.fileName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredAssets(filtered);
    }
  }, [searchQuery, assets]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchAssets(currentType !== 'all' ? currentType : undefined, searchQuery);
  };

  const clearSearch = () => {
    setSearchQuery('');
    fetchAssets(currentType !== 'all' ? currentType : undefined);
  };

  const handleUploadComplete = () => {
    setShowUploader(false);
    fetchAssets(currentType !== 'all' ? currentType : undefined);
  };

  const getAssetTypeTitle = (type: string) => {
    switch (type) {
      case 'image':
        return 'Images';
      case 'video':
        return 'Videos';
      case 'audio':
        return 'Audio Files';
      case 'document':
        return 'Documents';
      case 'other':
        return 'Other Files';
      default:
        return 'All Files';
    }
  };

  return (
    <div>
      {/* Search and filter bar */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <h1 className="text-2xl font-bold text-gray-900">
          {getAssetTypeTitle(currentType)}
        </h1>
        
        <div className="flex items-center space-x-2">
          <form onSubmit={handleSearch} className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search files..."
              className="pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <X size={16} className="text-gray-400 hover:text-gray-500" />
              </button>
            )}
          </form>
          
          <button
            onClick={() => setShowUploader(!showUploader)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {showUploader ? 'Cancel' : 'Upload'}
          </button>
        </div>
      </div>

      {/* File uploader */}
      {showUploader && (
        <div className="mb-8">
          <FileUploader onUploadComplete={handleUploadComplete} />
        </div>
      )}

      {/* Received files section */}
      <ReceivedFilesSection />

      {/* Files grid */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : filteredAssets.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAssets
            .filter(asset => currentType === 'all' || asset.assetType === currentType)
            .map((asset) => (
              <AssetCard key={asset._id} asset={asset} />
            ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Filter size={24} className="text-blue-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No files found</h3>
          <p className="text-sm text-gray-500 max-w-md mb-6">
            {searchQuery
              ? `No files match your search "${searchQuery}". Try another search term or clear the search.`
              : currentType !== 'all'
              ? `You don't have any ${currentType} files yet. Upload some ${currentType} files to see them here.`
              : "You don't have any files yet. Start uploading files to manage them here."}
          </p>
          <button
            onClick={() => setShowUploader(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Upload Files
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
