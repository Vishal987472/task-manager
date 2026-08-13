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
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
    >
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-900">
          Create a new task
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Add a task and keep track of your progress.
        </p>
      </div>

      <div className="space-y-5">
        <div>
          <label
            htmlFor="task-title"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Task title
          </label>

          <input
            id="task-title"
            type="text"
            placeholder="e.g. Build Docker images"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
        </div>

        <div>
          <label
            htmlFor="task-description"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Description
          </label>

          <textarea
            id="task-description"
            placeholder="Describe what needs to be done..."
            value={description}
            onChange={(event) =>
              setDescription(event.target.value)
            }
            rows={4}
            className="w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading || !title.trim()}
            className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? 'Creating...' : '+ Create Task'}
          </button>
        </div>
      </div>
    </form>
  )
}