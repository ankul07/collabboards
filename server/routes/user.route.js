import express from "express";
import {
  createBaord,
  createTask,
  deleteTask,
  getBoards,
  getTasks,
  updateTask,
  updateTaskStatus,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/boards", createBaord);
router.get("/boards", getBoards);
router.get("/boards/:id/tasks", getTasks);
router.post("/boards/:id/tasks", createTask);

router.put("/tasks/:id", updateTask);
router.delete("/tasks/:id", deleteTask);
router.patch("/tasks/:id/status", updateTaskStatus);

export default router;
