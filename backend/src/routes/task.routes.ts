import { Hono } from 'hono'
import {
  createTaskController,
  deleteTaskController,
  getTask,
  getTasks,
  updateTaskController,
} from '../controllers/task.controller'

type Bindings = {
  task_manager_db: D1Database
}

const taskRoutes = new Hono<{ Bindings: Bindings }>()

taskRoutes.get('/', getTasks)
taskRoutes.get('/:id', getTask)
taskRoutes.post('/', createTaskController)
taskRoutes.put('/:id', updateTaskController)
taskRoutes.delete('/:id', deleteTaskController)

export default taskRoutes