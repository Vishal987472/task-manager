import axios from 'axios'
import type {
  CreateTaskRequest,
  Task,
  UpdateTaskRequest,
} from '../types/task'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const getTasks = async (): Promise<Task[]> => {
  const response = await api.get<Task[]>('/tasks')
  return response.data
}

export const getTask = async (id: number): Promise<Task> => {
  const response = await api.get<Task>(`/tasks/${id}`)
  return response.data
}

export const createTask = async (
  data: CreateTaskRequest
): Promise<Task> => {
  const response = await api.post<Task>('/tasks', data)
  return response.data
}

export const updateTask = async (
  id: number,
  data: UpdateTaskRequest
): Promise<Task> => {
  const response = await api.put<Task>(`/tasks/${id}`, data)
  return response.data
}

export const deleteTask = async (id: number): Promise<void> => {
  await api.delete(`/tasks/${id}`)
}