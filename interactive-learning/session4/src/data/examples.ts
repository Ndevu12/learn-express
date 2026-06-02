/**
 * Real-world code examples from the Task Management API
 * These examples demonstrate production-ready Express patterns
 */

export const architectureLayers = [
  {
    id: 'client',
    name: 'Client',
    description: 'Browser or API consumer sends HTTP requests',
    icon: '🌐',
    examples: [
      'React application',
      'Mobile app',
      'Third-party API consumer',
      'curl/Postman requests'
    ],
    color: 'blue'
  },
  {
    id: 'routes',
    name: 'Routes',
    description: 'Define API endpoints and HTTP methods. Direct requests to controllers.',
    icon: '🛣️',
    examples: [
      'POST /tasks',
      'GET /tasks/:id',
      'PUT /tasks/:id',
      'DELETE /tasks/:id'
    ],
    color: 'blue',
    codeExample: `import taskRoutes from "./src/routes/taskRoutes.js";
app.use("/tasks", taskRoutes);

export const TaskRouter = Router();
TaskRouter.post("/", createTaskController);
TaskRouter.get("/:id", getTaskController);`
  },
  {
    id: 'middleware',
    name: 'Middleware',
    description: 'Process requests globally or at specific routes. Handle logging, validation, error handling.',
    icon: '⚙️',
    examples: [
      'CORS middleware',
      'JSON parser',
      'Request logging (Morgan)',
      'Validation middleware',
      'Error handlers'
    ],
    color: 'blue',
    codeExample: `app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Custom middleware
app.use((req, res, next) => {
  console.log(\`\${req.method} \${req.url}\`);
  next();
});`
  },
  {
    id: 'controllers',
    name: 'Controllers',
    description: 'Handle HTTP requests. Validate input. Call services. Return responses.',
    icon: '🎮',
    examples: [
      'Request/response handling',
      'Input validation',
      'HTTP status codes',
      'Error catching'
    ],
    color: 'slate',
    codeExample: `export const createTaskController = async (req, res) => {
  try {
    const { title, priority, deadline } = req.body;
    
    if (!title || !priority || !deadline) {
      return res.status(400).json({ 
        message: "Title, priority and deadline are required." 
      });
    }
    
    const result = await createTaskService(title, priority, deadline);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ 
      message: "An error occurred while creating the task." 
    });
  }
};`
  },
  {
    id: 'services',
    name: 'Services',
    description: 'Core business logic. Data transformation. Orchestration between controllers and repositories.',
    icon: '⚡',
    examples: [
      'Task creation logic',
      'Data validation',
      'Business rules',
      'Data transformation'
    ],
    color: 'slate',
    codeExample: `const createTaskService = (title, priority, deadline) => {
  // Business logic: transform deadline to Date
  deadline = new Date(deadline);
  
  // Call repository to persist
  return createTaskRepository(title, priority, deadline);
};`
  },
  {
    id: 'repositories',
    name: 'Repositories',
    description: 'Data access layer. Single source of truth for database operations. Handles CRUD.',
    icon: '🗄️',
    examples: [
      'Create operations',
      'Read operations',
      'Update operations',
      'Delete operations'
    ],
    color: 'slate',
    codeExample: `export let tasks = [];

export const createTaskRepository = (title, priority, deadline) => {
  return tasks.push([title, priority, deadline]);
};

export const getTaskRepository = (id) => {
  return tasks.at(id);
};`
  },
  {
    id: 'database',
    name: 'Database',
    description: 'Persistent data storage. In production: PostgreSQL, MongoDB, etc.',
    icon: '💾',
    examples: [
      'In-memory array (learning)',
      'PostgreSQL (production)',
      'MongoDB (NoSQL)',
      'MySQL'
    ],
    color: 'slate'
  }
];

