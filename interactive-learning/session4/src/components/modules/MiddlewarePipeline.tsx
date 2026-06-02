import React, { useState } from 'react';
import { Section, Card } from '../shared/Card';
import { CodeBlock } from '../shared/CodeBlock';
import { middlewarePipelineSteps } from '../../data/examples';

export const MiddlewarePipeline: React.FC = () => {
  const [selectedStep, setSelectedStep] = useState(0);

  const step = middlewarePipelineSteps[selectedStep];

  return (
    <Section
      title="Middleware Pipeline Explorer"
      description="Understand how middleware stack executes and transforms requests"
      icon="⚙️"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Pipeline Steps */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-slate-200 p-4 sticky top-20">
            <h3 className="font-semibold text-slate-900 mb-4 text-sm uppercase tracking-wide text-slate-600">
              Pipeline Order
            </h3>

            <div className="space-y-2">
              {middlewarePipelineSteps.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedStep(idx)}
                  className={`w-full text-left px-3 py-2 rounded transition-colors text-sm ${
                    selectedStep === idx
                      ? 'bg-blue-600 text-white font-semibold'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className="font-mono text-xs font-bold">{idx + 1}</span> {s.middleware}
                </button>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded border border-blue-200">
              <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide mb-2">Execution Order</p>
              <p className="text-sm text-blue-900">
                Middleware executes in the order declared with <code className="font-mono bg-white px-1 py-0.5">next()</code> calling the
                next middleware.
              </p>
            </div>
          </div>
        </div>

        {/* Step Details */}
        <div className="lg:col-span-2">
          <Card className="bg-blue-50 border-blue-200 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-sm">
                {step.order}
              </span>
              <h2 className="text-2xl font-bold text-slate-900">{step.middleware}</h2>
            </div>

            <p className="text-slate-700 mb-6">{step.purpose}</p>

            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">📝 Code</p>
                <CodeBlock code={step.code} language="javascript" />
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">💥 Effect on Request</p>
                <div className="bg-white p-3 rounded border border-slate-200 text-sm text-slate-700">
                  {step.effect}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">📌 Real-World Example</p>
                <div className="bg-white p-3 rounded border border-slate-200 text-sm text-slate-700">
                  {step.example}
                </div>
              </div>
            </div>
          </Card>

          {/* Navigation */}
          <div className="flex gap-4">
            <button
              onClick={() => setSelectedStep(Math.max(0, selectedStep - 1))}
              disabled={selectedStep === 0}
              className={`btn ${
                selectedStep === 0 ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'btn-secondary'
              }`}
            >
              ← Previous
            </button>

            <div className="flex-1 flex items-center justify-center">
              <p className="text-sm text-slate-600 font-mono">
                {selectedStep + 1} / {middlewarePipelineSteps.length}
              </p>
            </div>

            <button
              onClick={() => setSelectedStep(Math.min(middlewarePipelineSteps.length - 1, selectedStep + 1))}
              disabled={selectedStep === middlewarePipelineSteps.length - 1}
              className={`btn ${
                selectedStep === middlewarePipelineSteps.length - 1
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  : 'btn-secondary'
              }`}
            >
              Next →
            </button>
          </div>
        </div>
      </div>

      {/* Full Pipeline Visualization */}
      <Card className="bg-slate-50 mb-8">
        <h3 className="font-semibold text-slate-900 mb-4">📊 Full Middleware Pipeline</h3>
        <p className="text-slate-700 text-sm mb-6">
          This is how the Express app sets up its middleware stack:
        </p>

        <CodeBlock
          code={`import express from "express";
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
});`}
          language="javascript"
        />
      </Card>

      {/* Middleware Concepts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="bg-blue-50 border-blue-200">
          <h3 className="font-semibold text-slate-900 mb-4">🔗 How next() Works</h3>
          <CodeBlock
            code={`// Middleware is a function that receives (req, res, next)
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
// Response must be sent with res.send() or res.json()`}
            language="javascript"
          />
        </Card>

        <Card className="bg-slate-50">
          <h3 className="font-semibold text-slate-900 mb-4">⚡ Middleware Best Practices</h3>
          <ul className="space-y-3 text-sm text-slate-700">
            <li className="flex gap-2">
              <span className="text-blue-600 font-bold">✓</span>
              <div>
                <p className="font-semibold">Order Matters</p>
                <p>Declare middleware before routes</p>
              </div>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-600 font-bold">✓</span>
              <div>
                <p className="font-semibold">Always Call next()</p>
                <p>Unless sending response</p>
              </div>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-600 font-bold">✓</span>
              <div>
                <p className="font-semibold">Keep Middleware Lean</p>
                <p>Heavy logic in services</p>
              </div>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-600 font-bold">✓</span>
              <div>
                <p className="font-semibold">Error Handlers Last</p>
                <p>Declare after all other middleware</p>
              </div>
            </li>
          </ul>
        </Card>
      </div>

      {/* Key Takeaway */}
      <Card className="bg-slate-50">
        <h3 className="font-semibold text-slate-900 mb-3">🎯 Key Takeaway</h3>
        <p className="text-slate-700 text-sm">
          Middleware runs in a strict order: each middleware receives the request, processes it, and calls{' '}
          <code className="bg-slate-100 px-1 py-0.5">next()</code> to pass control to the next middleware. This chain
          continues until a route handler sends a response. Understanding this flow is crucial for debugging, adding
          logging, implementing authentication, and handling errors in production applications.
        </p>
      </Card>
    </Section>
  );
};
