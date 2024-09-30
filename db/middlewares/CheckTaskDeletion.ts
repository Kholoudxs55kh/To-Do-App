import TaskDao from "../task.dao";

export async function DeleteTaskIfPassesWeekDeleted() {
  const taskDao = new TaskDao();

  try {
    const deletedTasks = await taskDao.hardDeleteAllTasks();

    console.log(`tasks deleted: ${deletedTasks.count}`);
  } catch (error) {
    console.error(`Error deleting tasks:`, error);
  }
}