export const requestLifecycleStages = [
  {
    stage: 1,
    title: 'Request Arrives',
    description: 'HTTP request sent from client to server',
    data: {
      in: 'HTTP Request',
      example: 'POST /tasks\nContent-Type: application/json\n\n{"title": "Learn Express", "priority": 3, "deadline": "2026-12-31"}'
    }
  },
  {
    stage: 2,
    title: 'Route Matching',
    description: 'Express matches URL and HTTP method to a route',
    data: {
      in: 'Request URL + Method',
      example: 'POST /tasks → createTaskController',
      logic: 'Express Router finds matching route handler'
    }
  },
  {
    stage: 3,
    title: 'Middleware Pipeline',
    description: 'Request passes through middleware stack (CORS, JSON parser, logging, etc.)',
    data: {
      in: 'Raw Request',
      out: 'Parsed Request with req.body, headers processed',
      example: 'Morgan logs: POST /tasks 201 5ms'
    }
  },
  {
    stage: 4,
    title: 'Controller Processing',
    description: 'Controller receives parsed request, validates input, calls services',
    data: {
      in: 'req.body with title, priority, deadline',
      out: 'Validation passed or 400 Bad Request',
      logic: 'Validates: required fields, priority range (1-5), duplicate check'
    }
  },
  {
    stage: 5,
    title: 'Service Execution',
    description: 'Business logic layer transforms and processes data',
    data: {
      in: 'title, priority, deadline (string)',
      out: 'title, priority, deadline (formatted)',
      logic: 'Convert deadline to Date object, apply business rules'
    }
  },
  {
    stage: 6,
    title: 'Repository Operation',
    description: 'Data access layer persists data',
    data: {
      in: 'Formatted data ready to store',
      out: 'Data stored in database, returns ID',
      logic: 'tasks.push([title, priority, deadline])'
    }
  },
  {
    stage: 7,
    title: 'Response Preparation',
    description: 'Success status and data sent back to client',
    data: {
      in: 'Database result',
      out: 'HTTP Response 201 Created',
      example: '{"title": "Learn Express", "priority": 3, ...}'
    }
  }
];

export const crudOperations = [
  {
    operation: 'CREATE',
    httpMethod: 'POST',
    endpoint: 'POST /tasks',
    description: 'Add a new task to the database',
    flow: [
      { layer: 'Route', action: 'POST /tasks matched' },
      { layer: 'Middleware', action: 'JSON parsed, logged' },
      { layer: 'Controller', action: 'Validate input, check duplicates' },
      { layer: 'Service', action: 'Transform deadline to Date' },
      { layer: 'Repository', action: 'Push to tasks array' },
      { layer: 'Response', action: '201 Created with task data' }
    ],
    validation: [
      'title (required, string)',
      'priority (required, 1-5)',
      'deadline (required, ISO date)',
      'Duplicate title check'
    ],
    request: `POST /tasks
{
  "title": "Learn Express Middleware",
  "priority": 3,
  "deadline": "2026-12-31"
}`,
    response: `201 Created
[
  "Learn Express Middleware",
  3,
  "2026-12-31T00:00:00.000Z"
]`,
    error: `400 Bad Request
{
  "message": "Title, priority and deadline are required."
}`
  },
  {
    operation: 'READ',
    httpMethod: 'GET',
    endpoint: 'GET /tasks/:id',
    description: 'Retrieve a specific task by ID',
    flow: [
      { layer: 'Route', action: 'GET /tasks/:id matched, id=0' },
      { layer: 'Middleware', action: 'Request logged' },
      { layer: 'Controller', action: 'Extract id from params' },
      { layer: 'Service', action: 'Fetch task by ID' },
      { layer: 'Repository', action: 'tasks.at(id)' },
      { layer: 'Response', action: '200 OK with task data' }
    ],
    validation: [
      'id must be valid array index'
    ],
    request: `GET /tasks/0`,
    response: `200 OK
[
  "Learn Express Middleware",
  3,
  "2026-12-31T00:00:00.000Z"
]`,
    error: `404 Not Found (if id doesn't exist)`
  },
  {
    operation: 'UPDATE',
    httpMethod: 'PUT',
    endpoint: 'PUT /tasks/:id',
    description: 'Modify an existing task',
    flow: [
      { layer: 'Route', action: 'PUT /tasks/:id matched' },
      { layer: 'Middleware', action: 'JSON parsed, logged' },
      { layer: 'Controller', action: 'Validate input, check priority' },
      { layer: 'Service', action: 'Transform deadline to Date' },
      { layer: 'Repository', action: 'Update tasks[id]' },
      { layer: 'Response', action: '200 OK with updated data' }
    ],
    validation: [
      'title (required)',
      'priority (required, 1-5)',
      'deadline (required)',
      'id must exist'
    ],
    request: `PUT /tasks/0
{
  "title": "Advanced Express Middleware",
  "priority": 4,
  "deadline": "2026-12-31"
}`,
    response: `200 OK
[
  "Advanced Express Middleware",
  4,
  "2026-12-31T00:00:00.000Z"
]`,
    error: `400 Bad Request
{
  "message": "Priority must be between 1 and 5."
}`
  },
  {
    operation: 'DELETE',
    httpMethod: 'DELETE',
    endpoint: 'DELETE /tasks/:id',
    description: 'Remove a task from the database',
    flow: [
      { layer: 'Route', action: 'DELETE /tasks/:id matched' },
      { layer: 'Middleware', action: 'Request logged' },
      { layer: 'Controller', action: 'Extract id from params' },
      { layer: 'Service', action: 'Delete task by ID' },
      { layer: 'Repository', action: 'tasks.splice(id, 1)' },
      { layer: 'Response', action: '200 OK (typically no content)' }
    ],
    validation: [
      'id must be valid array index',
      'id must exist'
    ],
    request: `DELETE /tasks/0`,
    response: `200 OK
(typically returns null or confirmation)`,
    error: `404 Not Found
{
  "message": "Task not found."
}`
  }
];

