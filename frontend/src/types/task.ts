export type TaskStatus = 'PENDING' | 'COMPLETED'

export interface Task {
  id: number
  title: string
  description: string | null
  status: TaskStatus
  created_at: string
  updated_at: string
}

export interface CreateTaskRequest {
  title: string
  description?: string
}

export interface UpdateTaskRequest {
  title: string
  description?: string
  status?: TaskStatus
}