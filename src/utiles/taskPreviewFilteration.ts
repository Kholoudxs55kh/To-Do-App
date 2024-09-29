import { isToday, isYesterday } from 'date-fns';

export const filterTasks = (
  tasks: taskI[],
  selectedTimeFrame: string[],
  selectedLabels: string[]
): taskI[] => {
  let filteredTasks = tasks;

  if (selectedTimeFrame.length > 0) {
    const today = new Date();
    if (selectedTimeFrame.includes("today")) {
      filteredTasks = filteredTasks.filter((task) =>
        isToday(new Date(task.createdAt))
      );
    } else if (selectedTimeFrame.includes("yesterday")) {
      filteredTasks = filteredTasks.filter((task) =>
        isYesterday(new Date(task.createdAt))
      );
    } else if (selectedTimeFrame.includes("thisWeek")) {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(today.getDate() - 7);
      filteredTasks = filteredTasks.filter(
        (task) => new Date(task.createdAt).getTime() > oneWeekAgo.getTime()
      );
    } else if (selectedTimeFrame.includes("olderWeek")) {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(today.getDate() - 7);
      filteredTasks = filteredTasks.filter(
        (task) => new Date(task.createdAt).getTime() <= oneWeekAgo.getTime()
      );
    } else if (selectedTimeFrame.includes("olderMonth")) {
      const oneMonthAgo = new Date(today.setMonth(today.getMonth() - 1));
      filteredTasks = filteredTasks.filter(
        (task) => new Date(task.createdAt).getTime() <= oneMonthAgo.getTime()
      );
    }
  }

  if (selectedLabels.length > 0) {
    filteredTasks = filteredTasks.filter((task) =>
      task.label.some((l) => selectedLabels.includes(l))
    );
  }

  return filteredTasks;
};