export const validationPatterns = [
  {
    title: 'Required Fields',
    description: 'Ensure critical data is provided',
    badRequest: {
      scenario: 'Missing title field',
      request: `POST /tasks
{
  "priority": 3,
  "deadline": "2026-12-31"
}`,
      response: `400 Bad Request
{
  "message": "Title, priority and deadline are required."
}`,
      why: 'Task cannot be created without a title'
    },
    code: `if (!title || !priority || !deadline) {
  return res.status(400).json({ 
    message: "Title, priority and deadline are required." 
  });
}`
  },
  {
    title: 'Range Validation',
    description: 'Ensure data falls within acceptable values',
    badRequest: {
      scenario: 'Priority outside 1-5 range',
      request: `POST /tasks
{
  "title": "Learn Express",
  "priority": 10,
  "deadline": "2026-12-31"
}`,
      response: `400 Bad Request
{
  "message": "Priority must be between 1 and 5."
}`,
      why: 'Priority system only supports levels 1-5'
    },
    code: `if (priority < 1 || priority > 5) {
  return res.status(400).json({ 
    message: "Priority must be between 1 and 5." 
  });
}`
  },
  {
    title: 'Uniqueness Constraint',
    description: 'Prevent duplicate data in the system',
    badRequest: {
      scenario: 'Task with same title already exists',
      request: `POST /tasks
{
  "title": "Learn Express",
  "priority": 3,
  "deadline": "2026-12-31"
}`,
      response: `409 Conflict
{
  "message": "A task with the same title already exists."
}`,
      why: 'Prevents duplicate tasks with identical titles'
    },
    code: `const existingTask = await getTaskByTitleService(title);
if (existingTask) {
  return res.status(409).json({ 
    message: "A task with the same title already exists." 
  });
}`
  }
];

export const errorHandlingFlow = [
  {
    stage: 'Controller',
    description: 'Catches errors from service layer',
    example: `try {
  const result = await createTaskService(title, priority, deadline);
  return res.status(201).json(result);
} catch (error) {
  return res.status(500).json({ 
    message: "An error occurred while creating the task." 
  });
}`
  },
  {
    stage: 'Service',
    description: 'May throw errors for invalid business logic',
    example: `// If service detects invalid data:
if (invalidData) {
  throw new Error("Invalid data format");
}
// Error propagates to controller's catch block`
  },
  {
    stage: 'Repository',
    description: 'May fail if database operation fails',
    example: `// In production with real database:
try {
  const result = await database.insert(task);
  return result;
} catch (dbError) {
  // Error propagates up to service, then controller
  throw dbError;
}`
  },
  {
    stage: 'Global Handler',
    description: 'Catches unhandled errors at app level',
    example: `// Global error middleware (if implemented)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: "Internal server error" 
  });
});`
  }
];

