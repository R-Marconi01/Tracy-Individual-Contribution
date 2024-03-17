import React from 'react';

interface ViewInfoButtonProps {
  onClick: () => void;
}

const ViewInfoButton: React.FC<ViewInfoButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="px-2 py-1.5 rounded-md bg-blue-500 text-white"
    >
      View information
    </button>
  );
};

export default ViewInfoButton;