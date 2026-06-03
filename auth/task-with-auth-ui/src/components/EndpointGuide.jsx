import { API_ENDPOINTS } from '../lib/endpoints'

const methodColors = {
  GET: 'bg-emerald-100 text-emerald-800',
  POST: 'bg-blue-100 text-blue-800',
  PUT: 'bg-amber-100 text-amber-800',
  DELETE: 'bg-red-100 text-red-800',
}

export function EndpointGuide() {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <h2 className="text-sm font-bold text-slate-900">API reference</h2>
      <p className="mt-1 text-xs text-slate-500">
        Use the Tasks tab for everyday actions. Use the explorer below to inspect raw responses.
      </p>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-slate-200 text-left text-slate-500">
              <th className="py-2 pr-3 font-medium">Method</th>
              <th className="py-2 pr-3 font-medium">Path</th>
              <th className="py-2 pr-3 font-medium">Auth</th>
              <th className="py-2 font-medium">How to test</th>
            </tr>
          </thead>
          <tbody>
            {API_ENDPOINTS.map((ep) => (
              <tr key={`${ep.method}-${ep.path}`} className="border-b border-slate-50">
                <td className="py-2 pr-3">
                  <span
                    className={`inline-block rounded px-1.5 py-0.5 font-mono font-bold ${methodColors[ep.method]}`}
                  >
                    {ep.method}
                  </span>
                </td>
                <td className="py-2 pr-3 font-mono text-slate-800">{ep.path}</td>
                <td className="py-2 pr-3 text-slate-600">{ep.auth ? 'Bearer JWT' : 'None'}</td>
                <td className="py-2 text-slate-600">{ep.ui}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
