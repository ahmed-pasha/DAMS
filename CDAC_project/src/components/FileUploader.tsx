import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Image, Film, Music, FileText, FileBox } from 'lucide-react';
import { useAssets } from '../context/AssetContext';
import { toast } from 'react-toastify';

interface FileUploaderProps {
  onUploadComplete?: () => void;
}

const FileUploader = ({ onUploadComplete }: FileUploaderProps) => {
  const { uploadAsset } = useAssets();
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(prev => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
      'video/*': [],
      'audio/*': [],
      'application/pdf': [],
      'application/msword': [],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [],
      'application/vnd.ms-excel': [],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [],
      'application/vnd.ms-powerpoint': [],
      'application/vnd.openxmlformats-officedocument.presentationml.presentation': [],
      'text/plain': [],
      'application/zip': [],
      'application/x-rar-compressed': [],
    },
    // Removed maxSize to allow large files
  });

  // New state for payment flow
  const [paymentRequiredFile, setPaymentRequiredFile] = useState<File | null>(null);
  const [paymentSessionId, setPaymentSessionId] = useState<string | null>(null);
  const [showPaymentGateway, setShowPaymentGateway] = useState(false);

  const TEN_GB = 10 * 1024 * 1024 * 1024;

  // Removed duplicate handleUpload function

  const uploadFiles = async (filesToUpload: File[]) => {
    setUploading(true);
    setProgress(0);

    const totalFiles = filesToUpload.length;
    let completedFiles = 0;

    try {
      for (const file of filesToUpload) {
        await uploadAsset(file);
        completedFiles++;
        setProgress(Math.round((completedFiles / totalFiles) * 100));
      }

      setFiles([]);
      toast.success(`Successfully uploaded ${totalFiles} file${totalFiles > 1 ? 's' : ''}`);

      if (onUploadComplete) {
        onUploadComplete();
      }
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  const handlePaymentSuccess = async () => {
    if (paymentRequiredFile) {
      setShowPaymentGateway(false);
      // After payment success, upload the large file
      await uploadFiles([paymentRequiredFile]);
      setPaymentRequiredFile(null);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (files.length === 0) return;
    
    setUploading(true);
    setProgress(0);
    
    const totalFiles = files.length;
    let completedFiles = 0;
    
    try {
      for (const file of files) {
        await uploadAsset(file);
        completedFiles++;
        setProgress(Math.round((completedFiles / totalFiles) * 100));
      }
      
      setFiles([]);
      toast.success(`Successfully uploaded ${totalFiles} file${totalFiles > 1 ? 's' : ''}`);
      
      if (onUploadComplete) {
        onUploadComplete();
      }
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  const formatFileSize = (size: number) => {
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <>
      <div className="w-full p-6 bg-white rounded-lg shadow-sm">
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm font-medium text-gray-700">
            {isDragActive
              ? 'Drop the files here...'
              : 'Drag & drop files here, or click to select files'}
          </p>
          <p className="mt-1 text-xs text-gray-500">
            Support for images, videos, audio, documents, and more
          </p>
        </div>

      {files.length > 0 && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-700">
              Selected Files ({files.length})
            </h3>
            <button
              onClick={handleUpload}
              disabled={uploading}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {uploading ? 'Uploading...' : 'Upload All'}
            </button>
          </div>

          {uploading && (
            <div className="mb-4">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="mt-2 text-xs text-gray-500 text-right">
                {progress}% Complete
              </p>
            </div>
          )}

          <ul className="divide-y divide-gray-200">
            {files.map((file, index) => (
              <li key={index} className="py-3 flex justify-between items-center">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-md flex items-center justify-center">
                    {file.type.startsWith('image/') ? (
                      <img
                        src={URL.createObjectURL(file)}
                        alt="Preview"
                        className="h-10 w-10 rounded-md object-cover"
                      />
                    ) : (
                      <FileIcon type={file.type} />
                    )}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-700 truncate max-w-xs">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="ml-2 p-1 text-gray-400 hover:text-gray-500"
                  disabled={uploading}
                >
                  <X size={18} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
      {showPaymentGateway && paymentRequiredFile && (
        <PaymentGateway
          file={paymentRequiredFile}
          onSuccess={handlePaymentSuccess}
          onCancel={() => setShowPaymentGateway(false)}
        />
      )}
    </>
  );
};

const FileIcon = ({ type }: { type: string }) => {
  if (type.startsWith('image/')) {
    return <Image size={20} className="text-blue-500" />;
  } else if (type.startsWith('video/')) {
    return <Film size={20} className="text-purple-500" />;
  } else if (type.startsWith('audio/')) {
    return <Music size={20} className="text-green-500" />;
  } else if (
    type.includes('pdf') ||
    type.includes('document') ||
    type.includes('sheet') ||
    type.includes('presentation')
  ) {
    return <FileText size={20} className="text-red-500" />;
  } else {
    return <FileBox size={20} className="text-gray-500" />;
  }
};

export default FileUploader;