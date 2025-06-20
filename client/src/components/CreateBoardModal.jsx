// components/CreateBoardModal.js
import React, { useState } from "react";
import Modal from "./Modal";

const CreateBoardModal = ({ isOpen, onClose, onCreateBoard }) => {
  const [boardName, setBoardName] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const handleSubmit = async () => {
    if (!boardName.trim() || isCreating) return;

    setIsCreating(true);
    try {
      await onCreateBoard(boardName);
      setBoardName("");
      // Modal will be closed by the parent component
    } catch (error) {
      console.error("Error creating board:", error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleClose = () => {
    if (isCreating) return; // Prevent closing while creating
    setBoardName("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Create New Board">
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Board name"
          value={boardName}
          onChange={(e) => setBoardName(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
          disabled={isCreating}
        />
        <div className="flex gap-3">
          <button
            onClick={handleSubmit}
            className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
            disabled={!boardName.trim() || isCreating}
          >
            {isCreating ? "Creating..." : "Create Board"}
          </button>
          <button
            onClick={handleClose}
            className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
            disabled={isCreating}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CreateBoardModal;
