// components/TaskCard.js
import React from "react";
import { Edit3, Trash2, Calendar, User } from "lucide-react";

const TaskCard = ({ task, onEdit, onDelete, onUpdateStatus }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800 border-red-200";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-3 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-medium text-gray-900 text-sm">{task?.title}</h4>
        <div className="flex gap-1">
          <button
            onClick={() => onEdit(task)}
            className="p-1 text-gray-400 hover:text-blue-600"
          >
            <Edit3 size={14} />
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className="p-1 text-gray-400 hover:text-red-600"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {task.description && (
        <p className="text-gray-600 text-xs mb-3">{task?.description}</p>
      )}

      <div className="flex flex-wrap gap-2 mb-3">
        <span
          className={`px-2 py-1 rounded text-xs border ${getPriorityColor(
            task?.priority
          )}`}
        >
          {task?.priority}
        </span>

        <select
          value={task.status}
          onChange={(e) => onUpdateStatus(task._id, e.target.value)}
          className="text-xs border border-gray-300 rounded px-2 py-1 bg-white"
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>

      <div className="flex justify-between items-center text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <User size={12} />
          <span>{task.assignedTo || "Unassigned"}</span>
        </div>
        {task.dueDate && (
          <div className="flex items-center gap-1">
            <Calendar size={12} />
            <span>{new Date(task.dueDate).toLocaleDateString()}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
