/**
 * Consistent JSON error body for the UI: always includes `message`.
 * Optional `code` helps the client highlight specific fields.
 */
export function sendError(res, status, message, options = {}) {
  return res.status(status).json({
    success: false,
    message,
    ...options,
  });
}
