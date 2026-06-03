import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { apiRequest, authHeaders, fetchApiHealth, getApiBase } from '../lib/api'
import { API_ENDPOINTS } from '../lib/endpoints'
import { EndpointGuide } from '../components/EndpointGuide'
import { JsonPanel } from '../components/JsonPanel'

const EXPLORER_OPTIONS = [
  { id: 'health', label: 'Health check', method: 'GET', path: '/', auth: false },
  { id: 'me', label: 'Current user', method: 'GET', path: '/auth/me', auth: true },
  { id: 'list', label: 'List tasks', method: 'GET', path: '/tasks', auth: true },
  { id: 'one', label: 'Get task by ID', method: 'GET', path: '/tasks/:id', auth: true, needsId: true },
]

export function DocsPage() {
  const { token } = useAuth()
  const [explorerId, setExplorerId] = useState('health')
  const [taskId, setTaskId] = useState('')
  const [preview, setPreview] = useState(null)
  const [sending, setSending] = useState(false)

  const selected = EXPLORER_OPTIONS.find((o) => o.id === explorerId)

  const sendExplorerRequest = async () => {
    if (!selected) return

    setSending(true)
    setPreview(null)

    let path = selected.path
    if (selected.needsId) {
      if (!taskId.trim()) {
        setPreview({
          method: selected.method,
          path,
          title: 'Error',
          error: { message: 'Enter a task ID' },
        })
        setSending(false)
        return
      }
      path = `/tasks/${taskId.trim()}`
    }

    try {
      const headers = selected.auth ? authHeaders(token) : {}
      const data =
        selected.id === 'health'
          ? await fetchApiHealth()
          : await apiRequest(path, { headers })

      setPreview({
        method: selected.method,
        path,
        title: 'Response',
        response: data,
      })
    } catch (err) {
      setPreview({
        method: selected.method,
        path,
        title: 'Error response',
        error: {
          message: err.message,
          status: err.status,
          code: err.code,
          fields: err.fields,
        },
      })
    } finally {
      setSending(false)
    }
  }

  return (
    <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">API documentation</h2>
        <p className="mt-2 text-slate-600 text-sm max-w-2xl">
          Reference for the Session 4 Task API. Use the <strong>Tasks</strong> tab for normal
          task management; use the explorer below to inspect raw HTTP responses while learning.
        </p>
        <p className="mt-2 text-xs font-mono text-slate-500">
          Base URL: {getApiBase()}
        </p>
      </div>

      <EndpointGuide />

      <section className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900">API explorer</h3>
          <p className="text-sm text-slate-500 mt-1">
            Send a request and view the JSON response. Task create, update, and delete are
            available on the Tasks tab.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 items-end">
          <div className="min-w-[200px]">
            <label className="block text-xs font-medium text-slate-600 mb-1">Endpoint</label>
            <select
              value={explorerId}
              onChange={(e) => setExplorerId(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
            >
              {EXPLORER_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.method} {opt.path}
                </option>
              ))}
            </select>
          </div>

          {selected?.needsId && (
            <div className="min-w-[140px]">
              <label className="block text-xs font-medium text-slate-600 mb-1">Task ID</label>
              <input
                type="text"
                value={taskId}
                onChange={(e) => setTaskId(e.target.value)}
                placeholder="e.g. 1712345678900"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono"
              />
            </div>
          )}

          <button
            type="button"
            onClick={sendExplorerRequest}
            disabled={sending || (selected?.auth && !token)}
            className="rounded-lg bg-slate-800 text-white px-5 py-2 text-sm font-medium hover:bg-slate-900 disabled:opacity-50"
          >
            {sending ? 'Sending…' : 'Send request'}
          </button>
        </div>

        {selected?.auth && !token && (
          <p className="text-sm text-amber-800 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">
            Sign in required for this endpoint. Use the Tasks tab or log in again.
          </p>
        )}

        {preview && (
          <JsonPanel
            title={preview.title}
            method={preview.method}
            path={preview.path}
            response={preview.response}
            error={preview.error}
          />
        )}
      </section>

      <section className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600 space-y-3">
        <h3 className="font-bold text-slate-900">Error response format</h3>
        <pre className="text-xs bg-white border border-slate-200 rounded-lg p-4 overflow-x-auto">
{`{
  "success": false,
  "message": "Human-readable message",
  "code": "DUPLICATE_TITLE",
  "fields": { "title": "Field-specific hint" }
}`}
        </pre>
        <p>
          Authenticated requests must include{' '}
          <code className="text-xs bg-white px-1 py-0.5 rounded border">Authorization: Bearer &lt;token&gt;</code>
        </p>
      </section>

      <section className="text-sm text-slate-600">
        <h3 className="font-bold text-slate-900 mb-2">Where each endpoint is used</h3>
        <ul className="list-disc pl-5 space-y-1">
          {API_ENDPOINTS.map((ep) => (
            <li key={`${ep.method}-${ep.path}`}>
              <span className="font-mono text-xs">
                {ep.method} {ep.path}
              </span>{' '}
              — {ep.ui}
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
