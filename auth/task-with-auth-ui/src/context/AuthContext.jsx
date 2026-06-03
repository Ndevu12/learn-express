import { createContext, useState, useCallback, useEffect } from 'react'
import { apiRequest, authHeaders, operationOk, operationFail } from '../lib/api'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user')
    return stored ? JSON.parse(stored) : null
  })
  const [token, setToken] = useState(() => localStorage.getItem('token'))
  const [loading, setLoading] = useState(!!localStorage.getItem('token'))
  const [lastError, setLastError] = useState(null)

  const persistSession = useCallback((sessionToken, sessionUser) => {
    setToken(sessionToken)
    setUser(sessionUser)
    localStorage.setItem('token', sessionToken)
    localStorage.setItem('user', JSON.stringify(sessionUser))
  }, [])

  const clearSession = useCallback(() => {
    setToken(null)
    setUser(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }, [])

  const refreshSession = useCallback(async () => {
    const storedToken = localStorage.getItem('token')
    if (!storedToken) {
      setLoading(false)
      return
    }

    try {
      const data = await apiRequest('/auth/me', {
        headers: authHeaders(storedToken),
      })
      persistSession(storedToken, data.user)
    } catch (err) {
      if (err.status === 401) {
        clearSession()
      }
    } finally {
      setLoading(false)
    }
  }, [clearSession, persistSession])

  useEffect(() => {
    refreshSession()
  }, [refreshSession])

  const login = useCallback(async (email, password) => {
    setLoading(true)
    setLastError(null)
    try {
      const data = await apiRequest('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      persistSession(data.token, data.user)
      setLastError(null)
      return operationOk()
    } catch (err) {
      const result = operationFail(err, 'Login failed')
      setLastError(result)
      return result
    } finally {
      setLoading(false)
    }
  }, [persistSession])

  const register = useCallback(async (email, password, name) => {
    setLoading(true)
    setLastError(null)
    try {
      const data = await apiRequest('/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      })
      persistSession(data.token, data.user)
      setLastError(null)
      return operationOk()
    } catch (err) {
      const result = operationFail(err, 'Registration failed')
      setLastError(result)
      return result
    } finally {
      setLoading(false)
    }
  }, [persistSession])

  const logout = useCallback(() => {
    clearSession()
    setLastError(null)
  }, [clearSession])

  const fetchProfile = useCallback(async () => {
    const storedToken = token || localStorage.getItem('token')
    if (!storedToken) {
      return operationFail(new Error('Not logged in'), 'Not logged in')
    }

    setLastError(null)
    try {
      const data = await apiRequest('/auth/me', {
        headers: authHeaders(storedToken),
      })
      persistSession(storedToken, data.user)
      return operationOk({ user: data.user, raw: data })
    } catch (err) {
      if (err.status === 401) {
        clearSession()
      }
      const result = operationFail(err, 'Failed to refresh profile')
      setLastError(result)
      return result
    }
  }, [token, clearSession, persistSession])

  const value = {
    user,
    token,
    loading,
    lastError,
    login,
    register,
    logout,
    refreshSession,
    fetchProfile,
    isAuthenticated: !!token && !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
