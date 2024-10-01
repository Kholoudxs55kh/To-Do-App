import { Text, ActionIcon } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'

export default function ViewIfNoTasks({
  setTaskModalOpen,
}: {
  setTaskModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        minHeight: '50vh',
        color: 'lightGray',
      }}
    >
      {' '}
      <ActionIcon
        size={80}
        color="lightGray"
        variant="outline"
        style={{ borderRadius: '50%', marginBottom: '16px' }}
        onClick={() => setTaskModalOpen(true)}
      >
        <IconPlus size={60} />
      </ActionIcon>
      <Text style={{ color: 'lightGray' }}>Add a new task</Text>
    </div>
  )
}
