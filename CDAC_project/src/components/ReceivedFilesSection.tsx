import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NoDataMessage from './NoDataMessage';

interface ReceivedFilesSectionProps {
  assets: any[];
}

const ReceivedFilesSection: React.FC<ReceivedFilesSectionProps> = ({ assets }) => {
  const [expandedFileId, setExpandedFileId] = useState<string | null>(null);
  const navigate = useNavigate();

  const toggleSenderDetails = (id: string) => {
    setExpandedFileId(prev => (prev === id ? null : id));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  if (!assets || assets.length === 0) {
    return <NoDataMessage assetType="files" />;
  }

  return (
    <div className="p-4 bg-white rounded shadow mt-6">
      <h2 className="text-lg font-semibold mb-4">Received Files</h2>
      <ul className="divide-y divide-gray-200">
        {assets.map(file => (
          <li key={file._id} className="py-3">
            <div>
              <p
                className="font-medium cursor-pointer text-blue-600 hover:underline"
                onClick={() => navigate(`/assets/${file._id}`)}
              >
                {file.fileName}
              </p>
              <p className="text-sm text-gray-500">{file.assetType}</p>
            </div>
            <button
              onClick={() => toggleSenderDetails(file._id)}
              className="mt-2 px-3 py-1 text-sm text-blue-600 hover:underline"
            >
              {expandedFileId === file._id ? 'Hide Sender Details' : 'Show Sender Details'}
            </button>
            {expandedFileId === file._id && file.uploadedBy && typeof file.uploadedBy !== 'string' && (
              <div className="mt-2 p-2 bg-gray-50 rounded border border-gray-200">
                <p><strong>Sender Name:</strong> {file.uploadedBy.name}</p>
                <p><strong>Sender Email:</strong> {file.uploadedBy.email}</p>
                <p><strong>Sent At:</strong> {formatDate(file.createdAt)}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReceivedFilesSection;
