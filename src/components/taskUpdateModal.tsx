import { updateTask } from "@/utiles/api.server";
import {
  Modal,
  Button,
  TextInput,
  Checkbox,
  MultiSelect,
  Group,
  Dialog,
} from "@mantine/core";
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

interface EditTaskModalProps {
  task: taskI;
  isOpen: boolean;
  onClose: () => void;
}

const UpdateTaskModal: React.FC<EditTaskModalProps> = ({
  task,
  isOpen,
  onClose,
}) => {
  const [taskName, setTaskName] = useState(task.name);
  const [description, setDescription] = useState(task.description || "");
  const [selectedLabels, setSelectedLabels] = useState<string[]>(task.label);
  const [isDone, setIsDone] = useState(task.isDone);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSave = async () => {
    const updatedTaskData = {
      id: task.id,
      name: taskName,
      description: description || "",
      label: selectedLabels,
      isDone: isDone,
    };

    try {
      await updateTask(`/task/${task.id}`, updatedTaskData);
      onClose();
    } catch (error) {
      setError(true);
      setTimeout(() => setError(false), 5000);
      console.log(error);
      setErrorMessage(
        (error as { response?: { data?: { error?: string } } })?.response?.data
          ?.error || "An unexpected error occurred."
      );
    }
  };

  return (
    <Modal opened={isOpen} onClose={onClose} title="Edit Task">
      <TextInput
        label="Task Name"
        placeholder="Enter task name"
        value={taskName}
        onChange={(e) => setTaskName(e.currentTarget.value)}
        required
      />
      <TextInput
        label="Description"
        placeholder="Enter task description (optional)"
        value={description}
        onChange={(e) => setDescription(e.currentTarget.value)}
      />
      <MultiSelect
        data={labelOptions}
        label="Labels"
        placeholder="Select labels"
        value={selectedLabels}
        onChange={setSelectedLabels}
        clearable
      />
      <Checkbox
        label="Mark as Done"
        className="mt-4"
        checked={isDone}
        onChange={(e) => setIsDone(e.currentTarget.checked)}
      />
      <Group  className="ml-[55%] max-sm:m-0" mt="md">
        <Button mt="md" onClick={handleSave}>
          Save
        </Button>
        <Button mt="md" variant="light" onClick={onClose}>
          Cancel
        </Button>
      </Group>
      <Dialog opened={error} onClose={() => setError(false)} title="Error">
        {errorMessage}
      </Dialog>
    </Modal>
  );
};

export default UpdateTaskModal;
