// App.js
import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import BoardView from "./components/BoardView";
import CreateBoardModal from "./components/CreateBoardModal";
import TaskModal from "./components/TaskModal";
import { AlertCircle } from "lucide-react";
import axios from "axios";
import { server } from "./server";

const App = () => {
  // States
  const [boards, setBoards] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [showCreateBoard, setShowCreateBoard] = useState(false);
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [showEditTask, setShowEditTask] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch boards from server
  const fetchBoards = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${server}/boards`);
      console.log("Boards fetched:", response.data.boards);
      setBoards(response.data.boards);

      // Auto-select first board if available
      if (response.data.boards.length > 0) {
        setSelectedBoard(response.data.boards[0]);
      }
    } catch (error) {
      console.error("Error fetching boards:", error);
      alert("Failed to fetch boards.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch tasks for a specific board
  const fetchTasksForBoard = async (boardId) => {
    try {
      const response = await axios.get(`${server}/boards/${boardId}/tasks`);
      console.log("Tasks fetched for board:", boardId, response.data.tasks);
      setTasks(response.data.tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      alert("Failed to fetch tasks for this board.");
    }
  };

  // Initialize app
  useEffect(() => {
    fetchBoards();
  }, []);

  // Fetch tasks when selected board changes
  useEffect(() => {
    if (selectedBoard) {
      fetchTasksForBoard(selectedBoard._id);
    } else {
      setTasks([]);
    }
  }, [selectedBoard]);

  const createBoard = async (boardName) => {
    try {
      console.log("Creating board with name:", boardName);

      const response = await axios.post(`${server}/boards`, {
        boardname: boardName,
      });

      const newBoard = response.data.board;
      console.log("New board received from API:", newBoard);

      // Refetch all boards to ensure proper sorting and consistency
      await fetchBoards();

      // Set the newly created board as selected
      setSelectedBoard(newBoard);
      setShowCreateBoard(false);

      console.log("Board creation completed");
    } catch (error) {
      console.error("Error creating board:", error);
      alert("Failed to create board.");
      throw error;
    }
  };

  // CORRECTED: Create Task - Using boards/:id/tasks route
  const createTask = async (taskData) => {
    console.log("Creating task:", taskData);
    try {
      // Using the correct route: /boards/:id/tasks
      const response = await axios.post(
        `${server}/boards/${selectedBoard._id}/tasks`,
        taskData
      );

      const newTask = response.data.task;
      setTasks([...tasks, newTask]);

      console.log("Task created:", newTask);
      setShowCreateTask(false);
    } catch (error) {
      console.error("Error creating task:", error);
      alert("Failed to create task.");
    }
  };

  // CORRECTED: Update Task - Using correct task ID field
  const updateTask = async (taskData) => {
    try {
      // Using _id instead of id (MongoDB uses _id)
      const response = await axios.put(
        `${server}/tasks/${editingTask._id}`,
        taskData
      );

      const updatedTask = response.data.task;
      const updatedTasks = tasks.map((task) =>
        task._id === editingTask._id ? updatedTask : task
      );

      setTasks(updatedTasks);
      setEditingTask(null);
      setShowEditTask(false);

      console.log("Task updated:", updatedTask);
    } catch (error) {
      console.error("Error updating task:", error);
      alert("Failed to update task.");
    }
  };

  // CORRECTED: Delete Task - Using correct task ID field
  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`${server}/tasks/${taskId}`);

      // Using _id for filtering (MongoDB uses _id)
      setTasks(tasks.filter((task) => task._id !== taskId));

      console.log("Task deleted:", taskId);
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task.");
    }
  };

  // CORRECTED: Update Task Status - Using correct task ID field
  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      const response = await axios.patch(`${server}/tasks/${taskId}/status`, {
        status: newStatus,
      });

      const updatedTask = response.data.task;
      const updatedTasks = tasks.map((task) =>
        task._id === taskId ? updatedTask : task
      );

      setTasks(updatedTasks);

      console.log("Task status updated:", updatedTask);
    } catch (error) {
      console.error("Error updating task status:", error);
      alert("Failed to update task status.");
    }
  };

  const startEditTask = (task) => {
    setEditingTask(task);
    setShowEditTask(true);
  };

  const handleSelectBoard = (board) => {
    setSelectedBoard(board);
    // Tasks will be fetched automatically by useEffect
  };

  // Loading state
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading boards...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        boards={boards}
        selectedBoard={selectedBoard}
        onSelectBoard={handleSelectBoard}
        onShowCreateBoard={() => setShowCreateBoard(true)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {selectedBoard ? (
          <BoardView
            board={selectedBoard}
            tasks={tasks}
            onShowCreateTask={() => setShowCreateTask(true)}
            onEditTask={startEditTask}
            onDeleteTask={deleteTask}
            onUpdateTaskStatus={updateTaskStatus}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <AlertCircle className="mx-auto mb-4 text-gray-400" size={48} />
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                {boards.length === 0 ? "No Boards Found" : "No Board Selected"}
              </h3>
              <p className="text-gray-500">
                {boards.length === 0
                  ? "Create your first board to get started"
                  : "Select a board from the sidebar to get started"}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <CreateBoardModal
        isOpen={showCreateBoard}
        onClose={() => setShowCreateBoard(false)}
        onCreateBoard={createBoard}
      />

      <TaskModal
        isOpen={showCreateTask}
        onClose={() => setShowCreateTask(false)}
        onSubmit={createTask}
        title="Create New Task"
        mode="create"
      />

      <TaskModal
        isOpen={showEditTask}
        onClose={() => setShowEditTask(false)}
        onSubmit={updateTask}
        title="Edit Task"
        mode="edit"
        task={editingTask}
      />
    </div>
  );
};

export default App;
