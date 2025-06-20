import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ["To Do", "In Progress", "Done"],
    default: "To Do",
  },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Medium",
  },
  assignedTo: {
    type: String,
  },
  dueDate: {
    type: Date,
  },
  boardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Board",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const TaskBoardSchema = mongoose.model("Task", taskSchema);
export default TaskBoardSchema;
