import type { Dispatch, SetStateAction } from 'react'
import TaskList, { type Task } from './TaskList'
import TaskForm from './TaskForm'

interface TaskAppProps {
  tasks?: Task[]
  setTasks?: Dispatch<SetStateAction<Task[]>>
  dispatch?: (action: { type: string; payload?: unknown }) => void
  showForm?: boolean
  countFormat?: string
  showFilterBar?: boolean
  showStatsPanel?: boolean
  onDelete?: (id: string | number) => void
  linkToTaskDetail?: boolean
}

export default function TaskApp(props: TaskAppProps) {
  const tasks = props.tasks ?? []
  const taskCountText = `${tasks.length} Tasks`

  function handleAddTask(task: Task) {
    if (props.setTasks) {
      props.setTasks((prevTasks) => [...prevTasks, task])
    }
  }

  return (
    <main>
      {props.showForm && (
        <TaskForm onAddTask={handleAddTask} />
      )}

      <TaskList
        tasks={tasks}
        countText={taskCountText}
      />
    </main>
  )
}