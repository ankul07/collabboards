// components/Sidebar.js - Enhanced for debugging
import React from "react";
import { Plus } from "lucide-react";

const Sidebar = ({
  boards,
  selectedBoard,
  onSelectBoard,
  onShowCreateBoard,
}) => {
  console.log("Sidebar - Total boards:", boards.length);
  console.log("Sidebar - Boards data:", boards);
  console.log("Sidebar - Selected board:", selectedBoard);

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-800">Team Board</h1>
      </div>

      <div className="flex-1 p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-gray-700">
            Boards ({boards.length})
          </h2>
          <button
            onClick={onShowCreateBoard}
            className="p-1 text-blue-600 hover:bg-blue-50 rounded"
          >
            <Plus size={16} />
          </button>
        </div>

        <div className="space-y-2">
          {boards.length === 0 ? (
            <p className="text-gray-500 text-sm italic">No boards available</p>
          ) : (
            boards.map((board, index) => (
              <button
                key={board?._id || index}
                onClick={() => onSelectBoard(board)}
                className={`w-full text-left p-3 rounded-lg text-sm transition-colors ${
                  selectedBoard?._id === board?._id
                    ? "bg-blue-50 text-blue-700 border border-blue-200"
                    : "hover:bg-gray-50 text-gray-700"
                }`}
                title={`Board: ${board?.boardname} (ID: ${board?._id})`}
              >
                {board?.boardname || "Unnamed Board"}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
