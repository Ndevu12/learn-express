# Interactive Learning — Following the Request

[![Interactive Learning CI](https://github.com/Ndevu12/learn-express/actions/workflows/interactive-learning-ci.yml/badge.svg)](https://github.com/Ndevu12/learn-express/actions/workflows/interactive-learning-ci.yml)

Interactive React modules for the Learn Express workshop (this app is also React — meta only). A **day picker** in the header switches Day 1–4; the sidebar shows modules for the selected day. Previous/Next navigation stays within that day.

**Taskflow product stack in this repo:** Express APIs (`task-api`, `task-mongo`, `task-with-auth`) plus the **Taskflow task UI** built with **React + Vite** (`day-4-auth-and-security/auth/task-with-auth-ui`). Day 1–3 narrative follows the same React client calling those APIs; Day 4 runnable covers API port **4000** and UI port **5173**.

## Checks

Pull requests that touch `interactive-learning/` run **Interactive Learning CI**: `npm ci` and `npm run build` on Node 20. See [.github/workflows/interactive-learning-ci.yml](../.github/workflows/interactive-learning-ci.yml).

## What You'll Learn

### **Day 1 — The Request Arrives**
- **A Request Arrives** — Maya clicks Add task in the Taskflow React app; POST /tasks leaves the client layer
- **HTTP & the Request** — method, URL, headers, body
- **Node Native Server** — manual routing with `http.createServer` (`nodeserver.js`)
- **First Express Routes** — `app.get` / `app.post`, `req` / `res` (`expressapp.js`)

### **Day 2 — Structured Application**
- **Production Architecture Overview** - React (Taskflow UI) → routes, middleware, controllers, services, repositories
- **Request Lifecycle** - React fetch() through the full HTTP request/response cycle
- **CRUD Operations** - Create, Read, Update, Delete with real examples
- **Middleware Pipeline** - Middleware execution order and the `next()` function
- **Validation** - Production-grade input validation patterns
- **Error Handling** - Error propagation and recovery strategies

### **Day 3 — Persistent Storage**
- **Why Persistence?** — in-memory vs data that survives restart
- **MongoDB & Connection** — env, Mongoose, `task-mongo` on port 4001
- **Repository with Mongo** — same interface as Day 2, MongoDB implementation

### **Day 4 — Trust & Authorization**
- **Auth vs Authorization** - Identity (401) versus permissions (403)
- **Authentication Flow** - Registration, login, password hashing, and JWT generation
- **JWT Deep Dive** - Token structure, lifecycle, and verification
- **Protected Routes** - Token validation and access decisions
- **Role-Based Access Control (RBAC)** - Roles, permissions, and authorization
- **End-to-End Flow** - Complete secure request journey
- **Auth + MongoDB** - Users and tasks collections; run API + React UI (4000 + 5173)

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Navigate to the interactive learning app:
```bash
cd interactive-learning
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser (automatically opens at http://localhost:3000)

### Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## 📁 Project Structure

```
interactive-learning/
├── src/
│   ├── main.tsx                 # React entry point
│   ├── App.tsx                  # Main app with navigation
│   ├── index.css               # Tailwind CSS
│   ├── data/
│   │   └── examples.ts         # Real code examples and data
│   └── components/
│       ├── shared/             # Reusable UI components
│       │   ├── Card.tsx
│       │   ├── Badge.tsx
│       │   ├── CodeBlock.tsx
│       │   ├── LayerCard.tsx
│       │   └── FlowDiagram.tsx
│       └── modules/            # Learning modules
│           ├── ArchitectureExplorer.tsx
│           ├── RequestLifecycleExplorer.tsx
│           ├── AuthenticationFlow.tsx        (NEW)
│           ├── JWTExplorer.tsx               (NEW)
│           ├── ProtectedRoutes.tsx           (NEW)
│           ├── RBACModule.tsx                (NEW)
│           ├── EndToEndFlow.tsx              (NEW)
│           ├── CRUDVisualization.tsx
│           ├── ValidationModule.tsx
│           ├── ErrorHandlingModule.tsx
│           └── MiddlewarePipeline.tsx
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

## 🛠️ Technology Stack

- **React 18**: Interactive UI
- **TypeScript**: Type-safe code
- **Tailwind CSS**: Professional styling
- **Vite**: Fast build tool and development server

## 📚 How to Use

1. Choose **Day 1**, **Day 2**, **Day 3**, or **Day 4** in the header day picker (mobile: under the header bar).
2. Use the sidebar to open a module for that day only (your last module per day is remembered in the browser session).
3. Use **Previous** / **Next** to move through modules on the same day; switch days explicitly when you are ready.

### Learning Path

1. **Day 1 — The Request Arrives**
   - A Request Arrives, then HTTP parts, Node native server, first Express routes

2. **Day 2 — Structured Application**
   - Architecture Overview: Understand the layered structure
   - Request Lifecycle: See how requests flow through layers
   - CRUD, Middleware, Validation, Error Handling: Production API patterns

2. **Day 3 — Persistent Storage**
   - Why persistence, MongoDB connection, repository contrast with Day 2

3. **Day 4 — Trust & Authorization**
   - Auth vs Authorization: 401 vs 403
   - Authentication Flow: Registration → Login → Token Generation
   - JWT Tokens: Structure, lifecycle, verification
   - Protected Routes & RBAC: Access control decisions
   - End-to-End: Complete secure application flow

### Interactive Features

- **Click to expand**: Explore details about each concept
- **Step-through**: Navigate through multi-step processes
- **Compare scenarios**: See different outcomes (valid token, expired token, etc.)
- **View real code**: Copy-friendly code examples from production API
- **Visual flows**: See data transformation through layers

## 💡 Key Learning Outcomes

After completing this module, you'll understand:

✅ How authentication works (registration, password hashing, login)
✅ JWT token structure and lifecycle
✅ How servers verify tokens and control access
✅ Role-based access control implementation
✅ Frontend vs backend security responsibilities
✅ The complete secure request cycle
✅ Production-ready Express patterns

## 🔐 Security Concepts Taught

- **Password Security**: Hashing with bcrypt, never storing plain-text passwords
- **JWT**: Token structure, signature verification, expiration
- **Authentication vs Authorization**: Who you are vs what you can do
- **Frontend vs Backend Security**: UX improvements vs security enforcement
- **Protected Routes**: 401 Unauthorized vs 403 Forbidden
- **RBAC**: Role hierarchy and permission matrices
- **Security Best Practices**: HTTPS, token storage, secret management

## 🎓 Learning Progression

The module guides you through authentication from multiple angles:

1. **Conceptual Understanding**: What is authentication? Why is it important?
2. **Registration Flow**: How users create accounts securely
3. **JWT Tokens**: How stateless authentication works
4. **Token Verification**: How servers validate tokens
5. **Authorization**: How role-based access control works
6. **End-to-End**: How all pieces fit together
7. **Real Code**: Production patterns from Express applications

## 📖 Code Examples

All code examples are from real, production-ready implementations:

- Task Management API with authentication
- User registration and login flows
- Protected routes and middleware
- RBAC implementation
- Error handling patterns

Reference the actual code (run locally — see [auth/README.md](../day-4-auth-and-security/auth/README.md)):

- Backend API: `../day-4-auth-and-security/auth/task-with-auth/` (port **4000**)
- React UI: `../day-4-auth-and-security/auth/task-with-auth-ui/` (port **5173**)
- Demo accounts: `user@learn-express.test` / `user123`, `admin@learn-express.test` / `admin123`
- Middleware: `../day-4-auth-and-security/auth/task-with-auth/src/middleware/authMiddleware.js`

## 🔗 External Resources

- [Express.js Documentation](https://expressjs.com/)
- [JWT.io - JWT Debugger](https://jwt.io/)
- [Node.js Documentation](https://nodejs.org/en/docs/)
- [OWASP Security](https://owasp.org/)
- [RESTful API Design](https://restfulapi.net/)

## 🤔 FAQ

**Q: Can I use this module offline?**
A: After building with `npm run build`, yes! The `dist/` folder can be served statically.

**Q: Is this suitable for beginners?**
A: Yes! Start with Fundamentals, then move to Authentication & Security. The learning path guides you.

**Q: Can I modify the examples?**
A: Yes! Edit `src/data/examples.ts` to add your own examples or reference different code.

**Q: How long does it take to complete?**
A: 60-90 minutes for full comprehension, but you can learn specific topics in 10-15 minutes.

**Q: Is this suitable for teaching others?**
A: Absolutely! This module is designed as educational material. Share it with your team!

## 📝 Development

### Add a New Module

1. Create component: `src/components/modules/YourModule.tsx`
2. Add to App.tsx tabs array and renderModule switch
3. Add data to `src/data/examples.ts` if needed
4. Import and use in App.tsx

### Update Examples

Edit `src/data/examples.ts` to include your code examples or modify existing ones.

## 🐛 Troubleshooting

**Port 3000 already in use?**
Vite will automatically use the next available port or specify one in vite.config.ts

**Dependencies not installing?**
```bash
rm package-lock.json
npm install
```

**Changes not reflecting?**
```bash
rm -rf node_modules/.vite
npm run dev
```

## 🎯 Module Improvements

Recent enhancements include:

✅ Five new authentication & security modules
✅ Comprehensive JWT education
✅ RBAC visualization and implementation
✅ End-to-end flow visualization
✅ Improved accessibility (ARIA labels, keyboard navigation)
✅ Header day picker; sidebar scoped to the selected day only
✅ Enhanced code examples
✅ Better visual hierarchy

## 📄 License

ISC

## 👨‍💻 Author

Created as part of the Learn Express learning repository.

---

**Happy Learning!** 🎉

This interactive module is designed to make learning secure, production-ready Express.js development engaging, visual, and practical. Master authentication and authorization to build trustworthy applications!

