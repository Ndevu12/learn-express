export const lifecycleContent = {
  intro:
    'Step 1 starts in the Taskflow React app: a form submit or button calls fetch() toward the API. The rest of the timeline is the server-side path that same request follows.',
  timelineTitle: 'Timeline',
  fieldLabels: {
    dataIn: 'Data in',
    dataOut: 'Data out',
    example: 'Example',
    logic: 'Logic',
  },
  takeaway: {
    title: 'Key Takeaway',
    intro:
      'Request/response cycles follow a predictable pattern: Request arrives, gets routed, passes through middleware, hits controllers, uses services, accesses data, and returns a response. Understanding this flow helps you:',
    bullets: [
      'Debug issues by knowing where to look in the stack',
      'Add middleware strategically for logging, validation, or authentication',
      'Optimize performance by recognizing bottlenecks at each stage',
    ] satisfies string[],
  },
} as const;
