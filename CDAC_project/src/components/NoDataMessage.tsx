import React from 'react';

interface NoDataMessageProps {
  assetType: string;
}

const NoDataMessage: React.FC<NoDataMessageProps> = ({ assetType }) => {
  return (
    <div className="p-4 text-center text-gray-500">
      {assetType} available here.
    </div>
  );
};

export default NoDataMessage;
