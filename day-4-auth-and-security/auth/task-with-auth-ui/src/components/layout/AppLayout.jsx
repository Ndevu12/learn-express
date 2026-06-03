import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

const navClass = ({ isActive }) =>
  `px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
    isActive
      ? 'bg-violet-600 text-white'
      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
  }`

export function AppLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const isAdmin = user?.role === 'admin'

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b border-slate-200 shrink-0">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <h1 className="text-lg font-bold text-slate-900">Task Manager</h1>
            <nav className="flex gap-1" aria-label="Main">
              <NavLink to="/app/tasks" className={navClass}>
                Tasks
              </NavLink>
              <NavLink to="/app/docs" className={navClass}>
                API docs
              </NavLink>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right text-sm">
              <p className="font-medium text-slate-900">{user?.name}</p>
              <p className="text-xs text-slate-500">
                {user?.email}
                <span
                  className={`ml-2 inline-flex rounded-full px-1.5 py-0.5 text-[10px] font-semibold uppercase ${
                    isAdmin ? 'bg-violet-100 text-violet-800' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {user?.role}
                </span>
              </p>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Log out
            </button>
          </div>
        </div>
      </header>

      <Outlet />
    </div>
  )
}
