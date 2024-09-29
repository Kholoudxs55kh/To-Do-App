import React from "react";
import {
  Table,
  Checkbox,
  Menu,
  ActionIcon,
  Button,
  Badge,
} from "@mantine/core";
import { IconDots, IconEdit, IconTrash } from "@tabler/icons-react";
import { format, isToday, isYesterday } from "date-fns";

interface TaskRowProps {
  task: taskI;
  deleted: boolean;
  openEditModal: (task: taskI) => void;
  openDeleteModal: (task: taskI) => void;
  toggleIsDone: (id: string) => void;
  toggleRestoreTask: (id: string) => void;
}

const TaskRow: React.FC<TaskRowProps> = ({
  task,
  deleted,
  openEditModal,
  openDeleteModal,
  toggleIsDone,
  toggleRestoreTask,
}) => {
  const labelColors: { [key: string]: string } = {
    work: "teal",
    personal: "green",
    study: "lime",
    entertainment: "purple",
    family: "cyan",
    shopping: "grape",
    others: "gray",
  };

  const getChipColor = (label: string) => labelColors[label] || "gray";

  const formatDate = (date: Date) => {
    if (isToday(date)) return "Today";
    if (isYesterday(date)) return "Yesterday";
    return format(date, "EEEE, dd MMM, yyyy");
  };

  return (
    <Table.Tr>
      <Table.Td>
        <Checkbox
          checked={task.isDone}
          onChange={() => toggleIsDone(task.id)}
        />
      </Table.Td>
      <Table.Td>{task.name}</Table.Td>
      <Table.Td>{task.description}</Table.Td>
      <Table.Td>
        {task.label.map((l) => (
          <Badge key={l} color={getChipColor(l)} variant="filled">
            {l}
          </Badge>
        ))}
      </Table.Td>
      <Table.Td>{formatDate(task.updatedAt)}</Table.Td>
      <Table.Td>
        {deleted ? (
          <Button onClick={() => toggleRestoreTask(task.id)}>Restore</Button>
        ) : (
          <Menu withArrow>
            <Menu.Target>
              <ActionIcon
                style={{ backgroundColor: "lightGray", marginLeft: "20%" }}
              >
                <IconDots style={{ backgroundColor: "transparent" }} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              {!task.isDone && (
                <Menu.Item
                  leftSection={<IconEdit size={16} />}
                  onClick={() => openEditModal(task)}
                >
                  Edit
                </Menu.Item>
              )}
              <Menu.Item
                leftSection={<IconTrash size={16} />}
                color="red"
                onClick={() => openDeleteModal(task)}
              >
                Delete
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        )}
      </Table.Td>
    </Table.Tr>
  );
};

export default TaskRow;
