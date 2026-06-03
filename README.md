# Learn Express 🚀

A hands-on learning repository for **Express.js** — from native Node HTTP through structured APIs, persistence, and authentication.

## Mission

Teach backend development by **following one HTTP request** as it gains layers each day: server → structure → database → auth. Runnable code, interactive modules, and docs live in one repo so learners can run and compare projects side by side.

**Curriculum (four days):** [docs/CURRICULUM.md](docs/CURRICULUM.md) — day themes, request-flow diagrams, and glossary.  
**Docs index:** [docs/README.md](docs/README.md)

## Repository map

| What | Path | Day | Port |
|------|------|-----|------|
| Native HTTP + minimal Express | [day-1-http-and-express/](day-1-http-and-express/README.md) | 1 | 5000 |
| Routes + controllers | [express-basics/](day-2-structured-api/express-basics/README.md) | 2a | 5000 |
| Layered task API (in-memory) | [task-api/](day-2-structured-api/task-api/README.md) | 2b | 4000 |
| MongoDB task API | [task-mongo/](day-3-persistence/task-mongo/README.md) | 3 | **4001** |
| Auth API + React UI | [auth/](day-4-auth-and-security/auth/README.md) | 4 | 4000 / 5173 |
| Interactive modules | [interactive-learning/](interactive-learning/) | 1–4 | 6700 |
| Curriculum (public) | [docs/CURRICULUM.md](docs/CURRICULUM.md) | — | — |

