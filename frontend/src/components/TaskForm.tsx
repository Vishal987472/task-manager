import { useState } from 'react'
import type { FormEvent } from 'react'
import { createTask } from '../services/taskService'
import type { Task } from '../types/task'

interface TaskFormProps {
  onTaskCreated: (task: Task) => void
}

export default function TaskForm({
  onTaskCreated,
}: TaskFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    if (!title.trim()) {
      return
    }

    try {
      setLoading(true)

      const task = await createTask({
        title,
        description,
      })

      onTaskCreated(task)

      setTitle('')
      setDescription('')
    } catch (error) {
      console.error('Failed to create task:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(event) =>
          setDescription(event.target.value)
        }
      />

      <button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create Task'}
      </button>
    </form>
  )
}