import { Button, Modal, Text, Group } from '@mantine/core'
import { useState, Dispatch, SetStateAction } from 'react'
import Filteration from '@/components/Filteration'
import { clearTasks } from '@/pages/api/api.server'
import { IconLabelImportant } from '@tabler/icons-react'

interface ClearTasksComponentI {
  taskType: 'active' | 'done'
  tasks: taskI[]
  selectedTimeFrame: string[]
  setSelectedTimeFrame: Dispatch<SetStateAction<string[]>>
  selectedLabels: string[]
  setSelectedLabels: Dispatch<SetStateAction<string[]>>
}

const ClearTasksComponent: React.FC<ClearTasksComponentI> = ({
  taskType,
  tasks,
  selectedTimeFrame,
  setSelectedTimeFrame,
  selectedLabels,
  setSelectedLabels,
}) => {
  const [clearModalOpen, setClearModalOpen] = useState(false)

  const openClearModal = () => {
    setClearModalOpen(true)
  }

  const closeClearModal = () => {
    setClearModalOpen(false)
  }

  const clearAllTasks = () => {
    const endpoint = taskType === 'active' ? '/task' : 'task/delete/done'
    clearTasks(endpoint).then(() => {
      closeClearModal()
    })
  }

  const title =
    taskType === 'active' ? 'Confirm Clear All Active To-Dos' : 'Confirm Clear Done To-Dos'

  const confirmText =
    taskType === 'active'
      ? 'Are you sure you want to clear all active to-dos?'
      : 'Are you sure you want to clear all done to-dos?'

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Button
        color="red"
        variant="outline"
        onClick={openClearModal}
        disabled={tasks.length === 0}
        className={`${taskType === 'active' ? 'ml-[40%]' : 'ml-[55%]'} md:text-sm`}
      >
        {taskType === 'active' ? 'Clear All To-Dos' : 'Clear Done To-Dos'}
      </Button>

      <Modal
        opened={clearModalOpen}
        onClose={closeClearModal}
        title={title}
      >
        <Text>
          {confirmText}{' '}
          <span
            style={{
              fontSize: '12px',
              color: 'red',
              display: 'flex',
              marginTop: '10px',
            }}
          >
            {' '}
            <IconLabelImportant
              size={16}
              style={{ marginRight: '5px', marginTop: '2px' }}
            />{' '}
            All Deleted Tasks will be in Deleted tab for 7days before permentally deletion
          </span>
        </Text>
        <Group className="ml-[40%] mt-4 flex justify-end space-x-4 max-sm:ml-[10%]">
          <Button
            variant="outline"
            onClick={closeClearModal}
          >
            Cancel
          </Button>
          <Button
            color="red"
            onClick={clearAllTasks}
          >
            Confirm
          </Button>
        </Group>
      </Modal>

      <Filteration
        tasks={tasks}
        selectedTimeFrame={selectedTimeFrame}
        setSelectedTimeFrame={setSelectedTimeFrame}
        selectedLabels={selectedLabels}
        setSelectedLabels={setSelectedLabels}
      />
    </div>
  )
}

export default ClearTasksComponent
