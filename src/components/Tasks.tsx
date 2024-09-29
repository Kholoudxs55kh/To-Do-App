"use client";

import React, { useEffect, useState } from "react";
import { Table } from "@mantine/core";
import { updateTask } from "@/utiles/api.axios";
import UpdateTaskModal from "@/components/taskUpdateModal";
import DeleteTaskModal from "@/components/taskDeletionModal";
import TaskRow from "./TaskRowComponent";

interface ActiveTasksProps {
  tasksProps: taskI[];
  deleted?: boolean;
}

const Tasks: React.FC<ActiveTasksProps> = ({ tasksProps, deleted = false }) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<taskI | null>(null);
  const [tasks, setTasks] = useState<taskI[]>(tasksProps);

  useEffect(() => {
    setTasks(tasksProps);
  }, [tasksProps]);


  const openEditModal = (task: taskI) => {
    setSelectedTask(task);
    setEditModalOpen(true);
  };

  const openDeleteModal = (task: taskI) => {
    setSelectedTask(task);
    setDeleteModalOpen(true);
  };

  const toggleIsDone = async (id: string) => {
    const taskToUpdate = tasks.find((task) => task.id === id);

    if (taskToUpdate) {
      const updatedIsDone = !taskToUpdate.isDone;
      try {
        await updateTask(`/task/${id}`, { id, isDone: updatedIsDone });
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === id ? { ...task, isDone: updatedIsDone } : task
          )
        );
      } catch (error) {
        console.error("Failed to update task on server:", error);
      }
    }
  };

  const toggleRestoreTask = async (id: string) => {
    try {
      await updateTask(`/task/${id}`, { id, isDeleted: false });
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, isDeleted: false } : task
        )
      );
    } catch (error) {
      console.error("Failed to restore task on server:", error);
    }
  };

  return (
    <div style={{ overflowX: "auto" }}>
      <Table highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Done</Table.Th>
            <Table.Th>Task Name</Table.Th>
            <Table.Th>Task Description</Table.Th>
            <Table.Th>Labels</Table.Th>
            <Table.Th>Date</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {tasks.map((task) => (
            <TaskRow
              key={task.id}
              task={task}
              deleted={deleted}
              openEditModal={openEditModal}
              openDeleteModal={openDeleteModal}
              toggleIsDone={toggleIsDone}
              toggleRestoreTask={toggleRestoreTask}
            />
          ))}
        </Table.Tbody>
      </Table>

      {selectedTask && (
        <>
          <UpdateTaskModal
            isOpen={editModalOpen}
            task={selectedTask}
            onClose={() => setEditModalOpen(false)}
          />
          <DeleteTaskModal
            isOpen={deleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            task={selectedTask}
          />
        </>
      )}
    </div>
  );
};

export default Tasks;
