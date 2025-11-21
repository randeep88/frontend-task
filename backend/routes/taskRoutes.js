import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  addTask,
  deleteTask,
  getAllTasks,
  markAsCompleted,
  startTask,
} from "../controllers/Task.js";
const taskRouter = express.Router();

taskRouter.get("/get-all-tasks", verifyToken, getAllTasks);
taskRouter.post("/add-task", verifyToken, addTask);
taskRouter.patch("/start-task/:id", verifyToken, startTask);
taskRouter.patch("/mark-as-completed/:id", verifyToken, markAsCompleted);
taskRouter.delete("/delete-task/:id", verifyToken, deleteTask);

export default taskRouter;
