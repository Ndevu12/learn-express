import type { FlowDiagramStep, StatusCodeItem } from '../types';

export const errorHandlingContent = {
  propagation: {
    title: 'Error Propagation Flow',
    description:
      "Errors flow upward from the database through services to controllers, where they're caught and converted to HTTP responses.",
    steps: [
      { title: 'Controller', color: 'blue', description: 'Catches errors' },
      { title: 'Service', color: 'blue', description: 'May throw' },
      { title: 'Repository', color: 'blue', description: 'May fail' },
      { title: 'Error Handler', color: 'red', description: 'Responds' },
    ] satisfies FlowDiagramStep[],
  },
  serviceLayer: {
    title: 'Service Layer Error',
    description: 'Service validates business logic and throws if invalid:',
    code: `// Service layer detects invalid data
const createTaskService = (title, priority, deadline) => {
  if (priority < 1 || priority > 5) {
    throw new Error("Invalid priority");
  }
  // Continue processing...
};`,
  },
  repositoryLayer: {
    title: 'Repository Layer Error',
    description: 'Database operations may fail and throw:',
    code: `// Repository may fail with real database
const createTaskRepository = async (data) => {
  try {
    const result = await database.insert(data);
    return result;
  } catch (dbError) {
    // Error propagates to service
    throw dbError;
  }
};`,
  },
  tryCatch: {
    title: 'Try-Catch Pattern',
    description: 'Controllers wrap service calls in try-catch to handle errors gracefully:',
    code: `export const createTaskController = async (req, res) => {
  try {
    const { title, priority, deadline } = req.body;
    
    // Validate input
    if (!title || !priority || !deadline) {
      return res.status(400).json({ 
        message: "Missing required fields" 
      });
    }
    
    // Call service - may throw
    const result = await createTaskService(
      title, 
      priority, 
      deadline
    );
    
    // Success response
    return res.status(201).json(result);
    
  } catch (error) {
    // Handle any error from service layer
    return res.status(500).json({ 
      message: "An error occurred" 
    });
  }
};`,
  },
  statusCodes: {
    title: 'HTTP Status Codes',
    items: [
      { code: '200 OK', codeClass: 'text-blue-600', description: 'Request succeeded, data returned' },
      { code: '201 Created', codeClass: 'text-green-600', description: 'Resource successfully created' },
      { code: '400 Bad Request', codeClass: 'text-yellow-600', description: 'Client sent invalid data' },
      { code: '409 Conflict', codeClass: 'text-orange-600', description: 'Request conflicts with existing data' },
      { code: '500 Server Error', codeClass: 'text-red-600', description: 'Server encountered an error' },
    ] satisfies StatusCodeItem[],
  },
  keyPoints: {
    title: 'Key Points',
    items: [
      'Always catch errors in controllers',
      'Return appropriate HTTP status codes',
      'Never expose internal error details to clients',
      'Log full errors server-side for debugging',
    ],
  },
  globalHandler: {
    title: 'Global Error Handler (Production Pattern)',
    description:
      'Express applications often include a global error handler middleware to catch any unhandled errors:',
    code: `// Global error handling middleware
// Place this at the END of all other middleware/routes
app.use((err, req, res, next) => {
  // Log the full error server-side
  console.error(err.stack);
  
  // Determine status code
  const status = err.status || 500;
  const message = err.message || "Internal server error";
  
  // Send safe error response to client
  res.status(status).json({
    error: {
      status,
      message
    }
  });
});`,
  },
  bestPractices: {
    title: 'Error Handling Best Practices',
    doTitle: 'Production-Ready',
    doItems: [
      'Wrap async operations in try-catch',
      'Use meaningful HTTP status codes',
      'Log errors for debugging',
      'Return consistent error format',
      'Hide sensitive details from clients',
    ],
    avoidTitle: 'Avoid',
    avoidItems: [
      'Ignoring errors silently',
      'Always returning 500 status',
      'Sending stack traces to clients',
      'Generic error messages',
      'Forgetting about global handlers',
    ],
  },
} as const;
