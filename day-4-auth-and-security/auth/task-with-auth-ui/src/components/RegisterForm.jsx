import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { FormAlert } from './FormAlert'

export const RegisterForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})
  const { register, loading, lastError } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFieldErrors({})
    const result = await register(email, password, name)
    if (result.ok) {
      navigate('/app/tasks')
    } else if (result.fields) {
      setFieldErrors(result.fields)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-violet-100 px-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-slate-900 mb-2">Create Account</h1>
        <p className="text-center text-sm text-slate-500 mb-6">Password must be at least 6 characters</p>

        <FormAlert message={lastError?.message} fields={fieldErrors} />

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-violet-500"
              placeholder="Jane Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
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
              minLength={6}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 ${
                fieldErrors.password
                  ? 'border-red-400 focus:ring-red-500'
                  : 'border-slate-300 focus:ring-violet-500'
              }`}
              placeholder="••••••••"
            />
            {fieldErrors.password && (
              <p className="mt-1 text-xs text-red-600">{fieldErrors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-violet-600 text-white py-2 rounded-lg font-medium hover:bg-violet-700 disabled:bg-slate-400 transition"
          >
            {loading ? 'Creating account…' : 'Register'}
          </button>
        </form>

        <p className="text-center text-slate-600 mt-6 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-violet-600 hover:underline font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}
