// components/TaskModal.js
import React, { useState, useEffect } from "react";
import Modal from "./Modal";

const TaskModal = ({ isOpen, onClose, onSubmit, title, mode, task }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "To Do",
    priority: "Medium",
    assignedTo: "",
    dueDate: "",
  });

  // Reset form when modal opens/closes or task changes
  useEffect(() => {
    if (isOpen) {
      if (mode === "edit" && task) {
        setFormData({
          title: task.title || "",
          description: task.description || "",
          status: task.status || "To Do",
          priority: task.priority || "Medium",
          assignedTo: task.assignedTo || "",
          dueDate: task.dueDate || "",
        });
      } else {
        setFormData({
          title: "",
          description: "",
          status: "To Do",
          priority: "Medium",
          assignedTo: "",
          dueDate: "",
        });
      }
    }
  }, [isOpen, mode, task]);

  const handleSubmit = () => {
    if (!formData.title.trim()) return;

    onSubmit(formData);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      title: "",
      description: "",
      status: "To Do",
      priority: "Medium",
      assignedTo: "",
      dueDate: "",
    });
    onClose();
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={title}>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Task title *"
          value={formData.title}
          onChange={(e) => handleInputChange("title", e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />

        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-20"
        />

        <div className="grid grid-cols-2 gap-4">
          <select
            value={formData.status}
            onChange={(e) => handleInputChange("status", e.target.value)}
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>

          <select
            value={formData.priority}
            onChange={(e) => handleInputChange("priority", e.target.value)}
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <input
          type="text"
          placeholder="Assigned to"
          value={formData.assignedTo}
          onChange={(e) => handleInputChange("assignedTo", e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />

        <input
          type="date"
          value={formData.dueDate}
          onChange={(e) => handleInputChange("dueDate", e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />

        <div className="flex gap-3">
          <button
            onClick={handleSubmit}
            className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
            disabled={!formData.title.trim()}
          >
            {mode === "edit" ? "Update Task" : "Create Task"}
          </button>
          <button
            onClick={handleClose}
            className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default TaskModal;
