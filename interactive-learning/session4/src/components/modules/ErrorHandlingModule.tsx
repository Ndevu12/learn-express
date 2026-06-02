import React from 'react';
import { Section, Card } from '../shared/Card';
import { CodeBlock } from '../shared/CodeBlock';
import { FlowDiagram } from '../shared/FlowDiagram';

export const ErrorHandlingModule: React.FC = () => {
  return (
    <Section
      title="Error Handling Learning Module"
      description="Learn how production applications handle, propagate, and respond to errors"
      icon="⚠️"
    >
      {/* Error Flow */}
      <div className="mb-8">
        <Card className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Error Propagation Flow</h2>
          <p className="text-slate-700 mb-6">
            Errors flow upward from the database through services to controllers, where they're caught and converted to
            HTTP responses.
          </p>

          <FlowDiagram
            steps={[
              { title: 'Controller', icon: '🎮', color: 'blue', description: 'Catches errors' },
              { title: 'Service', icon: '⚡', color: 'blue', description: 'May throw' },
              { title: 'Repository', icon: '🗄️', color: 'blue', description: 'May fail' },
              { title: 'Error Handler', icon: '🛑', color: 'red', description: 'Responds' }
            ]}
            direction="vertical"
          />
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Error in Service */}
          <Card className="bg-red-50 border-red-200">
            <h3 className="font-semibold text-slate-900 mb-3">Service Layer Error</h3>
            <p className="text-slate-700 text-sm mb-3">Service validates business logic and throws if invalid:</p>
            <CodeBlock
              code={`// Service layer detects invalid data
const createTaskService = (title, priority, deadline) => {
  if (priority < 1 || priority > 5) {
    throw new Error("Invalid priority");
  }
  // Continue processing...
};`}
              language="javascript"
            />
          </Card>

          {/* Error in Repository */}
          <Card className="bg-red-50 border-red-200">
            <h3 className="font-semibold text-slate-900 mb-3">Repository Layer Error</h3>
            <p className="text-slate-700 text-sm mb-3">Database operations may fail and throw:</p>
            <CodeBlock
              code={`// Repository may fail with real database
const createTaskRepository = async (data) => {
  try {
    const result = await database.insert(data);
    return result;
  } catch (dbError) {
    // Error propagates to service
    throw dbError;
  }
};`}
              language="javascript"
            />
          </Card>
        </div>
      </div>

      {/* Error Handling in Controller */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="bg-blue-50 border-blue-200">
          <h3 className="font-semibold text-slate-900 mb-4">💡 Try-Catch Pattern</h3>
          <p className="text-slate-700 text-sm mb-4">
            Controllers wrap service calls in try-catch to handle errors gracefully:
          </p>
          <CodeBlock
            code={`export const createTaskController = async (req, res) => {
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
};`}
            language="javascript"
          />
        </Card>

        <div>
          <Card className="mb-6 bg-slate-50">
            <h3 className="font-semibold text-slate-900 mb-4">HTTP Status Codes</h3>
            <div className="space-y-4 text-sm">
              <div>
                <p className="font-mono font-bold text-blue-600 mb-1">200 OK</p>
                <p className="text-slate-700">Request succeeded, data returned</p>
              </div>
              <div>
                <p className="font-mono font-bold text-green-600 mb-1">201 Created</p>
                <p className="text-slate-700">Resource successfully created</p>
              </div>
              <div>
                <p className="font-mono font-bold text-yellow-600 mb-1">400 Bad Request</p>
                <p className="text-slate-700">Client sent invalid data</p>
              </div>
              <div>
                <p className="font-mono font-bold text-orange-600 mb-1">409 Conflict</p>
                <p className="text-slate-700">Request conflicts with existing data</p>
              </div>
              <div>
                <p className="font-mono font-bold text-red-600 mb-1">500 Server Error</p>
                <p className="text-slate-700">Server encountered an error</p>
              </div>
            </div>
          </Card>

          <Card className="bg-slate-50">
            <h3 className="font-semibold text-slate-900 mb-4">🎯 Key Points</h3>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex gap-2">
                <span className="text-blue-600 font-bold">→</span>
                <span>Always catch errors in controllers</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-600 font-bold">→</span>
                <span>Return appropriate HTTP status codes</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-600 font-bold">→</span>
                <span>Never expose internal error details to clients</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-600 font-bold">→</span>
                <span>Log full errors server-side for debugging</span>
              </li>
            </ul>
          </Card>
        </div>
      </div>

      {/* Global Error Handler */}
      <Card className="bg-slate-50 mb-8">
        <h3 className="font-semibold text-slate-900 mb-4">🛡️ Global Error Handler (Production Pattern)</h3>
        <p className="text-slate-700 text-sm mb-4">
          Express applications often include a global error handler middleware to catch any unhandled errors:
        </p>
        <CodeBlock
          code={`// Global error handling middleware
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
});`}
          language="javascript"
        />
      </Card>

      {/* Error Handling Best Practices */}
      <Card className="bg-slate-50">
        <h3 className="font-semibold text-slate-900 mb-4">🏆 Error Handling Best Practices</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-slate-900 mb-2 text-green-700">✓ Production-Ready</h4>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Wrap async operations in try-catch</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Use meaningful HTTP status codes</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Log errors for debugging</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Return consistent error format</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Hide sensitive details from clients</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 mb-2 text-red-700">✗ Avoid</h4>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex gap-2">
                <span className="text-red-600 font-bold">✗</span>
                <span>Ignoring errors silently</span>
              </li>
              <li className="flex gap-2">
                <span className="text-red-600 font-bold">✗</span>
                <span>Always returning 500 status</span>
              </li>
              <li className="flex gap-2">
                <span className="text-red-600 font-bold">✗</span>
                <span>Sending stack traces to clients</span>
              </li>
              <li className="flex gap-2">
                <span className="text-red-600 font-bold">✗</span>
                <span>Generic error messages</span>
              </li>
              <li className="flex gap-2">
                <span className="text-red-600 font-bold">✗</span>
                <span>Forgetting about global handlers</span>
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </Section>
  );
};
