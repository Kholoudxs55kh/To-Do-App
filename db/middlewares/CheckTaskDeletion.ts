import TaskDao from "../task.dao";
import cron from "node-cron";

export async function DeleteTaskIfPassesWeekDeleted() {
    console.log("Task deletion cron job started");
  cron.schedule("0 0 * * *", async () => {
    const taskDao = new TaskDao();

    try {
      const deletedTasks = await taskDao.hardDeleteAllTasks();

      console.log(`tasks deleted: ${deletedTasks.count}`);
    } catch (error) {
      console.error(`Error deleting tasks:`, error);
    }
  });
}
