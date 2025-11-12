import React from 'react';
import { Loader as LoaderIcon } from 'lucide-react';

interface LoaderProps {
  size?: number;
  className?: string;
  fullScreen?: boolean;
}

export const Loader: React.FC<LoaderProps> = ({
  size = 40,
  className = '',
  fullScreen = false,
}) => {
  const loader = (
    <LoaderIcon
      size={size}
      className={`animate-spin text-blue-600 ${className}`}
    />
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
        {loader}
      </div>
    );
  }

  return <div className="flex justify-center items-center p-8">{loader}</div>;
};