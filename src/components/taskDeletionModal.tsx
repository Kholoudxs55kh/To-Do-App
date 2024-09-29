import { updateTask } from "@/utiles/api.axios";
import { Modal, Button, Text, Group } from "@mantine/core";
import { IconLabelImportant } from "@tabler/icons-react";

interface DeleteTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: taskUpdateI;
}

const DeleteTaskModal: React.FC<DeleteTaskModalProps> = ({
  isOpen,
  onClose,
  task,
}) => {
  const handleDelete = async () => {
    try {
      await updateTask(`/task/${task.id}`, { id: task.id, isDeleted: true });
    } catch (error) {
      console.error("Error deleting task:", error);
    }
    onClose();
  };

  return (
    <Modal opened={isOpen} onClose={onClose} title="Delete Task" centered>
      <Text>
        Are you sure you want to delete this task? <br />{" "}
        <span
          style={{
            fontSize: "12px",
            color: "red",
            display: "flex",
            marginTop: "10px",
          }}
        >
          {" "}
          <IconLabelImportant size={16} style={{ marginRight: "5px", marginTop:"2px" }} /> All Deleted
          Tasks will be in Deleted tab for 7days before permentally deletion
        </span>
      </Text>
      <Group style={{ marginLeft: "50%" }} mt="md">
      <Button color="red"  mt="sm" onClick={handleDelete}>
        Confirm
      </Button>
      <Button  mt="sm" onClick={onClose}>
        Cancel
      </Button>
        </Group>
    </Modal>
  );
};

export default DeleteTaskModal;
