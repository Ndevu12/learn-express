export function TaskDetailModal({ task, loading, error, onClose, onEdit }) {
  if (!task && !loading && !error) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="task-detail-title"
    >
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <h2 id="task-detail-title" className="text-lg font-bold text-slate-900">
            Task details
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 text-xl leading-none"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className="px-6 py-5">
          {loading && <p className="text-slate-500 text-sm">Loading…</p>}

          {error && (
            <p className="text-red-700 text-sm bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          {task && !loading && (
            <dl className="space-y-4 text-sm">
              <div>
                <dt className="text-xs font-medium uppercase tracking-wider text-slate-500">
                  Title
                </dt>
                <dd className="mt-1 text-slate-900 font-medium">{task.title}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-wider text-slate-500">
                  Priority
                </dt>
                <dd className="mt-1">Level {task.priority} (1 = highest)</dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-wider text-slate-500">
                  Deadline
                </dt>
                <dd className="mt-1">{new Date(task.deadline).toLocaleDateString()}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-wider text-slate-500">
                  Created
                </dt>
                <dd className="mt-1">
                  {task.createdAt
                    ? new Date(task.createdAt).toLocaleString()
                    : '—'}
                </dd>
              </div>
            </dl>
          )}
        </div>

        {task && (
          <div className="flex gap-3 border-t border-slate-200 px-6 py-4">
            <button
              type="button"
              onClick={() => onEdit(task)}
              className="flex-1 rounded-lg bg-violet-600 text-white py-2 text-sm font-medium hover:bg-violet-700"
            >
              Edit task
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-slate-200 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
