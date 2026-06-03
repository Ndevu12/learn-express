const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export function getApiBase() {
  return API_BASE.replace(/\/$/, '');
}

/**
 * Normalized API error from backend JSON: { success: false, message, code?, fields? }
 */
export class ApiError extends Error {
  constructor(message, status, data = {}) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = data.code ?? null;
    this.fields = data.fields ?? null;
    this.data = data;
  }
}

export function parseApiErrorBody(data, status) {
  const payload = data && typeof data === 'object' ? data : {};
  const message =
    payload.message ||
    (Array.isArray(payload.errors)
      ? payload.errors.map((e) => e.message || e).join('. ')
      : null) ||
    `Request failed (${status})`;

  return new ApiError(message, status, payload);
}

export async function apiRequest(path, options = {}) {
  const url = `${getApiBase()}${path.startsWith('/') ? path : `/${path}`}`;
  const response = await fetch(url, options);
  let data = null;

  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (!response.ok) {
    throw parseApiErrorBody(data, response.status);
  }

  return data;
}

export function authHeaders(token) {
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function fetchApiHealth() {
  return apiRequest('/');
}

/** Result shape returned by context actions — message is always set on failure. */
export function operationOk(data = {}) {
  return { ok: true, ...data };
}

export function operationFail(err, fallbackMessage = 'Something went wrong') {
  const message = err instanceof ApiError ? err.message : err?.message || fallbackMessage;
  return {
    ok: false,
    message,
    status: err?.status ?? null,
    code: err?.code ?? null,
    fields: err?.fields ?? null,
  };
}