Install dependencies **inside each project folder** (there is no single root `npm install`). See [Getting started](#-getting-started) below. Auth setup and demo users: [day-4-auth-and-security/auth/README.md](day-4-auth-and-security/auth/README.md).

### Former paths (folder reorg)

If an older link or video still uses these locations:

| Former | Now |
|--------|-----|
| `nodeserver.js`, `expressapp.js` (repo root) | `day-1-http-and-express/` |
| `expressBasics/` | `day-2-structured-api/express-basics/` |
| `task/` | `day-2-structured-api/task-api/` |
| `task-mongo/` | `day-3-persistence/task-mongo/` |
| `auth/` | `day-4-auth-and-security/auth/` |

## 📚 Overview

This repository contains a structured learning path for mastering **Express.js**, one of the most popular Node.js web frameworks. Whether you're just starting or looking to deepen your skills, you'll find practical projects and examples here.

We start with **native Node.js HTTP server basics** to understand the fundamentals, then progress through **Express.js** at beginner, intermediate, and advanced levels. This journey helps you appreciate why Express exists and understand the transition from raw Node.js to a professional web framework.

### 🔄 The Journey

**Native Node.js → Express Basics → Organized Structure → Advanced MVC Architecture**

The progression shows you not just **how** to use Express, but **why** it's the better choice.

## 🎯 Learning Path

### 📌 Starting Point: Understanding HTTP Basics
**Folder:** [day-1-http-and-express/](day-1-http-and-express/README.md) — `nodeserver.js`, `expressapp.js`

A quick reference to native Node.js HTTP server to understand what Express simplifies (manual routing, header management, body parsing, middleware).

### Beginner Level
**Folder:** [day-2-structured-api/express-basics/](day-2-structured-api/express-basics/README.md)

- Basic Express server setup with `app.js`
- Creating your first Express application
- Understanding routing fundamentals
- Separating routes from controllers
- Handling HTTP requests and responses
- Working with middleware
- Managing user data with `data.js`

### Intermediate Level
**Folder:** express-basics with user management extension

- RESTful API development with user operations
- Organizing code with controllers and routes
- MVC (Model-View-Controller) architecture introduction
- Input validation and error handling
- CORS and security basics
- Full CRUD operations on user resources

### Advanced Level
**Folder:** [day-2-structured-api/task-api/](day-2-structured-api/task-api/README.md)

- Complete MVC (Model-View-Controller) architecture
- Service-oriented architecture
- Repository pattern for data access
- Complex routing patterns
- Advanced middleware composition
- Performance optimization with logging
- Production-ready application structure

## 📁 Project Structure

```
learn-express/
├── README.md
├── docs/
│   ├── README.md
│   └── CURRICULUM.md
├── day-1-http-and-express/       # Day 1 — nodeserver.js, expressapp.js
├── day-2-structured-api/
│   ├── express-basics/           # Day 2a
│   └── task-api/                 # Day 2b (port 4000)
├── day-3-persistence/
│   └── task-mongo/               # Day 3 (port 4001)
├── day-4-auth-and-security/
│   ├── README.md
│   └── auth/
│       ├── task-with-auth/
│       └── task-with-auth-ui/
└── interactive-learning/
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager
- Basic JavaScript knowledge

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Ndevu12/learn-express.git
   cd learn-express
   ```

2. **Day 1 — HTTP and Express:**
   ```bash
   cd day-1-http-and-express
   node nodeserver.js    # one terminal
   node expressapp.js    # another — port 5000
   ```
   Guide: [day-1-http-and-express/README.md](day-1-http-and-express/README.md).

3. **Express Basics (Day 2a):**
   ```bash
   cd day-2-structured-api/express-basics
   npm install
   npm run dev
   ```

4. **Task API (Day 2b):**
   ```bash
   cd day-2-structured-api/task-api
   npm install
   npm run dev
   ```
   CRUD curl examples: [day-2-structured-api/task-api/README.md](day-2-structured-api/task-api/README.md).

5. **MongoDB Task API (Day 3):**
   ```bash
   cd day-3-persistence/task-mongo
   cp .env.example .env   # set MONGODB_URI
   npm install
   npm run dev            # http://localhost:4001
   ```
   Setup, env vars, and curl examples: [day-3-persistence/task-mongo/README.md](day-3-persistence/task-mongo/README.md).

6. **Interactive learning (Days 1–4 modules):**
   ```bash
   cd interactive-learning
   npm install
   npm run dev            # http://localhost:6700
   ```

7. **Auth API + UI (Day 4):** see [Day 4: Authentication & security](#-day-4-authentication--security) below for two-terminal setup and [day-4-auth-and-security/auth/README.md](day-4-auth-and-security/auth/README.md) for demo users.

## 📖 Projects Included

### 1. Basic Express Server (`day-1-http-and-express/expressapp.js`)
- Foundation for understanding Express basics
- Simple route handling
- Request/response fundamentals
- Your entry point into Express after understanding Node.js HTTP basics

### 2. Express Basics Project (`day-2-structured-api/express-basics/`)
**Beginner & Intermediate Level**

A complete beginner-to-intermediate project with proper structure:

- **app.js**: Main Express application file
- **userController.js**: Handles user-related HTTP requests
- **userRoutes.js**: Defines API routes for user operations
- **data.js**: Sample user data for testing

Features:
- CRUD operations for user management
- Role-based user structure (admin, manager, user)
- Separation of routes from controllers
- Search and filter functionality
- Error handling examples
- Input validation
- RESTful API design

This project shows how to **organize Express applications** properly and is your bridge between basic Express understanding and advanced architecture patterns.

### 3. Task Management API (`day-2-structured-api/task-api/`)
**Advanced Level**

A production-ready Express application demonstrating **professional architecture** and best practices.

**Architecture:** Complete MVC Pattern with separation of concerns

- **Controllers** (`src/controllers/`): Handle HTTP requests with validation
- **Services** (`src/services/`): Contain business logic
- **Repositories** (`src/repositories/`): Manage data persistence
- **Routes** (`src/routes/`): Define API endpoints

#### Features:
- ✅ Create tasks with priority levels (1-5)
- ✅ Update existing tasks
- ✅ Delete tasks
- ✅ Retrieve all tasks
- ✅ Get individual task by ID
- ✅ Input validation and error handling
- ✅ Duplicate title prevention
- ✅ HTTP request logging with Morgan
- ✅ CORS support

#### API Endpoints:
```
POST   /tasks              - Create a new task
GET    /tasks              - Get all tasks
GET    /tasks/:id          - Get task by ID
PUT    /tasks/:id          - Update a task
DELETE /tasks/:id          - Delete a task
```

#### Request/Response Examples:

**Create Task:**
```bash
POST /tasks
Content-Type: application/json

{
  "title": "Learn Express Middleware",
  "priority": 3,
  "deadline": "2026-12-31"
}
```

**Task Response:**
```json
{
  "title": "Learn Express Middleware",
  "priority": 3,
  "deadline": "2026-12-31T00:00:00.000Z"
}
```

### 4. MongoDB Task API (`day-3-persistence/task-mongo/`)
**Day 3 — Persistence**

Same REST endpoints as task-api, with tasks stored in MongoDB (data survives restart). Default port **4001** so it can run beside the in-memory API on 4000. Details: [day-3-persistence/task-mongo/README.md](day-3-persistence/task-mongo/README.md).

## 🔄 Why Express Matters

Coming from native Node.js HTTP servers, Express provides:

- ✅ Built-in routing system instead of manual if/else chains
- ✅ Automatic header management
- ✅ Easy middleware integration
- ✅ Clean, readable, scalable code
- ✅ Rich ecosystem of ready-to-use middleware

### Feature Comparison Table

| Aspect | Node.js HTTP | Express |
|--------|-------------|---------|
| **Routing** | Manual if/else logic | Built-in Router with methods |
| **Middleware** | Must build from scratch | Thousands available |
| **Body Parsing** | Manual implementation | `express.json()` |
| **Error Handling** | Verbose try/catch | Centralized error handlers |
| **Code Length** | Lots of boilerplate | Concise & readable |
| **Scalability** | Gets messy fast | Scales elegantly |
| **Learning Curve** | Steep | Gentle progression |
| **Production Ready** | Possible but complex | Yes, out of the box |

## 🎓 Interactive learning (Days 2–4 modules)

**Path:** [interactive-learning/](interactive-learning/)

One Vite app with modules for architecture, request lifecycle, CRUD, validation, errors, middleware, and full auth (JWT, RBAC, end-to-end). Maps to **Day 2b** and **Day 4** in [docs/CURRICULUM.md](docs/CURRICULUM.md); Day 1 and Day 3 modules are planned.

### Topics in the app

1. **Architecture** — layers from route to repository (and database)
2. **Request lifecycle** — step through a request/response
3. **CRUD, validation, errors, middleware** — production-shaped API patterns
4. **Auth** — authentication vs authorization, JWT, protected routes, RBAC

### Quick start

```bash
cd interactive-learning
npm install
npm run dev
```

See [interactive-learning/README.md](interactive-learning/README.md) for details.

## 🔐 Day 4: Authentication & security

Runnable API + UI under `day-4-auth-and-security/auth/`, plus interactive auth modules in `interactive-learning/`.

### What You'll Learn

The `interactive-learning/` module teaches core security topics through interactive visualizations:

1. **Authentication Fundamentals** - User login, JWT tokens, password hashing
2. **Authorization & Permissions** - Role-based access control (RBAC), middleware guards
3. **API Security** - CORS, rate limiting, input sanitization
4. **Password Management** - Hashing, salting, bcrypt patterns
5. **JWT Implementation** - Token generation, validation, expiration
6. **Security Best Practices** - HTTPS, secure headers, OWASP guidelines

### Quick Start

```bash
cd interactive-learning
npm install
npm run dev
# Opens http://localhost:6700
```

### Runnable Day 4 projects (API + UI)

Hands-on apps that match the interactive module:

```bash
# Terminal 1 — Auth API (port 4000)
cd day-4-auth-and-security/auth/task-with-auth && npm install && npm run dev

# Terminal 2 — Auth UI (port 5173)
cd day-4-auth-and-security/auth/task-with-auth-ui && npm install && npm run dev
```

Demo logins, endpoints, and environment variables: [day-4-auth-and-security/auth/README.md](day-4-auth-and-security/auth/README.md).

### 📖 Full Documentation

See [interactive-learning/README.md](interactive-learning/README.md) for installation and learning guides.

---

## 📘 Reference: Native Node.js HTTP Server

To understand what Express simplifies, here's how to build a basic HTTP server with **native Node.js** (without any framework):

### Basic HTTP Server Structure

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  // Handle routing manually with if/else
  if (req.url === '/' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World');
  } else if (req.url === '/users' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ users: [] }));
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

