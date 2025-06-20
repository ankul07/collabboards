import asyncHandler from "../middlewares/asyncHandler.js";
import AppError from "../utils/AppError.js";
import BoardSchema from "../models/boardSchema.js";
import TaskBoardSchema from "../models/taskSchema.js";

export const createBaord = asyncHandler(async (req, res, next) => {
  const { boardname } = req.body;

  if (!boardname || boardname.trim() === "") {
    return next(new AppError("Please enter board name", 400));
  }
  const existingBoard = await BoardSchema.findOne({ boardname });
  if (existingBoard) {
    return next(new AppError("Board with this name already exists", 400));
  }

  const newBoard = await BoardSchema.create({ boardname });

  res.status(201).json({
    success: true,
    message: "Board created successfully",
    boards: newBoard,
  });
});

export const getBoards = asyncHandler(async (req, res, next) => {
  const boards = await BoardSchema.find().sort({ createdAt: -1 });

  if (!boards || boards.length === 0) {
    return next(new AppError("No boards found", 404));
  }

  res.status(200).json({
    success: true,
    message: "all board succesfululy fetched",
    boards,
  });
});
export const createTask = asyncHandler(async (req, res, next) => {
  const boardId = req.params.id;
  const { title, description, status, priority, assignedTo, dueDate } =
    req.body;

  // Check if the board exists
  const board = await BoardSchema.findById(boardId);
  if (!board) {
    return next(new AppError("Board not found", 404));
  }

  // Validate required field
  if (!title || title.trim() === "") {
    return next(new AppError("Task title is required", 400));
  }

  // Create the task
  const newTask = await TaskBoardSchema.create({
    title,
    description,
    status,
    priority,
    assignedTo,
    dueDate,
    boardId: board._id,
  });

  res.status(201).json({
    success: true,
    message: "Task created successfully",
    task: newTask,
  });
});
export const getTasks = asyncHandler(async (req, res, next) => {
  const boardId = req.params.id;

  // Check if the board exists
  const board = await BoardSchema.findById(boardId);
  if (!board) {
    return next(new AppError("Board not found", 404));
  }

  // Fetch all tasks for this board
  const tasks = await TaskBoardSchema.find({ boardId }).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: tasks.length,
    tasks: tasks,
  });
});

export const updateTask = asyncHandler(async (req, res, next) => {
  const taskId = req.params.id;
  const updateData = req.body;

  const task = await TaskBoardSchema.findById(taskId);
  if (!task) {
    return next(new AppError("Task not found", 404));
  }

  // Update fields
  Object.assign(task, updateData);
  await task.save();

  res.status(200).json({
    success: true,
    message: "Task updated successfully",
    task,
  });
});

export const deleteTask = asyncHandler(async (req, res, next) => {
  const taskId = req.params.id;

  const task = await TaskBoardSchema.findById(taskId);
  if (!task) {
    return next(new AppError("Task not found", 404));
  }

  await task.deleteOne();

  res.status(200).json({
    success: true,
    message: "Task deleted successfully",
  });
});
export const updateTaskStatus = asyncHandler(async (req, res, next) => {
  const taskId = req.params.id;
  const { status } = req.body;

  // Validate status
  const validStatuses = ["To Do", "In Progress", "Done"];
  if (!validStatuses.includes(status)) {
    return next(new AppError("Invalid status value", 400));
  }

  const task = await TaskBoardSchema.findById(taskId);
  if (!task) {
    return next(new AppError("Task not found", 404));
  }

  // Update only status
  task.status = status;
  await task.save();

  res.status(200).json({
    success: true,
    message: "Task status updated successfully",
    task,
  });
});