export const middlewarePipelineSteps = [
  {
    order: 1,
    middleware: 'CORS',
    purpose: 'Handle Cross-Origin Resource Sharing',
    code: `app.use(cors());`,
    effect: 'Allows frontend applications on different domains to access API',
    example: 'Browser at localhost:3000 can call API at localhost:4000'
  },
  {
    order: 2,
    middleware: 'Morgan Logger',
    purpose: 'Log all incoming HTTP requests',
    code: `app.use(morgan("dev"));`,
    effect: 'Console output: "POST /tasks 201 5ms"',
    example: 'Helps debug request flow and performance'
  },
  {
    order: 3,
    middleware: 'JSON Parser',
    purpose: 'Parse JSON request bodies',
    code: `app.use(express.json());`,
    effect: 'Converts raw JSON to req.body object',
    example: 'req.body becomes accessible in controllers'
  },
  {
    order: 4,
    middleware: 'Route Handlers',
    purpose: 'Direct request to appropriate controller',
    code: `app.use("/tasks", taskRoutes);`,
    effect: 'Route matching: POST /tasks → createTaskController',
    example: 'Business logic execution begins'
  },
  {
    order: 5,
    middleware: 'Response Sent',
    purpose: 'Return result to client',
    code: `res.status(200).json(result);`,
    effect: 'Request/response cycle completes',
    example: 'Client receives data and continues'
  }
];

// Authentication & Authorization Data

export const authenticationFlow = [
  {
    step: 1,
    title: 'User Registration',
    description: 'User provides email and password',
    icon: '📝',
    data: {
      in: 'Email and plain-text password from form',
      action: 'Validate email format, check password strength'
    },
    code: `// Controller validates input
const { email, password } = req.body;

if (!email || !password) {
  return res.status(400).json({ 
    message: "Email and password are required" 
  });
}`,
    visual: 'User enters credentials into registration form'
  },
  {
    step: 2,
    title: 'Password Hashing',
    description: 'Plain-text password converted to irreversible hash',
    icon: '🔐',
    data: {
      in: 'Plain-text password: "MySecurePass123"',
      out: 'Hash: "$2a$10$vI8aWBYW2KcV..."',
      security: 'Hashing is one-way; original password cannot be recovered'
    },
    code: `// Service hashes password with bcrypt
import bcrypt from 'bcryptjs';

const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);`,
    visual: 'Password hashed through bcrypt algorithm (one-way)'
  },
  {
    step: 3,
    title: 'Store User in Database',
    description: 'Hashed password and email stored in database',
    icon: '💾',
    data: {
      in: 'Email and hashed password',
      stored: 'users table with id, email, hashedPassword, createdAt'
    },
    code: `// Repository stores user
const user = {
  id: 1,
  email: 'user@example.com',
  hashedPassword: '$2a$10$vI8aWBYW2KcV...',
  createdAt: '2026-06-02T10:00:00Z'
};
database.users.push(user);`,
    visual: 'User record created in persistent storage'
  },
  {
    step: 4,
    title: 'User Login',
    description: 'User provides email and password to authenticate',
    icon: '🔑',
    data: {
      in: 'Email and plain-text password',
      action: 'Find user by email, verify password'
    },
    code: `// Controller finds user by email
const user = await getUserByEmailService(email);

if (!user) {
  return res.status(401).json({ 
    message: "Invalid email or password" 
  });
}`,
    visual: 'System looks up user in database by email'
  },
  {
    step: 5,
    title: 'Password Verification',
    description: 'Entered password compared to stored hash',
    icon: '✓',
    data: {
      in: 'Entered password: "MySecurePass123"',
      compare: 'Hashed password from database',
      result: 'Match? → Yes/No'
    },
    code: `// Service compares passwords
import bcrypt from 'bcryptjs';

const isValid = await bcrypt.compare(
  password,          // entered password
  user.hashedPassword // hash from database
);

if (!isValid) {
  throw new Error("Invalid credentials");
}`,
    visual: 'bcrypt algorithm verifies password without revealing hash'
  },
  {
    step: 6,
    title: 'JWT Token Generation',
    description: 'Create signed token containing user info',
    icon: '🎫',
    data: {
      in: 'User ID and role from database',
      out: 'Signed JWT token with expiry',
      payload: { userId: 1, role: 'user', exp: 1234567890 }
    },
    code: `// Service generates JWT
import jwt from 'jsonwebtoken';

const token = jwt.sign(
  { userId: user.id, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: '7d' }
);`,
    visual: 'JWT created with embedded user info and signature'
  },
  {
    step: 7,
    title: 'Token Sent to Client',
    description: 'JWT returned in login response',
    icon: '📤',
    data: {
      in: 'Token from service',
      response: '200 OK with token in body or header'
    },
    code: `// Controller returns token
return res.status(200).json({
  message: "Login successful",
  token: token,
  userId: user.id,
  role: user.role
});`,
    visual: 'Token transmitted to client browser/app'
  },
  {
    step: 8,
    title: 'Client Stores Token',
    description: 'Token stored on client for future requests',
    icon: '💾',
    data: {
      storage: 'localStorage, sessionStorage, or cookie',
      retrieval: 'Token sent with each API request'
    },
    code: `// Frontend stores token
localStorage.setItem('token', response.token);

// Later, send token in Authorization header
const headers = {
  'Authorization': \`Bearer \${token}\`
};`,
    visual: 'Token persisted on client side for reuse'
  }
];