### Key Challenges with Native Node.js HTTP:

1. **Manual Routing**: Every route requires if/else statements
2. **Header Management**: You manually set headers for each response
3. **Body Parsing**: Parsing request bodies requires manual stream handling
4. **Middleware**: Creating reusable middleware is complex
5. **Scalability**: Code becomes unwieldy as the application grows
6. **Error Handling**: No centralized error handling mechanism
7. **Development Time**: Much more boilerplate code for simple tasks

### Why Express is Better

See `day-1-http-and-express/expressapp.js` for how Express simplifies all of this with just a few lines:

```javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Hello World'));
app.get('/users', (req, res) => res.json({ users: [] }));

app.listen(3000);
```

**Result**: 
- No manual routing logic
- Automatic header management
- Built-in JSON parsing
- Much cleaner and more maintainable

---

This is why `day-1-http-and-express/nodeserver.js` exists—to remind you of these challenges and help you appreciate the elegance that Express brings to Node.js development.

## 🏗️ Architecture Patterns

### MVC (Model-View-Controller)
The task management project demonstrates the MVC pattern:

- **Controllers** (`taskControllers.js`): Handle HTTP requests, validation, and responses
- **Services** (`taskServices.js`): Contain core business logic
- **Repositories** (`taskRepository.js`): Manage data access and persistence

