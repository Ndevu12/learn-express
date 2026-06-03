import { createContext, useState, useCallback } from 'react'
import { apiRequest, authHeaders, operationOk, operationFail } from '../lib/api'

export const TaskContext = createContext()

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)
  const [lastError, setLastError] = useState(null)

  const handleAuthError = useCallback((err) => {
    if (err.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
      return true
    }
    return false
  }, [])

  const fetchTasks = useCallback(async (token) => {
    setLoading(true)
    setLastError(null)
    try {
      const data = await apiRequest('/tasks', {
        headers: authHeaders(token),
      })
      const list = Array.isArray(data) ? data : []
      setTasks(list)
      setLastError(null)
      return operationOk({ tasks: list })
    } catch (err) {
      if (!handleAuthError(err)) {
        const result = operationFail(err, 'Failed to load tasks')
        setLastError(result)
        return result
      }
      return operationFail(err)
    } finally {
      setLoading(false)
    }
  }, [handleAuthError])

  const createTask = useCallback(async (taskData, token) => {
    setLastError(null)
    try {
      const newTask = await apiRequest('/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...authHeaders(token),
        },
        body: JSON.stringify(taskData),
      })
      setTasks((prev) => [...prev, newTask])
      setLastError(null)
      return operationOk({ task: newTask })
    } catch (err) {
      if (handleAuthError(err)) {
        return operationFail(err)
      }
      const result = operationFail(err, 'Failed to create task')
      setLastError(result)
      return result
    }
  }, [handleAuthError])

  const updateTask = useCallback(async (id, updates, token) => {
    setLastError(null)
    try {
      const updated = await apiRequest(`/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...authHeaders(token),
        },
        body: JSON.stringify(updates),
      })
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)))
      setLastError(null)
      return operationOk({ task: updated })
    } catch (err) {
      if (handleAuthError(err)) {
        return operationFail(err)
      }
      const result = operationFail(err, 'Failed to update task')
      setLastError(result)
      return result
    }
  }, [handleAuthError])

  const fetchTaskById = useCallback(async (id, token) => {
    setLastError(null)
    try {
      const task = await apiRequest(`/tasks/${id}`, {
        headers: authHeaders(token),
      })
      return operationOk({ task })
    } catch (err) {
      if (handleAuthError(err)) {
        return operationFail(err)
      }
      const result = operationFail(err, 'Failed to load task')
      setLastError(result)
      return result
    }
  }, [handleAuthError])

  const deleteTask = useCallback(async (id, token) => {
    setLastError(null)
    try {
      await apiRequest(`/tasks/${id}`, {
        method: 'DELETE',
        headers: authHeaders(token),
      })
      setTasks((prev) => prev.filter((t) => t.id !== id))
      setLastError(null)
      return operationOk()
    } catch (err) {
      if (handleAuthError(err)) {
        return operationFail(err)
      }
      const result = operationFail(err, 'Failed to delete task')
      setLastError(result)
      return result
    }
  }, [handleAuthError])

  const value = {
    tasks,
    loading,
    lastError,
    fetchTasks,
    fetchTaskById,
    createTask,
    updateTask,
    deleteTask,
  }

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
}