export const jwtStructure = {
  overview: 'JWT = Header.Payload.Signature (3 base64-encoded parts separated by dots)',
  fullExample: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjIzMzUwNDAwLCJleHAiOjE2MjM5NTU0MDB9.xGQzMyUDXqCcJr9Wq4J8_sDpZR0mQ8vX9K_1pE5vW0I',
  parts: [
    {
      part: 'Header',
      purpose: 'Specifies token type and hashing algorithm',
      decoded: {
        alg: 'HS256',
        typ: 'JWT'
      },
      code: `{
  "alg": "HS256",
  "typ": "JWT"
}`,
      explanation: 'Tells server this is a JWT using HMAC SHA-256 algorithm'
    },
    {
      part: 'Payload',
      purpose: 'Contains claims (data) about the user',
      decoded: {
        userId: 1,
        role: 'user',
        iat: 1623350400,
        exp: 1623955200
      },
      code: `{
  "userId": 1,
  "role": "user",
  "iat": 1623350400,
  "exp": 1623955200
}`,
      explanation: 'iat = issued at, exp = expiration time (Unix timestamp)'
    },
    {
      part: 'Signature',
      purpose: 'Proves token integrity; created with secret key',
      decoded: 'xGQzMyUDXqCcJr9Wq4J8_sDpZR0mQ8vX9K_1pE5vW0I',
      code: `// Server creates signature
HMACSHA256(
  base64UrlEncode(header) + "." + base64UrlEncode(payload),
  secret_key
)`,
      explanation: 'Server verifies signature on each request. If tampered, signature won\'t match.'
    }
  ]
};

