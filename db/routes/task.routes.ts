import express from "express";
import TaskController from "../controllers/task.controller";

const router = express.Router();

router
  .route("/task")
  .post(TaskController.createTask)
  .get(TaskController.getTasks);

router
  .route("/task/:taskId")
  .get(TaskController.getTaskById)
  .put(TaskController.updateTask);

export default router;
