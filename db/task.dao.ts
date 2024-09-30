import { PrismaClient } from "@prisma/client";
import { startOfDay } from "date-fns";
import taskUpdateI from "../types.d";
import { addWeeks } from "date-fns";
// import { addMinutes } from "date-fns";
import { isCuid } from "cuid";

const prisma = new PrismaClient();

export default class TaskDao {
  async checkTaskNameAvailability(data: string) {
    const todayMidnight = startOfDay(new Date());
    const task = await prisma.task.findFirst({
      where: {
        name: data,
        updatedAt: {
          gte: todayMidnight,
        },
        OR: [
          {
            name: data,
            createdAt: {
              gte: todayMidnight,
            },
          },
        ],
      },
    });
    if (task) {
      throw new Error("Task already exists within the last 24 hours");
    }
  }

  async checkTaskExist(data: string) {
    let isTaskExist;
    if (isCuid(data)) {
      isTaskExist = await this.getTaskById(data);
      throw new Error("Task already exist");
    }
    if (!isTaskExist) {
      this.checkTaskNameAvailability(data);
      throw new Error("Task not found");
    }
  }

  async createTask(data: taskCreateI) {
    await this.checkTaskNameAvailability(data.name);
    const task = await prisma.task.create({ data });
    return task;
  }

  async getTasks() {
    const tasks = await prisma.task.findMany();
    return tasks;
  }

  async getAllDeletedTasks() {
    const tasks = await prisma.task.findMany({
      where: {
        isDeleted: true,
      },
    });
    return tasks;
  }

  async getTaskById(id: string) {
    const task = await prisma.task.findUnique({ where: { id } });
    if (!task) throw new Error("Task not found");
    return task;
  }

  async updateTask(data: taskUpdateI) {
    try {
      if (data.name) {
        await this.checkTaskNameAvailability(data.name);
      }
      await this.checkTaskExist(data.id);
    } catch (e: unknown) {
      if (e instanceof Error) {
        if (e.message === "Task not found") throw new Error(e.message);

        if (e.message === "Task already exists within the last 24 hours")
          throw new Error(e.message);

        if (e.message === "Task already exist") {
          const task = await prisma.task.update({
            where: { id: data.id },
            data,
          });
          return task;
        }
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  }

  async softDeleteAllActiveTasks() {
    const tasks = await prisma.task.updateMany({
      data: { isDeleted: true },
      where: { isDone: false },
    });
    return tasks;
  }

  async softDeleteAllDoneTasks() {
    const tasks = await prisma.task.updateMany({
      data: { isDeleted: true },
      where: { isDone: true },
    });
    return tasks;
  }

  async hardDeleteTask(id: string) {
    try {
      await this.checkTaskExist(id);
    } catch (e: unknown) {
      if (e instanceof Error)
        if (e.message === "Task not found") throw new Error(e.message);
      const task = await prisma.task.delete({ where: { id } });
      return task;
    }
  }

  async hardDeleteAllTasks() {
    const period = addWeeks(new Date(), -1);
    // const period = addMinutes(new Date(), -55);
    const tasks = await prisma.task.deleteMany({
      where: {
        isDeleted: true,
        updatedAt: {
          lt: period,
        },
      },
    });

    return tasks;
  }
}