export const jwtLifecycle = [
  {
    stage: 1,
    title: 'Token Generated',
    description: 'Login successful → JWT created and sent to client',
    icon: '✨',
    statusCode: '200 OK',
    clientAction: 'Store token (localStorage or state)',
    serverState: 'Token signed with secret key',
    codeExample: `jwt.sign(
  { userId: 1, role: 'user' },
  'secret-key-12345',
  { expiresIn: '7d' }
)`
  },
  {
    stage: 2,
    title: 'Token Stored on Client',
    description: 'Token persisted for subsequent requests',
    icon: '💾',
    storageMethod: 'localStorage.setItem("token", token)',
    retrieval: 'Retrieved from storage when making API calls',
    codeExample: `// Store after login
const token = response.token;
localStorage.setItem('authToken', token);`
  },
  {
    stage: 3,
    title: 'Token Sent in Request',
    description: 'Client includes token in Authorization header',
    icon: '📤',
    requestHeader: 'Authorization: Bearer <token>',
    httpMethod: 'Any protected route (GET, POST, PUT, DELETE)',
    codeExample: `// Frontend sends token
fetch('/tasks', {
  headers: {
    'Authorization': \`Bearer \${token}\`
  }
})`
  },
  {
    stage: 4,
    title: 'Server Receives Request',
    description: 'Server extracts token from Authorization header',
    icon: '📥',
    middleware: 'Authentication middleware intercepts request',
    extraction: 'Token extracted from "Authorization: Bearer <token>"',
    codeExample: `// Middleware extracts token
const token = req.headers.authorization?.split(' ')[1];

if (!token) {
  return res.status(401).json({ 
    message: "No token provided" 
  });
}`
  },
  {
    stage: 5,
    title: 'Token Verified',
    description: 'Server checks signature and expiration',
    icon: '✓',
    checks: [
      'Signature is valid (matches secret key)',
      'Token has not expired',
      'Token structure is correct'
    ],
    codeExample: `// Service verifies token
try {
  const decoded = jwt.verify(token, 'secret-key-12345');
  console.log(decoded); // { userId: 1, role: 'user' }
} catch (error) {
  // Invalid signature, expired, or malformed
  throw error;
}`
  },
  {
    stage: 6,
    title: 'User Information Extracted',
    description: 'Payload decoded and user ID/role retrieved',
    icon: '🎯',
    data: 'userId and role available in req.user',
    usage: 'Used for authorization checks and user identification',
    codeExample: `// After verification, attach to request
req.user = decoded; // { userId: 1, role: 'user' }

// Now controllers can access user info
const userId = req.user.userId;
const userRole = req.user.role;`
  },
  {
    stage: 7,
    title: 'Authorization Check',
    description: 'Verify user has permission for this operation',
    icon: '🔐',
    check: 'Is user role allowed on this endpoint?',
    example: 'Admin can delete tasks, user cannot',
    codeExample: `// Authorization middleware
if (!allowedRoles.includes(req.user.role)) {
  return res.status(403).json({ 
    message: "You do not have permission" 
  });
}
next();`
  },
  {
    stage: 8,
    title: 'Request Processed',
    description: 'Authenticated and authorized request continues',
    icon: '⚡',
    action: 'Controller logic executes for authenticated user',
    response: 'Data returned based on user permissions',
    codeExample: `// Request now authenticated & authorized
const tasks = await getUserTasksService(userId);
return res.status(200).json(tasks);`
  },
  {
    stage: 9,
    title: 'Token Expiration Handling',
    description: 'After 7 days, token expires and is no longer valid',
    icon: '⏰',
    when: 'After expiry time passes',
    behavior: 'Verification fails, user must login again',
    codeExample: `// Expired token attempt
try {
  jwt.verify(expiredToken, secret);
} catch (error) {
  if (error.name === 'TokenExpiredError') {
    return res.status(401).json({ 
      message: "Token expired. Please login again" 
    });
  }
}`
  }
];

export const protectedRoutes = [
  {
    scenario: 'Without Token',
    endpoint: 'GET /tasks',
    headers: 'No Authorization header',
    request: `GET /tasks HTTP/1.1
Host: api.example.com`,
    response: {
      status: '401 Unauthorized',
      body: { message: 'No token provided' }
    },
    outcome: 'Access Denied ❌',
    why: 'Authentication middleware rejects requests without tokens'
  },
  {
    scenario: 'With Valid Token',
    endpoint: 'GET /tasks',
    headers: 'Authorization: Bearer <valid_token>',
    request: `GET /tasks HTTP/1.1
Host: api.example.com
Authorization: Bearer eyJhbGc...`,
    response: {
      status: '200 OK',
      body: [{ id: 1, title: 'Task 1', userId: 1 }]
    },
    outcome: 'Access Granted ✓',
    why: 'Token verified, user authenticated, authorization passed'
  },
  {
    scenario: 'Invalid Token',
    endpoint: 'GET /tasks',
    headers: 'Authorization: Bearer <invalid_token>',
    request: `GET /tasks HTTP/1.1
Host: api.example.com
Authorization: Bearer invalid.token.here`,
    response: {
      status: '401 Unauthorized',
      body: { message: 'Invalid token' }
    },
    outcome: 'Access Denied ❌',
    why: 'Token signature does not match secret key'
  },
  {
    scenario: 'Expired Token',
    endpoint: 'GET /tasks',
    headers: 'Authorization: Bearer <expired_token>',
    request: `GET /tasks HTTP/1.1
Host: api.example.com
Authorization: Bearer eyJhbGc...`,
    response: {
      status: '401 Unauthorized',
      body: { message: 'Token expired' }
    },
    outcome: 'Access Denied ❌',
    why: 'Token expiration timestamp has passed'
  },
  {
    scenario: 'Malformed Token',
    endpoint: 'GET /tasks',
    headers: 'Authorization: Bearer abc123',
    request: `GET /tasks HTTP/1.1
Host: api.example.com
Authorization: Bearer abc123`,
    response: {
      status: '401 Unauthorized',
      body: { message: 'Malformed token' }
    },
    outcome: 'Access Denied ❌',
    why: 'Token does not have 3 parts separated by dots'
  }
];

