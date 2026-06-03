function hasAlertContent(message, fields) {
  const text = typeof message === 'string' ? message.trim() : message
  const hasMessage = Boolean(text)
  const hasFields =
    fields != null &&
    typeof fields === 'object' &&
    Object.keys(fields).length > 0
  return hasMessage || hasFields
}

/**
 * Shows API validation/errors. `fields` mirrors backend `fields` for inline hints.
 */
export function FormAlert({ message, fields, variant = 'error' }) {
  if (!hasAlertContent(message, fields)) {
    return null
  }

  const text = typeof message === 'string' ? message.trim() : message

  const styles =
    variant === 'warning'
      ? 'bg-amber-50 border-amber-200 text-amber-900'
      : 'bg-red-50 border-red-200 text-red-800'

  return (
    <div className={`border px-4 py-3 rounded mb-4 text-sm ${styles}`} role="alert">
      {text && <p className="font-medium">{text}</p>}
      {fields && Object.keys(fields).length > 0 && (
        <ul className={`space-y-1 ${text ? 'mt-2 list-disc pl-5' : ''}`}>
          {Object.entries(fields).map(([field, hint]) => (
            <li key={field}>
              <span className="font-medium capitalize">{field}:</span> {hint}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
