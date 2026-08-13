import type {
    CreateTaskRequest,
    UpdateTaskRequest,
  } from '../types/task'
  
  export async function getAllTasks(db: D1Database) {
    const { results } = await db
      .prepare(`
        SELECT *
        FROM tasks
        ORDER BY created_at DESC
      `)
      .all()
  
    return results
  }
  
  export async function getTaskById(
    db: D1Database,
    id: number
  ) {
    return db
      .prepare('SELECT * FROM tasks WHERE id = ?')
      .bind(id)
      .first()
  }
  
  export async function createTask(
    db: D1Database,
    data: CreateTaskRequest
  ) {
    const result = await db
      .prepare(`
        INSERT INTO tasks (title, description)
        VALUES (?, ?)
      `)
      .bind(
        data.title.trim(),
        data.description?.trim() || null
      )
      .run()
  
    return getTaskById(db, result.meta.last_row_id)
  }
  
  export async function updateTask(
    db: D1Database,
    id: number,
    data: UpdateTaskRequest
  ) {
    await db
      .prepare(`
        UPDATE tasks
        SET title = ?,
            description = ?,
            status = ?,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `)
      .bind(
        data.title.trim(),
        data.description?.trim() || null,
        data.status ?? 'PENDING',
        id
      )
      .run()
  
    return getTaskById(db, id)
  }
  
  export async function deleteTask(
    db: D1Database,
    id: number
  ) {
    return db
      .prepare('DELETE FROM tasks WHERE id = ?')
      .bind(id)
      .run()
  }