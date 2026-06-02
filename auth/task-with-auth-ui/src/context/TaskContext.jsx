import { createContext, useState, useCallback } from 'react'

export const TaskContext = createContext()

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchTasks = useCallback(async (token) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('http://localhost:4000/tasks', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      
      if (!response.ok) throw new Error('Failed to fetch tasks')
      
      const data = await response.json()
      setTasks(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  const createTask = useCallback(async (taskData, token) => {
    setError(null)
    try {
      const response = await fetch('http://localhost:4000/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(taskData)
      })
      
      if (!response.ok) throw new Error('Failed to create task')
      
      const newTask = await response.json()
      setTasks([...tasks, newTask])
      return true
    } catch (err) {
      setError(err.message)
      return false
    }
  }, [tasks])

  const updateTask = useCallback(async (id, updates, token) => {
    setError(null)
    try {
      const response = await fetch(`http://localhost:4000/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updates)
      })
      
      if (!response.ok) throw new Error('Failed to update task')
      
      const updated = await response.json()
      setTasks(tasks.map(t => t.id === id ? updated : t))
      return true
    } catch (err) {
      setError(err.message)
      return false
    }
  }, [tasks])

  const deleteTask = useCallback(async (id, token) => {
    setError(null)
    try {
      const response = await fetch(`http://localhost:4000/tasks/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      
      if (!response.ok) throw new Error('Failed to delete task')
      
      setTasks(tasks.filter(t => t.id !== id))
      return true
    } catch (err) {
      setError(err.message)
      return false
    }
  }, [tasks])

  const value = {
    tasks,
    loading,
    error,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask
  }

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
}
