import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Image, FileText, Film, Music, FileBox, 
  MoreVertical, Pencil, Trash2, Share2, X
} from 'lucide-react';
import { useAssets } from '../context/AssetContext';
import { Asset } from '../types';

interface AssetCardProps {
  asset: Asset;
  showDetails?: boolean;
}

const AssetCard = ({ asset, showDetails = true }: AssetCardProps) => {
  const { deleteAsset, shareAsset } = useAssets();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState(asset.fileName);
  const [isSharing, setIsSharing] = useState(false);
  const [sharingCode, setSharingCode] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const toggleMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleRename = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsRenaming(true);
    setMenuOpen(false);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSharing(true);
    setMenuOpen(false);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDeleting(true);
    setMenuOpen(false);
  };

  const confirmRename = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await useAssets().updateAsset(asset._id, newName);
      setIsRenaming(false);
    } catch (error) {
      console.error('Error renaming asset:', error);
    }
  };

  const confirmShare = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await shareAsset(asset._id, sharingCode);
      setIsSharing(false);
      setSharingCode('');
    } catch (error) {
      console.error('Error sharing asset:', error);
    }
  };

  const confirmDelete = async () => {
    try {
      await deleteAsset(asset._id);
      setIsDeleting(false);
    } catch (error) {
      console.error('Error deleting asset:', error);
    }
  };

  const getFileIcon = () => {
    switch (asset.assetType) {
      case 'image':
        return <Image size={24} className="text-blue-500" />;
      case 'video':
        return <Film size={24} className="text-purple-500" />;
      case 'audio':
        return <Music size={24} className="text-green-500" />;
      case 'document':
        return <FileText size={24} className="text-red-500" />;
      default:
        return <FileBox size={24} className="text-gray-500" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatFileSize = (size: number) => {
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  };

  if (isRenaming) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
        <form onSubmit={confirmRename} className="space-y-4">
          <div>
            <label htmlFor="fileName" className="block text-sm font-medium text-gray-700">
              New File Name
            </label>
            <input
              type="text"
              id="fileName"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              autoFocus
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setIsRenaming(false)}
              className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    );
  }

  if (isSharing) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
        <form onSubmit={confirmShare} className="space-y-4">
          <div>
            <label htmlFor="sharingCode" className="block text-sm font-medium text-gray-700">
              Enter 6-digit Sharing Code
            </label>
            <input
              type="text"
              id="sharingCode"
              value={sharingCode}
              onChange={(e) => setSharingCode(e.target.value)}
              placeholder="Enter recipient's 6-digit code"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              maxLength={6}
              pattern="[0-9]{6}"
              autoFocus
            />
            <p className="mt-1 text-xs text-gray-500">
              Enter the 6-digit code of the user you want to share with
            </p>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setIsSharing(false)}
              className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              disabled={sharingCode.length !== 6}
            >
              Share
            </button>
          </div>
        </form>
      </div>
    );
  }

  if (isDeleting) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Delete File</h3>
        <p className="mt-2 text-sm text-gray-500">
          Are you sure you want to delete "{asset.fileName}"? This action cannot be undone.
        </p>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            type="button"
            onClick={() => setIsDeleting(false)}
            className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={confirmDelete}
            className="px-3 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    );
  }

  return (
    <Link 
      to={`/assets/${asset._id}`} 
      className="block p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center space-x-3">
          {asset.assetType === 'image' ? (
            <div className="w-12 h-12 rounded-md bg-gray-100 flex items-center justify-center overflow-hidden">
              <img 
                src={asset.url} 
                alt={asset.fileName} 
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-md bg-gray-100 flex items-center justify-center">
              {getFileIcon()}
            </div>
          )}
          {showDetails && (
            <div>
              <h3 className="text-sm font-medium text-gray-900 truncate max-w-xs">
                {asset.fileName}
              </h3>
              <p className="text-xs text-gray-500">
                {formatFileSize(asset.fileSize)} • {formatDate(asset.createdAt)}
              </p>
            </div>
          )}
        </div>
        
        <div className="relative">
          <button 
            onClick={toggleMenu}
            className="p-1 rounded-full hover:bg-gray-100 focus:outline-none"
            aria-label="More options"
          >
            <MoreVertical size={18} className="text-gray-500" />
          </button>
          
          {menuOpen && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={closeMenu}
              ></div>
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20">
                <div className="py-1" role="menu" aria-orientation="vertical">
                  <button
                    onClick={handleRename}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    role="menuitem"
                  >
                    <Pencil size={16} className="mr-2" />
                    Rename
                  </button>
                  <button
                    onClick={handleShare}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    role="menuitem"
                  >
                    <Share2 size={16} className="mr-2" />
                    Share
                  </button>
                  <button
                    onClick={handleDelete}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                    role="menuitem"
                  >
                    <Trash2 size={16} className="mr-2" />
                    Delete
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};

export default AssetCard;