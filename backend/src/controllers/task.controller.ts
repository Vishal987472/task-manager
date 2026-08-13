import type { Context } from 'hono'
import {
  createTask,
  deleteTask,
  getAllTasks,
  getTaskById,
  updateTask,
} from '../services/task.service'
import type {
  CreateTaskRequest,
  UpdateTaskRequest,
} from '../types/task'

type Bindings = {
  task_manager_db: D1Database
}

export async function getTasks(c: Context<{ Bindings: Bindings }>) {
  const tasks = await getAllTasks(c.env.task_manager_db)

  return c.json(tasks)
}

export async function getTask(c: Context<{ Bindings: Bindings }>) {
  const id = Number(c.req.param('id'))

  if (!Number.isInteger(id)) {
    return c.json({ error: 'Invalid task ID' }, 400)
  }

  const task = await getTaskById(
    c.env.task_manager_db,
    id
  )

  if (!task) {
    return c.json({ error: 'Task not found' }, 404)
  }

  return c.json(task)
}

export async function createTaskController(
  c: Context<{ Bindings: Bindings }>
) {
  const body = await c.req.json<CreateTaskRequest>()

  if (!body.title?.trim()) {
    return c.json({ error: 'Title is required' }, 400)
  }

  const task = await createTask(
    c.env.task_manager_db,
    body
  )

  return c.json(task, 201)
}

export async function updateTaskController(
  c: Context<{ Bindings: Bindings }>
) {
  const id = Number(c.req.param('id'))

  if (!Number.isInteger(id)) {
    return c.json({ error: 'Invalid task ID' }, 400)
  }

  const body = await c.req.json<UpdateTaskRequest>()

  if (!body.title?.trim()) {
    return c.json({ error: 'Title is required' }, 400)
  }

  const existingTask = await getTaskById(
    c.env.task_manager_db,
    id
  )

  if (!existingTask) {
    return c.json({ error: 'Task not found' }, 404)
  }

  const task = await updateTask(
    c.env.task_manager_db,
    id,
    body
  )

  return c.json(task)
}

export async function deleteTaskController(
  c: Context<{ Bindings: Bindings }>
) {
  const id = Number(c.req.param('id'))

  if (!Number.isInteger(id)) {
    return c.json({ error: 'Invalid task ID' }, 400)
  }

  const result = await deleteTask(
    c.env.task_manager_db,
    id
  )

  if (result.meta.changes === 0) {
    return c.json({ error: 'Task not found' }, 404)
  }

  return c.json({
    message: 'Task deleted successfully',
  })
}