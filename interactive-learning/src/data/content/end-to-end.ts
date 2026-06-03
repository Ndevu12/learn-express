import type { LabeledItem } from '../types';

export const endToEndContent = {
  intro:
    "This comprehensive visualization shows how all the concepts you've learned come together in a production system. Follow the flow from a user logging in through to retrieving protected resources.",
  moreStepsLabel: (count: number) => `+${count} more`,
  timeline: {
    title: 'Flow Timeline',
    steps: [
      {
        title: 'User Authentication (Login)',
        body: 'User submits credentials. Server hashes password, verifies it matches stored hash, generates JWT token with user ID and role.',
        accent: 'blue' as const,
      },
      {
        title: 'Token Storage (Client-side)',
        body: 'Client receives token and stores it (localStorage, sessionStorage, or cookie). Token is now available for all future requests.',
        accent: 'blue' as const,
      },
      {
        title: 'Protected API Request',
        body: 'Client makes request to protected endpoint with token in Authorization header: "Authorization: Bearer <token>"',
        accent: 'blue' as const,
      },
      {
        title: 'Request Processing',
        body: 'Middleware extracts token from header, verifies signature and expiration. If valid, user info attached to request object.',
        accent: 'blue' as const,
      },
      {
        title: 'Authorization Check (RBAC)',
        body: "Authorization middleware checks if user's role has permission for this endpoint. For resource-based access, also verify user owns the resource.",
        accent: 'green' as const,
      },
      {
        title: 'Controller & Service Execution',
        body: 'Controller logic executes with user context available. Services can filter data based on user role or ownership. Database returns user-appropriate data.',
        accent: 'green' as const,
      },
      {
        title: 'Response Returned',
        body: 'Server responds with status 200 OK and user-appropriate data. Client receives and displays data. Flow complete.',
        accent: 'green' as const,
      },
    ],
  },
  clientLayer: {
    title: 'Client Layer',
    intro: "The user's browser or application. Responsible for:",
    bullets: [
      'Collecting user credentials (email, password)',
      'Storing token securely (localStorage, sessionStorage, HTTP-only cookie)',
      'Including token in Authorization header',
      'Handling 401/403 responses (redirect to login, show error)',
      'UX improvements (hide buttons, disable forms) based on role',
    ],
  },
  serverLayer: {
    title: 'Server Layer',
    intro: 'The Express.js application. Responsible for:',
    bullets: [
      'Verifying token signature with secret key',
      'Checking token expiration',
      'Extracting user ID and role from token',
      'Enforcing RBAC on every protected endpoint',
      'Returning 401/403 for unauthorized requests',
      'Filtering database results based on user role/ownership',
    ],
  },
  pitfalls: {
    title: 'Common Pitfalls to Avoid',
    items: [
      {
        title: 'Only securing the frontend',
        body: 'Browser developer tools can bypass frontend security. Always verify on the server.',
      },
      {
        title: 'Storing sensitive data in JWT',
        body: 'JWTs are not encrypted; anyone can decode them. Only store user ID and role.',
      },
      {
        title: 'Forgetting to check token expiration',
        body: 'Verify both signature AND expiration. Expired tokens should be rejected.',
      },
      {
        title: 'Assuming authentication means authorization',
        body: "Knowing who the user is (auth) doesn't mean they can do everything (authz).",
      },
      {
        title: 'Using HTTP instead of HTTPS',
        body: 'Tokens in HTTP headers can be intercepted. Always use HTTPS in production.',
      },
    ] satisfies LabeledItem[],
  },
  summary: {
    title: 'Key Takeaway',
    body: 'Complete authentication and authorization is a multi-step process requiring both client and server cooperation. The server is the ultimate authority for security decisions. Frontend improvements are UX enhancements, not security mechanisms.',
    goldenRule: {
      title: 'The Golden Rule:',
      body: "Every request to a protected endpoint must verify the token's validity and check the user's authorization, regardless of what the frontend did or didn't do.",
    },
  },
} as const;
