export function JsonPanel({ title, method, path, response, error }) {
  if (!response && !error) return null

  return (
    <div className="rounded-lg border border-slate-200 bg-slate-900 text-slate-100 overflow-hidden">
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-700 px-4 py-2 text-xs">
        {title && <span className="font-semibold text-slate-300">{title}</span>}
        {method && (
          <span className="rounded bg-violet-600 px-2 py-0.5 font-mono font-bold">{method}</span>
        )}
        {path && <span className="font-mono text-emerald-400">{path}</span>}
      </div>
      <pre className="max-h-64 overflow-auto p-4 text-xs leading-relaxed">
        {error
          ? JSON.stringify({ success: false, ...error }, null, 2)
          : JSON.stringify(response, null, 2)}
      </pre>
    </div>
  )
}
