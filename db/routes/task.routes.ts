import express from "express";
import TaskController from "../controllers/task.controller";

const router = express.Router();

router
  .route("/")
  .post(TaskController.createTask)
  .get(TaskController.getTasks)
  .put(TaskController.softDeleteAllActiveTasks);

router
  .route("/:taskId")
  .get(TaskController.getTaskById)
  .put(TaskController.updateTask);

router.route("/done").put(TaskController.softDeleteAllDoneTasks);

export default router;
