import { Hono } from 'hono'
import { cors } from 'hono/cors'
import taskRoutes from './routes/task.routes'

type Bindings = {
  task_manager_db: D1Database
}

const app = new Hono<{ Bindings: Bindings }>()

app.use(
  '/api/*',
  cors({
    origin: 'http://localhost:5173',
  })
)

app.get('/', (c) => {
  return c.json({
    message: 'Task Manager API',
  })
})

app.route('/api/tasks', taskRoutes)

export default app