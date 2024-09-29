import { updateTask } from "@/utiles/api.axios";
import { Modal, Button, TextInput, Checkbox, MultiSelect, Group } from "@mantine/core";
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

  const handleSave = async () => {
    const updatedTaskData = {
      id: task.id,
      name: taskName,
      description: description || "", // Optional description
      label: selectedLabels,
      isDone: isDone,
    };

    try {
      await updateTask(`/task/${task.id}`, updatedTaskData);
      onClose(); // Close the modal after the task is saved
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <Modal opened={isOpen} onClose={onClose} title="Edit Task">
      <Checkbox
        label="Mark as Done"
        checked={isDone}
        onChange={(e) => setIsDone(e.currentTarget.checked)}
      />
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
              <Group style={{ marginLeft: "55%" }} mt="md">

      <Button mt="md" onClick={handleSave}>
        Save
      </Button>
        <Button mt="md" variant="light" onClick={onClose}>
            Cancel
            </Button>
        </Group>
    </Modal>
  );
};

export default UpdateTaskModal;
