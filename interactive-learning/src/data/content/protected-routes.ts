export const protectedRoutesContent = {
  selectScenarioPrompt: 'Select a scenario:',
  labels: {
    request: 'HTTP request',
    response: 'Server response',
    why: 'Explanation',
    endpoint: 'Endpoint',
    statusCode: 'Status code',
  },
  decisionTree: {
    title: 'Access control decision tree',
    authenticationPhase: {
      label: 'Authentication — who are you?',
      description: 'If any step fails, respond with 401 Unauthorized.',
      steps: [
        {
          title: 'Step 1: Is there a token?',
          outcomes: ['No → 401 Unauthorized', 'Yes → Continue'],
        },
        {
          title: 'Step 2: Is the token valid?',
          outcomes: ['Invalid or malformed → 401 Unauthorized', 'Valid → Continue'],
        },
        {
          title: 'Step 3: Has the token expired?',
          outcomes: ['Expired → 401 Unauthorized', 'Not expired → Continue'],
        },
      ],
    },
    authorizationPhase: {
      label: 'Authorization — what may you do?',
      description: 'Runs only after authentication succeeds. Failure → 403 Forbidden.',
      steps: [
        {
          title: 'Step 4: Does the user have permission for this action?',
          outcomes: ['Not permitted → 403 Forbidden', 'Permitted → Process request'],
        },
      ],
    },
  },
  unauthorized: {
    title: '401 Unauthorized (authentication failed)',
    description:
      'The server could not establish who is making the request. No valid identity means no permission check yet.',
    code: `// Missing token
POST /tasks
(no Authorization header)

// Response
401 Unauthorized
{ "message": "No token provided" }

// Or invalid token
POST /tasks
Authorization: Bearer invalid.token

// Response
401 Unauthorized
{ "message": "Invalid token" }`,
  },
  forbidden: {
    title: '403 Forbidden (authorization failed)',
    description:
      'The server knows who the user is (authentication passed), but this user may not perform this action.',
    code: `// Valid token but insufficient permissions
DELETE /admin/users/123
Authorization: Bearer <valid_user_token>

// Response
403 Forbidden
{ "message": "You do not have permission" }

// User trying to delete another user's task
DELETE /tasks/999
Authorization: Bearer <user_token>

// Response
403 Forbidden
{ "message": "You can only delete your own tasks" }`,
  },
  keyPoints: {
    title: 'Key points',
    items: [
      '401 = authentication problem (unknown or invalid identity)',
      '403 = authorization problem (known user, disallowed action)',
      'Never use 403 to hide a missing login — that confuses API clients',
      'Always verify the token on the server; frontend checks are not security',
      'Use HTTPS so tokens are not intercepted in transit',
    ],
  },
} as const;
