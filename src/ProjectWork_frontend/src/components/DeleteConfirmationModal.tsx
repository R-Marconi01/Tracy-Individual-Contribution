import React from 'react';
import Modal from 'react-modal';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  confirmDelete: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ isOpen, onRequestClose, confirmDelete }) => {
  return (
    <Modal
  isOpen={isOpen}
  onRequestClose={onRequestClose}
  className="modal-content"
  overlayClassName="modal-overlay"
>
  <h2 className="text-sm sm:text-md md:text-lg font-semibold mb-4">Confirm Delete</h2>
  <p className= "text-xs sm:text-sm md:text-base mb-4">Are you sure you want to delete?</p>
  <div className="modal-buttons">
    <button
      onClick={confirmDelete}
      className="px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 bg-red-500 text-white rounded-md mr-2"
    >
      Yes
    </button>
    <button
      onClick={onRequestClose}
      className="px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 bg-gray-300 text-black rounded-md" 
    >
      Cancel
    </button>
  </div>
</Modal>
  );
};

export default DeleteConfirmationModal;