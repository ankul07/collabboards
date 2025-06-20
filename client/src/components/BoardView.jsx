// components/BoardView.js
import React from "react";
import { Plus } from "lucide-react";
import TaskCard from "./TaskCard";

const BoardView = ({
  board,
  tasks,
  onShowCreateTask,
  onEditTask,
  onDeleteTask,
  onUpdateTaskStatus,
}) => {
  // console.log(board);
  console.log(tasks);
  // console.log(onShowCreateTask);
  // console.log(onEditTask);
  // console.log(onDeleteTask);
  // console.log(onUpdateTaskStatus);
  const getStatusTasks = (status) => {
    console.log(status);
    return tasks.filter((task) => task.status === status);
  };

  const statusColumns = ["To Do", "In Progress", "Done"];

  return (
    <>
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">
            {board?.boardname}
          </h2>
          <button
            onClick={onShowCreateTask}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus size={16} />
            Add Task
          </button>
        </div>
      </div>

      {/* Board Columns */}
      <div className="flex-1 p-6 overflow-x-auto">
        <div className="flex gap-6 min-w-max">
          {statusColumns.map((status) => (
            <div key={status} className="w-80 bg-gray-100 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-700">{status}</h3>
                <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded text-sm">
                  {getStatusTasks(status).length}
                </span>
              </div>

              <div className="space-y-3">
                {getStatusTasks(status).map((task) => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    onEdit={onEditTask}
                    onDelete={onDeleteTask}
                    onUpdateStatus={onUpdateTaskStatus}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BoardView;
