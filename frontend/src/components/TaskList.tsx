import type { Task } from '../types/task'
import {
  deleteTask,
  updateTask,
} from '../services/taskService'

interface TaskListProps {
  tasks: Task[]
  onTaskUpdated: (task: Task) => void
  onTaskDeleted: (id: number) => void
}

export default function TaskList({
  tasks,
  onTaskUpdated,
  onTaskDeleted,
}: TaskListProps) {
  const handleComplete = async (task: Task) => {
    try {
      const updatedTask = await updateTask(task.id, {
        title: task.title,
        description: task.description ?? '',
        status:
          task.status === 'COMPLETED'
            ? 'PENDING'
            : 'COMPLETED',
      })

      onTaskUpdated(updatedTask)
    } catch (error) {
      console.error('Failed to update task:', error)
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await deleteTask(id)
      onTaskDeleted(id)
    } catch (error) {
      console.error('Failed to delete task:', error)
    }
  }

  if (tasks.length === 0) {
    return <p>No tasks yet.</p>
  }

  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id}>
          <h3>{task.title}</h3>

          {task.description && (
            <p>{task.description}</p>
          )}

          <p>Status: {task.status}</p>

          <button onClick={() => handleComplete(task)}>
            {task.status === 'COMPLETED'
              ? 'Mark Pending'
              : 'Complete'}
          </button>

          <button onClick={() => handleDelete(task.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  )
}