import express from "express";
import TaskController from "../controllers/task.controller";

const router = express.Router();

router
  .route("/task")
  .post(TaskController.createTask)
  .get(TaskController.getTasks)
  .put(TaskController.softDeleteAllActiveTasks);

router
  .route("/task/:taskId")
  .get(TaskController.getTaskById)
  .put(TaskController.updateTask);

router.route("/done").put(TaskController.softDeleteAllDoneTasks);

export default router;
