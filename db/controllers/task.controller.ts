import { Request, Response } from "express";
import TaskDto from "../task.dto";
import TaskDao from "../task.dao";
import { TaskCreateValidation, TaskUpdateValidation } from "../middlewares/task.validate";

export default class TaskController {
  static createTask = async (
    req: Request,
    res: Response
  ): Promise<void>  => {
    const taskDto = new TaskDto(req.body);
    const taskDao = new TaskDao();

    try {
      const error = TaskCreateValidation.safeParse(req.body);
      if (!error.success) {
         res.status(400).json({ error: error.error });
      }

      const task = await taskDao.createTask(taskDto);
       res
        .status(201)
        .json({ message: "Task Created Successufuly", data: task });
    } catch (e: Error | unknown) {
      if (e instanceof Error) {
         res.status(500).json({ error: e.message });
      }
       else res
        .status(500)
        .json({ error: "An unknown error occurred while creating the task" });
    }
  };

  static getTasks = async (req: Request, res: Response): Promise<void>  => {
    const taskDao = new TaskDao();

    try {
      const tasks = await taskDao.getTasks();
        res
        .status(200)
        .json({ message: "Tasks retreived successufuly", data: tasks });
    } catch (e: Error | unknown) {
      if (e instanceof Error) {
         res.status(500).json({ error: e.message });
      }
       else { res
        .status(500)
        .json({
          error: "An unknown error occurred while retreiving the tasks",
        });
    }
    }
  };

  static getTaskById = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const id = req.params.taskId;
    console.log(id)
    const taskDao = new TaskDao();

    try {
      const task = await taskDao.getTaskById(id);
       res
        .status(200)
        .json({ message: "Task retreived successufuly", data: task });
    } catch (e: Error | unknown) {
      if (e instanceof Error) {
         res.status(500).json({ error: e.message });
      }
      else res
        .status(500)
        .json({ error: "An unknown error occurred while retreiving the task" });
    }
  };

  static updateTask = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const id = req.params.taskId;
    console.log(id)
    const taskDto = new TaskDto(req.body);
    taskDto.id = id;
    const taskDao = new TaskDao();

    try {
      const error = TaskUpdateValidation.safeParse(req.body);
      if (!error.success) {
        res.status(400).json({ error: error.error });
      }

      const task = await taskDao.updateTask(taskDto);
      console.log(task)
      res
        .status(200)
        .json({ message: "Task updated successufuly", task });
    } catch (e: Error | unknown) {
      if (e instanceof Error) {
     res.status(500).json({ error: e.message });
      }
    else res
        .status(500)
        .json({ error: "An unknown error occurred while updating the task" });
    }
  };
}
