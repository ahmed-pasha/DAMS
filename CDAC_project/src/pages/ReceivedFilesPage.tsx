import React, { useState, useEffect, useMemo } from 'react';
import { useAssets } from '../context/AssetContext';
import ReceivedFilesSection from '../components/ReceivedFilesSection';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ReceivedFilesPage = () => {
  const { assets, isLoading, fetchAssets } = useAssets();
  const { user } = useAuth();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const typeFromQuery = (queryParams.get('type') || 'all').toLowerCase();

  const [selectedSender, setSelectedSender] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string>(typeFromQuery);

  // Update selectedType when URL query param changes
  useEffect(() => {
    setSelectedType(typeFromQuery);
  }, [typeFromQuery]);

  // Fetch assets when selectedType changes
  useEffect(() => {
    const normalizedType = selectedType.toLowerCase();
    console.log('Fetching assets with type:', normalizedType);
    fetchAssets(normalizedType).then(() => {
      console.log('Assets fetched:', assets);
    });
    setSelectedSender(null); // Reset sender filter when type changes
  }, [selectedType, fetchAssets]);

  // Filter assets to exclude files uploaded by current user
  const assetsExcludingCurrentUser = useMemo(() => {
    if (!assets || !user) return [];
    console.log('Selected Type:', selectedType);
    console.log('Assets and their assetTypes:');
    assets.forEach(file => {
      console.log(`File: ${file.fileName}, assetType: ${file.assetType}`);
    });
    return assets.filter(
      (file) =>
        file.uploadedBy &&
        typeof file.uploadedBy !== 'string' &&
        file.uploadedBy.email !== user.email
    );
  }, [assets, user]);

  // Get unique senders from filtered assets
  const uniqueSenders = useMemo(() => {
    if (!assetsExcludingCurrentUser) return [];
    const sendersMap = new Map();
    assetsExcludingCurrentUser.forEach((file) => {
      if (file.uploadedBy && typeof file.uploadedBy !== 'string') {
        sendersMap.set(file.uploadedBy.email, file.uploadedBy);
      }
    });
    return Array.from(sendersMap.values());
  }, [assetsExcludingCurrentUser]);

  // Filter files by selected sender email from filtered assets and by selectedType to restrict shared files
  const filteredFiles = useMemo(() => {
    if (!assetsExcludingCurrentUser) return [];

    // Filter by selected sender
    let files = selectedSender
      ? assetsExcludingCurrentUser.filter(
          (file) =>
            file.uploadedBy &&
            typeof file.uploadedBy !== 'string' &&
            file.uploadedBy.email === selectedSender
        )
      : assetsExcludingCurrentUser;

    // Further filter files by selectedType to restrict shared files to their respective asset type sections
    if (selectedType && selectedType !== 'all') {
      files = files.filter(
        (file) =>
          file.assetType &&
          file.assetType.toLowerCase() === selectedType.toLowerCase()
      );
    }

    return files;
  }, [selectedSender, assetsExcludingCurrentUser, selectedType]);

  if (isLoading) {
    return <div>Loading received files...</div>;
  }

  if (!assets || assets.length === 0) {
    return null;
  }

  if (filteredFiles.length === 0) {
    // Do not show any message if there are files but none match the filter
    return null;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Received Files</h1>

      <div className="flex space-x-4 mb-6 overflow-x-auto">
        {uniqueSenders.map((sender) => (
          <button
            key={sender.email}
            onClick={() => setSelectedSender(sender.email)}
            className={`px-4 py-2 rounded-lg border ${
              selectedSender === sender.email
                ? 'bg-green-600 text-white border-green-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
            }`}
          >
            {sender.name}
          </button>
        ))}
      </div>

      <ReceivedFilesSection assets={filteredFiles} />
    </div>
  );
};

export default ReceivedFilesPage;
