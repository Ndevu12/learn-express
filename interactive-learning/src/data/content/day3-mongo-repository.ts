import type { LabeledItem } from '../types';

export const mongoRepositoryContent = {
  intro:
    'The repository interface stays the same from Day 2 to Day 3. What changes is the implementation: array methods become async Mongoose calls, and documents map back to plain task objects. The Taskflow React UI keeps the same fetch calls and JSON shape.',
  diffTitle: 'Same function names, different implementation',
  sharedFunctions: [
    'createTaskRepository',
    'getTaskRepository',
    'getAllTaskRepository',
    'updateTaskRepository',
    'deleteTaskRepository',
  ],
  inMemoryNote: 'Synchronous — tasks.push, tasks.find',
  mongoNote: 'Async — Task.create, Task.findOne, Task.findOneAndUpdate',
  mappingTitle: 'toTask helper',
  mappingBody:
    'Mongoose returns documents with extra fields. toTask(doc) normalizes to { id, title, priority, deadline, createdAt } so controllers see the same JSON shape as Day 2.',
  serviceImpact: {
    title: 'Services become async',
    body: 'When the repository returns Promises, services and controllers use await. That is the main ripple effect — not new routes or validation rules.',
  } satisfies LabeledItem,
  tryIt: {
    title: 'Exercise',
    body: 'Compare the in-memory repository from Day 2 with the Mongoose implementation. For each CRUD method, note the synchronous array version vs the async database equivalent.',
  },
} as const;
