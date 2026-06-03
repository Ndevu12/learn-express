export const validationContent = {
  intro:
    'When Maya submits a task from the React UI, invalid input should fail at the API before it reaches business logic. The Taskflow UI surfaces API validation errors in forms and modals — the server still owns the rules.',
  purposeHeading: 'Purpose',
  implementationHeading: 'Implementation',
  whyValidationTitle: 'Why Validation Matters',
  whyValidationBullets: [
    'Prevents invalid data from entering your system',
    'Provides clear error messages to API consumers',
    'Reduces bugs and security vulnerabilities',
    'Improves user experience with immediate feedback',
  ],
  badRequestTitle: 'Bad Request Scenario',
  validRequestTitle: 'Valid Request',
  validRequestBody:
    'When data passes validation, it continues to the service and repository layers where business logic and data persistence happen.',
  validRequestNextTitle: 'What Happens Next',
  validRequestNextSteps: [
    'Service layer processes the validated data',
    'Repository layer persists to database',
    'Response sent back with 201 Created or 200 OK',
  ],
  bestPractices: {
    title: 'Validation Best Practices',
    doTitle: 'Do This',
    doItems: [
      'Validate early, at controller level',
      'Return appropriate HTTP status codes (400, 409, etc.)',
      'Provide descriptive error messages',
      'Centralize validation logic in middleware',
    ],
    avoidTitle: 'Avoid This',
    avoidItems: [
      'Assuming input is valid',
      'Validating in service layer',
      'Generic error messages like "Error"',
      'Duplicating validation across layers',
    ],
  },
} as const;