### Middleware Stack
- **Morgan**: HTTP request logging
- **CORS**: Cross-origin resource sharing
- **Express JSON**: Built-in JSON parser

## 🛠️ Key Concepts Covered

| Concept | Implementation |
|---------|-----------------|
| Routing | Express Router in task routes |
| Controllers | Request/response handling |
| Services | Business logic separation |
| Repositories | Data access patterns |
| Validation | Input validation in controllers |
| Error Handling | Try-catch and status codes |
| Middleware | Morgan and CORS integration |
| REST API | Full CRUD implementation |

## 📝 Code Examples

### Creating a Simple Route
```javascript
import express from "express";
import taskRoutes from "./src/routes/taskRoutes.js";

const app = express();
app.use(express.json());
app.use("/tasks", taskRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

### Creating a Service
```javascript
const createTaskService = (title, priority, deadline) => {
  deadline = new Date(deadline);
  return createTaskRepository(title, priority, deadline);
};
```

### Creating a Controller
```javascript
export const createTaskController = async (req, res) => {
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
};
```

## 📦 Dependencies

### Core Dependencies
- **express** - Web framework
- **morgan** - HTTP request logging
- **cors** - Cross-origin resource sharing

### Development Setup
- ES6 modules enabled (`"type": "module"` in package.json)
- Node.js native module support

## 🎓 Learning Tips

1. **Start with Day 1**: `day-1-http-and-express/nodeserver.js` then `expressapp.js`
2. **Explore express-basics**: `app.js`, `userRoutes.js`, `userController.js`, and `data.js`
3. **Progress to task-api**: Full layered MVC (repository → service → controller)
4. **Build incrementally**: Each day adds layers on the same request path
5. **Understand layers**: Study repository → service → controller flow
6. **Experiment**: Modify code and see how changes affect behavior
7. **Use logging**: Morgan on task-api and task-mongo
8. **Reference Day 1**: When stuck, compare with `nodeserver.js` to appreciate Express

## 🔍 Best Practices Demonstrated

✅ Separation of concerns (layers: controller, service, repository)
✅ Input validation at controller level
✅ Error handling with appropriate HTTP status codes
✅ RESTful endpoint design
✅ Middleware integration
✅ Async/await for asynchronous operations
✅ Environment-aware configuration

## 🐛 Debugging Tips

### View Git Log
```bash
git log --oneline
```

### Check Current Config
```bash
git config user.name
git config user.email
```

### Test API Endpoints
```bash
# Using curl
curl -X GET http://localhost:4000/tasks

# Or use Postman/Insomnia for better UI
```

## 📚 Additional Resources

- [Express.js Official Documentation](https://expressjs.com/)
- [Node.js Documentation](https://nodejs.org/en/docs/)
- [RESTful API Best Practices](https://restfulapi.net/)
- [JavaScript Async/Await Guide](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous)

## 🤝 Contributing

This is a learning repository. Feel free to:
- Add new features
- Improve existing code
- Create additional examples
- Suggest improvements

## 📄 License

ISC

## 👨‍💻 Author

Created for Express.js learners by the community

---

**Happy Learning!** 🎉

Start with the beginner examples and progressively work your way through the advanced task management API. Each step builds upon the previous one to help you master Express.js development.