export const rbacConcepts = {
  definition: 'Role-Based Access Control: Different user roles have different permissions',
  roles: [
    {
      role: 'Guest',
      icon: '👤',
      permissions: [
        'View public content',
        'Register account',
        'Login'
      ],
      endpoints: [
        'POST /auth/register',
        'POST /auth/login'
      ],
      description: 'No authentication required'
    },
    {
      role: 'User',
      icon: '👨',
      permissions: [
        'View own tasks',
        'Create tasks',
        'Edit own tasks',
        'Delete own tasks'
      ],
      endpoints: [
        'GET /tasks',
        'GET /tasks/:id',
        'POST /tasks',
        'PUT /tasks/:id',
        'DELETE /tasks/:id'
      ],
      description: 'Standard authenticated user'
    },
    {
      role: 'Admin',
      icon: '👑',
      permissions: [
        'View all tasks',
        'Create tasks',
        'Edit any task',
        'Delete any task',
        'View all users',
        'Delete users',
        'Assign roles'
      ],
      endpoints: [
        'GET /tasks',
        'GET /tasks/:id',
        'POST /tasks',
        'PUT /tasks/:id',
        'DELETE /tasks/:id',
        'GET /admin/users',
        'DELETE /admin/users/:id',
        'PUT /admin/users/:id/role'
      ],
      description: 'Full system access'
    }
  ]
};

export const rbacImplementation = [
  {
    title: 'Check Role in Middleware',
    description: 'Authorization middleware verifies user role',
    code: `// Middleware that checks role
export const authorizeRole = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ 
        message: "Not authenticated" 
      });
    }
    
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: "You do not have permission" 
      });
    }
    
    next();
  };
};`,
    usage: `// Apply to protected route
router.delete(
  '/tasks/:id',
  authenticateToken,
  authorizeRole(['admin', 'user']),
  deleteTaskController
);`
  },
  {
    title: 'Resource-Based Authorization',
    description: 'Check if user owns the resource before allowing modification',
    code: `// Controller checks resource ownership
export const deleteTaskController = async (req, res) => {
  try {
    const task = await getTaskService(req.params.id);
    
    // Admin can delete any task, user only own tasks
    if (task.userId !== req.user.userId && 
        req.user.role !== 'admin') {
      return res.status(403).json({ 
        message: "You can only delete your own tasks" 
      });
    }
    
    await deleteTaskService(req.params.id);
    res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};`,
    usage: 'User can delete only their tasks, admin can delete any'
  },
  {
    title: 'Frontend vs Backend Authorization',
    description: 'Never rely only on frontend; always verify on backend',
    code: `// FRONTEND: Show/hide buttons based on role
{isAdmin && (
  <button onClick={deleteUser}>Delete User</button>
)}

// BACKEND: Always verify role
router.delete('/admin/users/:id', 
  authenticateToken,
  authorizeRole(['admin']),  // ← REQUIRED
  deleteUserController
);`,
    critical: 'Frontend restrictions improve UX. Backend restrictions enforce security.'
  }
];

export const frontendVsBackendSecurity = [
  {
    layer: 'Frontend Authorization',
    purpose: 'Improve User Experience',
    methods: [
      'Hide delete button for non-admins',
      'Disable form fields for read-only users',
      'Show appropriate navigation for role',
      'Display permission denied messages'
    ],
    code: `// Show/hide UI based on role
<button disabled={!isAdmin}>Delete</button>`,
    security: '⚠️ Can be bypassed (browser console, network requests)',
    lesson: 'Never trust frontend for security decisions'
  },
  {
    layer: 'Backend Authorization',
    purpose: 'Enforce Security & Business Rules',
    methods: [
      'Verify token signature',
      'Check user role on every request',
      'Validate resource ownership',
      'Audit log sensitive operations',
      'Enforce rate limiting'
    ],
    code: `// Server MUST verify every request
router.delete('/users/:id', authorizeRole(['admin']), controller);`,
    security: '✓ Cannot be bypassed; enforced by server',
    lesson: 'Frontend restrictions are nice to have; backend is essential'
  }
];

