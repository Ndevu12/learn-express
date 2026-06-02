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
  ]
};
