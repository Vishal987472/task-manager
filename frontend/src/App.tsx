import { useEffect, useState } from 'react'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import { getTasks } from './services/taskService'
import type { Task } from './types/task'

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await getTasks()
        setTasks(data)
      } catch (error) {
        console.error('Failed to load tasks:', error)
      } finally {
        setLoading(false)
      }
    }

    loadTasks()
  }, [])

  const handleTaskCreated = (task: Task) => {
    setTasks((currentTasks) => [
      task,
      ...currentTasks,
    ])
  }

  const handleTaskUpdated = (updatedTask: Task) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === updatedTask.id
          ? updatedTask
          : task
      )
    )
  }

  const handleTaskDeleted = (id: number) => {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== id)
    )
  }

  return (
    <main>
      <h1>Task Manager</h1>

      <TaskForm
        onTaskCreated={handleTaskCreated}
      />

      <hr />

      <h2>Tasks</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <TaskList
          tasks={tasks}
          onTaskUpdated={handleTaskUpdated}
          onTaskDeleted={handleTaskDeleted}
        />
      )}
    </main>
  )
}

export default App