export const endToEndFlow = [
  {
    layer: 'Client (Browser/App)',
    color: 'blue',
    steps: [
      { action: 'User enters email/password', icon: '📝' },
      { action: 'Submit login form', icon: '📤' }
    ]
  },
  {
    layer: 'Network',
    color: 'slate',
    steps: [
      { action: 'POST /auth/login over HTTPS', icon: '🔒' }
    ]
  },
  {
    layer: 'Express Server',
    color: 'blue',
    steps: [
      { action: 'CORS middleware allows request', icon: '✓' },
      { action: 'JSON parser reads body', icon: '📥' },
      { action: 'Morgan logs request', icon: '📊' }
    ]
  },
  {
    layer: 'Route & Controller',
    color: 'slate',
    steps: [
      { action: 'Route matched: POST /auth/login', icon: '🛣️' },
      { action: 'authController called', icon: '🎮' },
      { action: 'Input validated', icon: '✔️' }
    ]
  },
  {
    layer: 'Authentication Service',
    color: 'blue',
    steps: [
      { action: 'Find user by email in database', icon: '🔍' },
      { action: 'Verify password with bcrypt.compare()', icon: '🔐' },
      { action: 'Generate JWT token with user.role', icon: '🎫' }
    ]
  },
  {
    layer: 'Database',
    color: 'slate',
    steps: [
      { action: 'Query users table', icon: '💾' },
      { action: 'Return user record', icon: '📤' }
    ]
  },
  {
    layer: 'Response',
    color: 'blue',
    steps: [
      { action: '200 OK with token', icon: '✨' },
      { action: 'Client stores token in localStorage', icon: '💾' }
    ]
  },
  {
    layer: 'Protected Request (e.g., GET /tasks)',
    color: 'slate',
    steps: [
      { action: 'Client sends Authorization: Bearer <token>', icon: '📤' },
      { action: 'Authentication middleware extracts token', icon: '🔍' },
      { action: 'JWT verified (signature, expiry)', icon: '✓' },
      { action: 'User info attached to req.user', icon: '👤' },
      { action: 'Authorization middleware checks role', icon: '🔐' },
      { action: 'Controller executes with user context', icon: '⚡' },
      { action: 'Service retrieves user data from DB', icon: '💾' },
      { action: 'Response with tasks', icon: '📥' }
    ]
  }
];

export const keyTakeaways = {
  architecture: [
    'Each layer has a single responsibility',
    'Separation of concerns makes code maintainable',
    'Data flows from routes → middleware → controller → service → repository',
    'Changes to one layer don\'t break others'
  ],
  lifecycle: [
    'Middleware runs before controllers',
    'Request data is transformed at each layer',
    'Errors propagate upward for handling',
    'Response sent once, no further processing'
  ],
  crud: [
    'CREATE adds new data (POST)',
    'READ retrieves existing data (GET)',
    'UPDATE modifies existing data (PUT/PATCH)',
    'DELETE removes data (DELETE)',
    'Each operation follows the same layer pattern'
  ],
  validation: [
    'Validation happens early, at controller level',
    'Prevents invalid data from reaching business logic',
    'Provides clear error messages to clients',
    'Can be centralized with validation middleware'
  ],
  errors: [
    'Try-catch blocks catch service errors',
    'HTTP status codes indicate error type',
    'Global handlers catch unexpected errors',
    'Clients can handle errors appropriately'
  ],
  middleware: [
    'Middleware runs in order declared',
    'Each middleware calls next() to continue chain',
    'Can modify request/response objects',
    'Error handlers are middleware too'
  ],
  authentication: [
    'Hashing is one-way; passwords cannot be recovered',
    'Every request must verify the token signature',
    'Tokens contain claims (userId, role) but are not encrypted',
    'Expiration is set at token creation time'
  ],
  jwt: [
    'JWT = Header.Payload.Signature (3 base64 parts)',
    'Signature proves token integrity; if modified, verification fails',
    'Role claims in payload enable RBAC',
    'Tokens expire; after expiry, users must login again'
  ],
  rbac: [
    'Different roles have different permissions',
    'Frontend restrictions improve UX; backend enforces security',
    'Always check authorization on the server for every request',
    'Resource-based checks prevent users from modifying others\' data'
  ],
  security: [
    'Never trust frontend security; always verify on backend',
    'Tokens can be decoded (but not forged) without the secret key',
    'Store tokens securely (HttpOnly cookies or secure storage)',
    'Use HTTPS to prevent token interception'
  ]
};
