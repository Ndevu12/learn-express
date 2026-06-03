export const middlewareContent = {
  sidebar: {
    pipelineOrderTitle: 'Pipeline Order',
    executionOrderTitle: 'Execution Order',
    executionOrderBeforeNext: 'Middleware executes in the order declared with ',
    executionOrderAfterNext: ' calling the next middleware.',
  },
  stepDetails: {
    codeLabel: '📝 Code',
    effectLabel: '💥 Effect on Request',
    exampleLabel: '📌 Real-World Example',
  },
  navigation: {
    previous: '← Previous',
    next: 'Next →',
  },
  fullPipeline: {
    title: 'Full Middleware Pipeline',
    description: 'This is how the Express app sets up its middleware stack:',
    code: `import express from "express";
import cors from "cors";
import morgan from "morgan";
import TaskRouter from "./src/routes/taskRoutes.js";

const app = express();

// Step 1: CORS middleware
app.use(cors());

// Step 2: Morgan logging
app.use(morgan("dev"));

// Step 3: JSON parser
app.use(express.json());

// Step 4: Route handlers
app.use("/tasks", TaskRouter);

// Each request flows through these layers
// Request → CORS → Morgan → JSON Parser → Routes → Controllers

const port = 4000;
app.listen(port, () => {
  console.log(\`Server listening on port \${port}\`);
});`,
  },
  nextFunction: {
    title: 'How next() Works',
    code: `// Middleware is a function that receives (req, res, next)
app.use((req, res, next) => {
  console.log(\`Request: \${req.method} \${req.url}\`);
  
  // Calling next() moves to the NEXT middleware
  next();
});

// This middleware will NOT execute without next()
app.use((req, res, next) => {
  console.log("This runs after next() is called");
  next(); // Continue to routes
});

// If next() is NOT called, the chain stops
// Response must be sent with res.send() or res.json()`,
  },
  bestPractices: {
    title: 'Middleware Best Practices',
    items: [
      { title: 'Order Matters', body: 'Declare middleware before routes' },
      { title: 'Always Call next()', body: 'Unless sending response' },
      { title: 'Keep Middleware Lean', body: 'Heavy logic in services' },
      { title: 'Error Handlers Last', body: 'Declare after all other middleware' },
    ],
  },
  takeaway: {
    title: 'Key Takeaway',
    beforeNext:
      'Middleware runs in a strict order: each middleware receives the request, processes it, and calls ',
    afterNext:
      ' to pass control to the next middleware. This chain continues until a route handler sends a response. Understanding this flow is crucial for debugging, adding logging, implementing authentication, and handling errors in production applications.',
  },
} as const;
