import { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useTasks } from '../hooks/useTasks'
import { FormAlert } from '../components/FormAlert'
import { TaskDetailModal } from '../components/TaskDetailModal'
import { TaskEditModal } from '../components/TaskEditModal'

function toDateInputValue(isoOrDate) {
  const d = new Date(isoOrDate)
  if (Number.isNaN(d.getTime())) return ''
  return d.toISOString().slice(0, 10)
}

export function TasksPage() {
  const { user, token } = useAuth()
  const {
    tasks,
    fetchTasks,
    fetchTaskById,
    createTask,
    updateTask,
    deleteTask,
    loading,
    lastError,
  } = useTasks()

  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState(3)
  const [deadline, setDeadline] = useState('')
  const [formError, setFormError] = useState(null)
  const [fieldErrors, setFieldErrors] = useState({})
  const [listError, setListError] = useState(null)
  const [saving, setSaving] = useState(false)

  const [detailOpen, setDetailOpen] = useState(false)
  const [detailTask, setDetailTask] = useState(null)
  const [detailLoading, setDetailLoading] = useState(false)
  const [detailError, setDetailError] = useState(null)

  const [editOpen, setEditOpen] = useState(false)
  const [editId, setEditId] = useState(null)
  const [editTitle, setEditTitle] = useState('')
  const [editPriority, setEditPriority] = useState(3)
  const [editDeadline, setEditDeadline] = useState('')
  const [editError, setEditError] = useState(null)
  const [editFieldErrors, setEditFieldErrors] = useState({})

  const isAdmin = user?.role === 'admin'

  useEffect(() => {
    if (token) {
      fetchTasks(token)
    }
  }, [token, fetchTasks])

  const applyError = (result, setMessage, setFields) => {
    setMessage(result.message)
    setFields(result.fields || {})
  }

  const handleRefresh = async () => {
    setListError(null)
    const result = await fetchTasks(token)
    if (!result.ok) setListError(result.message)
  }

  const handleCreate = async (e) => {
    e.preventDefault()
    setFormError(null)
    setFieldErrors({})

    if (!title.trim()) {
      setFormError('Please enter a task title')
      setFieldErrors({ title: 'Title is required' })
      return
    }
    if (!deadline) {
      setFormError('Please choose a deadline')
      setFieldErrors({ deadline: 'Deadline is required' })
      return
    }

    setSaving(true)
    const result = await createTask(
      { title: title.trim(), priority: parseInt(priority, 10), deadline },
      token
    )
    setSaving(false)

    if (result.ok) {
      setTitle('')
      setPriority(3)
      setDeadline('')
      return
    }
    applyError(result, setFormError, setFieldErrors)
  }

  const openDetail = async (taskId) => {
    setDetailOpen(true)
    setDetailTask(null)
    setDetailError(null)
    setDetailLoading(true)

    const result = await fetchTaskById(taskId, token)
    setDetailLoading(false)

    if (result.ok) {
      setDetailTask(result.task)
    } else {
      setDetailError(result.message)
    }
  }

  const closeDetail = () => {
    setDetailOpen(false)
    setDetailTask(null)
    setDetailError(null)
  }

  const openEdit = (task) => {
    closeDetail()
    setEditId(task.id)
    setEditTitle(task.title)
    setEditPriority(task.priority)
    setEditDeadline(toDateInputValue(task.deadline))
    setEditError(null)
    setEditFieldErrors({})
    setEditOpen(true)
  }

  const closeEdit = () => {
    setEditOpen(false)
    setEditId(null)
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    setEditError(null)
    setEditFieldErrors({})

    if (!editTitle.trim() || !editDeadline) {
      setEditError('Title and deadline are required')
      return
    }

    setSaving(true)
    const result = await updateTask(
      editId,
      {
        title: editTitle.trim(),
        priority: parseInt(editPriority, 10),
        deadline: editDeadline,
      },
      token
    )
    setSaving(false)

    if (result.ok) {
      closeEdit()
      return
    }
    applyError(result, setEditError, setEditFieldErrors)
  }

  const handleDelete = async (taskId, taskTitle) => {
    if (!window.confirm(`Delete "${taskTitle}"? This cannot be undone.`)) return

    setListError(null)
    const result = await deleteTask(taskId, token)
    if (!result.ok) {
      setListError(result.message)
    }
    if (detailOpen && detailTask?.id === taskId) closeDetail()
    if (editOpen && editId === taskId) closeEdit()
  }

  return (
    <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 space-y-8">
      {isAdmin && (
        <p className="text-sm text-violet-800 bg-violet-50 border border-violet-100 rounded-lg px-4 py-3">
          You are signed in as an administrator and can see tasks from all users.
        </p>
      )}

      <section className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <h2 className="text-lg font-bold text-slate-900 mb-1">Add a task</h2>
        <p className="text-sm text-slate-500 mb-4">Create a new task with a title, priority, and deadline.</p>

        <FormAlert message={formError} fields={fieldErrors} />

        <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-4 gap-4" noValidate>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Finish homework"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-violet-500 ${
                fieldErrors.title ? 'border-red-400' : 'border-slate-300'
              }`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(Number(e.target.value))}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg"
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n} — {n <= 2 ? 'High' : n === 3 ? 'Medium' : 'Low'}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Deadline</label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg"
            />
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              disabled={saving || loading}
              className="w-full bg-violet-600 text-white py-2.5 rounded-lg font-medium hover:bg-violet-700 disabled:opacity-50"
            >
              Add task
            </button>
          </div>
        </form>
      </section>

      <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              {isAdmin ? 'All tasks' : 'Your tasks'}
            </h2>
            <p className="text-sm text-slate-500 mt-0.5">
              {tasks.length} task{tasks.length === 1 ? '' : 's'}
            </p>
          </div>
          <button
            type="button"
            onClick={handleRefresh}
            disabled={loading}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
          >
            {loading ? 'Refreshing…' : 'Refresh'}
          </button>
        </div>

        {(listError || lastError?.message) && (
          <div className="px-6 pt-4">
            <FormAlert message={listError || lastError?.message} />
          </div>
        )}

        {loading && tasks.length === 0 ? (
          <p className="px-6 py-12 text-center text-slate-500">Loading your tasks…</p>
        ) : tasks.length === 0 ? (
          <p className="px-6 py-12 text-center text-slate-500">
            No tasks yet. Add one above to get started.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-6 py-3 text-left font-medium">Title</th>
                  <th className="px-6 py-3 text-left font-medium">Priority</th>
                  <th className="px-6 py-3 text-left font-medium">Deadline</th>
                  {isAdmin && <th className="px-6 py-3 text-left font-medium">Owner</th>}
                  <th className="px-6 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task.id} className="border-t border-slate-100 hover:bg-slate-50/80">
                    <td className="px-6 py-4 font-medium text-slate-900">{task.title}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          task.priority <= 2
                            ? 'bg-red-100 text-red-800'
                            : task.priority === 3
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        P{task.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {new Date(task.deadline).toLocaleDateString()}
                    </td>
                    {isAdmin && (
                      <td className="px-6 py-4 text-slate-500 text-xs">User #{task.userId}</td>
                    )}
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => openDetail(task.id)}
                          className="rounded-lg px-3 py-1.5 text-xs font-medium text-violet-700 bg-violet-50 hover:bg-violet-100"
                        >
                          View
                        </button>
                        <button
                          type="button"
                          onClick={() => openEdit(task)}
                          className="rounded-lg px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(task.id, task.title)}
                          className="rounded-lg px-3 py-1.5 text-xs font-medium text-red-700 bg-red-50 hover:bg-red-100"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {detailOpen && (
        <TaskDetailModal
          task={detailTask}
          loading={detailLoading}
          error={detailError}
          onClose={closeDetail}
          onEdit={openEdit}
        />
      )}

      {editOpen && (
        <TaskEditModal
          taskId={editId}
          title={editTitle}
          priority={editPriority}
          deadline={editDeadline}
          onTitleChange={setEditTitle}
          onPriorityChange={setEditPriority}
          onDeadlineChange={setEditDeadline}
          error={editError}
          fieldErrors={editFieldErrors}
          saving={saving}
          onSubmit={handleUpdate}
          onClose={closeEdit}
        />
      )}
    </main>
  )
}
