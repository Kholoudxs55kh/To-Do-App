import { createTask } from "@/utiles/api.server";
import { Modal, Button, TextInput, MultiSelect, Group, Dialog } from "@mantine/core";
import { useState } from "react";

const labelOptions = [
  { value: "work", label: "Work" },
  { value: "personal", label: "Personal" },
  { value: "study", label: "Study" },
  { value: "entertainment", label: "Entertainment" },
  { value: "family", label: "Family" },
  { value: "shopping", label: "Shopping" },
  { value: "others", label: "Others" },
];

interface TaskCreationModalProps {
  taskModalOpen: boolean;
  setTaskModalOpen: (open: boolean) => void;
}

const TaskCreationModal: React.FC<TaskCreationModalProps> = ({
  taskModalOpen,
  setTaskModalOpen,
}) => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleCreateTask = () => {
    if (taskName.trim() === "") {
      alert("Task name is required.");
      return;
    }

    const createNewTask = async (data: taskCreateI) => {
      try {
        await createTask("/task", data);
        setTaskModalOpen(false);
      } catch (error) {
        setError(true);
        console.log(error);
        setErrorMessage((error as { response?: { data?: { error?: string } } })?.response?.data?.error || "An unexpected error occurred.");
      }
    };

    const newTask = {
      name: taskName,
      description: description || "",
      label: selectedLabels,
    };

    setLoading(true);
    createNewTask(newTask);
    setLoading(false);
  };

  return (
    <Modal
      opened={taskModalOpen}
      onClose={() => setTaskModalOpen(false)}
      title="Create New Task"
    >
      <TextInput
        label="Task Name"
        placeholder="Enter task name"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        required
      />
      <TextInput
        label="Description"
        placeholder="Enter task description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <MultiSelect
        data={labelOptions}
        label="Labels"
        placeholder="Select labels"
        value={selectedLabels}
        onChange={setSelectedLabels}
        clearable
      />

      <Group style={{ marginLeft: "45%", display:"flex"}} mt="md">
        <Button
          mt="sm"
          loading={loading}
          onClick={handleCreateTask}
        >
          Create Task
        </Button>
        <Button mt="sm" variant="light" onClick={() => setTaskModalOpen(false)}>
          Cancel
        </Button>
      </Group>
      <Dialog opened={error} onClose={() => setError(false)} title="Error">
        {errorMessage}
      </Dialog>
    </Modal>
  );
};

export default TaskCreationModal;
