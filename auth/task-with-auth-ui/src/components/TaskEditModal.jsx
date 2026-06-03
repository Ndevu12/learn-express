import { FormAlert } from './FormAlert'

export function TaskEditModal({
  taskId,
  title,
  priority,
  deadline,
  onTitleChange,
  onPriorityChange,
  onDeadlineChange,
  error,
  fieldErrors,
  saving,
  onSubmit,
  onClose,
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="task-edit-title"
    >
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <h2 id="task-edit-title" className="text-lg font-bold text-slate-900">
            Edit task
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

        <form onSubmit={onSubmit} className="px-6 py-5 space-y-4" noValidate>
          <FormAlert message={error} fields={fieldErrors} />

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 ${
                fieldErrors?.title
                  ? 'border-red-400 focus:ring-red-500'
                  : 'border-slate-300 focus:ring-violet-500'
              }`}
            />
            {fieldErrors?.title && (
              <p className="mt-1 text-xs text-red-600">{fieldErrors.title}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Priority</label>
            <select
              value={priority}
              onChange={(e) => onPriorityChange(Number(e.target.value))}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg"
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  Priority {n}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Deadline</label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => onDeadlineChange(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 rounded-lg bg-violet-600 text-white py-2 text-sm font-medium hover:bg-violet-700 disabled:opacity-50"
            >
              {saving ? 'Saving…' : 'Save changes'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-slate-200 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
