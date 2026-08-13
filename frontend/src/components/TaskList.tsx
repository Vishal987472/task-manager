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
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
        <p className="text-slate-500">
          No tasks yet. Create your first task above.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => {
        const completed = task.status === 'COMPLETED'

        return (
          <div
            key={task.id}
            className={`rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md sm:p-6 ${
              completed
                ? 'border-emerald-200 bg-emerald-50/30'
                : 'border-slate-200'
            }`}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h3
                    className={`text-lg font-semibold ${
                      completed
                        ? 'text-slate-500 line-through'
                        : 'text-slate-900'
                    }`}
                  >
                    {task.title}
                  </h3>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      completed
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-amber-100 text-amber-700'
                    }`}
                  >
                    {completed ? 'COMPLETED' : 'PENDING'}
                  </span>
                </div>

                {task.description && (
                  <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-600">
                    {task.description}
                  </p>
                )}
              </div>

              <div className="flex shrink-0 gap-2">
                <button
                  onClick={() => handleComplete(task)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-4 ${
                    completed
                      ? 'bg-amber-100 text-amber-700 hover:bg-amber-200 focus:ring-amber-100'
                      : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200 focus:ring-emerald-100'
                  }`}
                >
                  {completed ? 'Mark Pending' : 'Complete'}
                </button>

                <button
                  onClick={() => handleDelete(task.id)}
                  className="rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100 focus:outline-none focus:ring-4 focus:ring-red-100"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}