import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Download, Pencil, Share2, Trash2, 
  Image, FileText, Film, Music, FileBox, Save, X 
} from 'lucide-react';
import { useAssets } from '../context/AssetContext';
import { toast } from 'react-toastify';

const AssetDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getAssetById, updateAsset, deleteAsset, shareAsset, isLoading } = useAssets();
  
  const [asset, setAsset] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [fileName, setFileName] = useState('');
  const [isSharing, setIsSharing] = useState(false);
  const [sharingCode, setSharingCode] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchAsset = async () => {
      try {
        if (id) {
          const assetData = await getAssetById(id);
          setAsset(assetData);
          setFileName(assetData.fileName);
        }
      } catch (error) {
        toast.error('Failed to fetch asset details');
        navigate('/');
      }
    };

    fetchAsset();
  }, [id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      if (id) {
        await updateAsset(id, fileName);
        setIsEditing(false);
        toast.success('File renamed successfully');
      }
    } catch (error) {
      toast.error('Failed to update file name');
    }
  };

  const handleShare = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id) {
        await shareAsset(id, sharingCode);
        setIsSharing(false);
        setSharingCode('');
        toast.success('File shared successfully');
      }
    } catch (error) {
      toast.error('Failed to share file');
    }
  };

  const handleDelete = async () => {
    try {
      if (id) {
        await deleteAsset(id);
        toast.success('File deleted successfully');
        navigate('/');
      }
    } catch (error) {
      toast.error('Failed to delete file');
    }
  };

  const getFileIcon = (type: string) => {
    switch (type) {
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
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatFileSize = (size: number) => {
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  };

  if (isLoading || !asset) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Header with back button */}
      <div className="mb-6 flex items-center">
        <button
          onClick={() => navigate(-1)}
          className="mr-4 p-2 rounded-full hover:bg-gray-200 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">File Details</h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Preview section */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-start md:space-x-6">
            {/* File preview */}
            <div className="w-full md:w-2/3 mb-6 md:mb-0">
              {asset.assetType === 'image' ? (
                <div className="bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={asset.url}
                    alt={asset.fileName}
                    className="w-full h-auto max-h-96 object-contain"
                  />
                </div>
              ) : asset.assetType === 'video' ? (
                <div className="bg-gray-100 rounded-lg overflow-hidden">
                  <video
                    src={asset.url}
                    controls
                    className="w-full h-auto max-h-96"
                  />
                </div>
              ) : asset.assetType === 'audio' ? (
                <div className="bg-gray-100 rounded-lg p-8 flex justify-center items-center">
                  <audio src={asset.url} controls className="w-full" />
                </div>
              ) : (
                <div className="bg-gray-100 rounded-lg p-16 flex flex-col justify-center items-center">
                  {getFileIcon(asset.assetType)}
                  <p className="mt-4 text-gray-500 text-center">
                    Preview not available for this file type
                  </p>
                </div>
              )}
            </div>

            {/* File info */}
            <div className="w-full md:w-1/3">
              <div className="mb-6">
                {isEditing ? (
                  <div>
                    <label htmlFor="fileName\" className="block text-sm font-medium text-gray-700">
                      File Name
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <input
                        type="text"
                        id="fileName"
                        value={fileName}
                        onChange={(e) => setFileName(e.target.value)}
                        className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                    <div className="mt-2 flex space-x-2">
                      <button
                        onClick={handleSave}
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <Save size={16} className="mr-1" />
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setIsEditing(false);
                          setFileName(asset.fileName);
                        }}
                        className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <X size={16} className="mr-1" />
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900 truncate" title={asset.fileName}>
                      {asset.fileName}
                    </h2>
                    <button
                      onClick={handleEdit}
                      className="p-1 text-gray-400 hover:text-gray-500"
                    >
                      <Pencil size={16} />
                    </button>
                  </div>
                )}
              </div>

              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-500">Type</dt>
                  <dd className="font-medium text-gray-900">{asset.fileType}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Size</dt>
                  <dd className="font-medium text-gray-900">{formatFileSize(asset.fileSize)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Uploaded</dt>
                  <dd className="font-medium text-gray-900">{formatDate(asset.createdAt)}</dd>
                </div>
                {asset.updatedAt !== asset.createdAt && (
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Last Modified</dt>
                    <dd className="font-medium text-gray-900">{formatDate(asset.updatedAt)}</dd>
                  </div>
                )}
              </dl>

              <div className="mt-6 space-y-3">
                <a
                  href={asset.url}
                  download={asset.fileName}
                  className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Download size={16} className="mr-2" />
                  Download
                </a>
                <button
                  onClick={() => setIsSharing(true)}
                  className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Share2 size={16} className="mr-2" />
                  Share
                </button>
                <button
                  onClick={() => setIsDeleting(true)}
                  className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-red-600 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <Trash2 size={16} className="mr-2" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Share modal */}
      {isSharing && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Share File
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Enter the 6-digit sharing code of the user you want to share this file with.
                    </p>
                  </div>
                </div>
              </div>
              <form className="mt-5 sm:mt-6" onSubmit={handleShare}>
                <input
                  type="text"
                  value={sharingCode}
                  onChange={(e) => setSharingCode(e.target.value)}
                  placeholder="Enter 6-digit code"
                  maxLength={6}
                  pattern="[0-9]{6}"
                  className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                  <button
                    type="submit"
                    disabled={sharingCode.length !== 6}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:col-start-2 sm:text-sm"
                  >
                    Share
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsSharing(false)}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirmation modal */}
      {isDeleting && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Delete File
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to delete this file? This action cannot be undone.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  onClick={handleDelete}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:col-start-2 sm:text-sm"
                >
                  Delete
                </button>
                <button
                  type="button"
                  onClick={() => setIsDeleting(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssetDetails;