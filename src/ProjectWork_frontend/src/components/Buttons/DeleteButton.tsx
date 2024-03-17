import React from 'react';

interface DeleteButtonProps {
  onClick: () => void;
  deleting: boolean;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick, deleting }) => {
  return (
    <button
      onClick={onClick}
      className={`px-2 py-1.5 rounded-md text-white ${
        deleting ? "bg-gray-500" : "bg-red-500 hover:bg-red-600"
      }`}
      disabled={deleting}
    >
      {deleting ? "Deleting..." : "Delete"}
    </button>
  );
};

export default DeleteButton;