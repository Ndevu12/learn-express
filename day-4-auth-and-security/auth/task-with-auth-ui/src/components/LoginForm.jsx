import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { FormAlert } from './FormAlert'

const DEMO_ACCOUNTS = [
  { label: 'User', email: 'user@learn-express.test', password: 'user123' },
  { label: 'Admin', email: 'admin@learn-express.test', password: 'admin123' },
]

export const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})
  const { login, loading, lastError } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFieldErrors({})
    const result = await login(email, password)
    if (result.ok) {
      navigate('/app/tasks')
      return
    }
    if (result.fields) {
      setFieldErrors(result.fields)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-violet-100 px-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-slate-900 mb-2">Task Manager</h1>
        <p className="text-center text-sm text-slate-500 mb-6">Session 4 — sign in to manage your tasks</p>

        <FormAlert message={lastError?.message} fields={fieldErrors} />

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 ${
                fieldErrors.email
                  ? 'border-red-400 focus:ring-red-500'
                  : 'border-slate-300 focus:ring-violet-500'
              }`}
              placeholder="your@email.com"
            />
            {fieldErrors.email && (
              <p className="mt-1 text-xs text-red-600">{fieldErrors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-violet-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-violet-600 text-white py-2 rounded-lg font-medium hover:bg-violet-700 disabled:bg-slate-400 transition"
          >
            {loading ? 'Logging in…' : 'Login'}
          </button>
        </form>

        <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
            Demo accounts (API seeds on first start)
          </p>
          <div className="flex flex-wrap gap-2">
            {DEMO_ACCOUNTS.map((account) => (
              <button
                key={account.email}
                type="button"
                onClick={() => {
                  setEmail(account.email)
                  setPassword(account.password)
                  setFieldErrors({})
                }}
                className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:border-violet-300 hover:text-violet-700"
              >
                Use {account.label}
              </button>
            ))}
          </div>
        </div>

        <p className="text-center text-slate-600 mt-6 text-sm">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="text-violet-600 hover:underline font-medium">
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}
