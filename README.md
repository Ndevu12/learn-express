# Learn Express 🚀

A comprehensive learning repository for **Express.js** development, designed to take you from beginner to advanced level with practical, hands-on examples.

## 📚 Overview

This repository contains a structured learning path for mastering **Express.js**, one of the most popular Node.js web frameworks. Whether you're just starting or looking to deepen your skills, you'll find practical projects and examples here.

We start with **native Node.js HTTP server basics** to understand the fundamentals, then progress through **Express.js** at beginner, intermediate, and advanced levels. This journey helps you appreciate why Express exists and understand the transition from raw Node.js to a professional web framework.

### 🔄 The Journey

**Native Node.js → Express Basics → Organized Structure → Advanced MVC Architecture**

The progression shows you not just **how** to use Express, but **why** it's the better choice.

## 🎯 Learning Path

### 📌 Starting Point: Understanding HTTP Basics
**File:** `nodeserver.js`

A quick reference to native Node.js HTTP server to understand what Express simplifies (manual routing, header management, body parsing, middleware).

### Beginner Level
**Folder:** `expressBasics/`

- Basic Express server setup with `app.js`
- Creating your first Express application
- Understanding routing fundamentals
- Separating routes from controllers
- Handling HTTP requests and responses
- Working with middleware
- Managing user data with `data.js`

### Intermediate Level
**Folder:** `expressBasics/` with user management extension

- RESTful API development with user operations
- Organizing code with controllers and routes
- MVC (Model-View-Controller) architecture introduction
- Input validation and error handling
- CORS and security basics
- Full CRUD operations on user resources

### Advanced Level
**Folder:** `task/`

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
├── nodeserver.js           # Native Node.js HTTP server (foundation reference)
├── expressapp.js           # Basic Express application
├── README.md               # This documentation
├── package.json            # Root project dependencies
│
├── expressBasics/          # Beginner & Intermediate Level Projects
│   ├── app.js              # Express app with routes
│   ├── data.js             # Sample user data
│   ├── userController.js   # User request handlers
│   ├── userRoutes.js       # User routes configuration
│   ├── package.json        # Express basics dependencies
│   └── package-lock.json
│
└── task/                   # Advanced Level - Task Management API
    ├── app.js              # Express app configuration
    ├── package.json        # Task project dependencies
    │
    └── src/
        ├── controllers/    # Request handlers and business logic
        │   └── taskControllers.js
        │
        ├── services/       # Business logic layer
        │   └── taskServices.js
        │
        ├── repositories/   # Data access layer
        │   └── taskRepository.js
        │
        └── routes/         # API endpoint definitions
            └── taskRoutes.js
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

2. **Install root dependencies:**
   ```bash
   npm install
   ```

3. **For Express Basics (Beginner & Intermediate):**
   ```bash
   cd expressBasics
   npm install
   npm run dev
   ```

4. **For Task Management API (Advanced):**
   ```bash
   cd task
   npm install
   npm run dev
   ```

## 📖 Projects Included

### 1. Basic Express Server (`expressapp.js`)
- Foundation for understanding Express basics
- Simple route handling
- Request/response fundamentals
- Your entry point into Express after understanding Node.js HTTP basics

### 2. Express Basics Project (`expressBasics/`)
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

### 3. Task Management API (`task/`)
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

## 🎓 Session 3: Production-Ready Express APIs

**Interactive Learning Module** for mastering production-oriented Express development.

### What You'll Learn

The `interactive-learning/session-3/` module teaches six core topics through interactive visualizations and real code examples:

1. **Production Architecture** - Understand the 7-layer architecture (Routes → Controllers → Services → Repositories → Database)
2. **Request Lifecycle** - Step through a complete HTTP request/response cycle with data transformations
3. **CRUD Operations** - Deep dive into Create, Read, Update, Delete with flow diagrams
4. **Input Validation** - Master validation patterns (required fields, ranges, uniqueness)
5. **Error Handling** - Learn error propagation and centralized error handling
6. **Middleware Pipeline** - Understand how middleware executes in order with the `next()` function

### Quick Start

```bash
cd interactive-learning/session-3
npm install
npm run dev
# Opens http://localhost:3000
```

The module features interactive visualizations, real code from the Task Management API, and professional documentation-style design.

### 📖 Full Documentation

See `interactive-learning/session-3/README.md` for installation, learning paths, and how to extend the module.

## 🔐 Session 4: Authentication & Security

**Interactive Learning Module** for mastering authentication and security in Express.

### What You'll Learn

The `interactive-learning/session-4/` module teaches core security topics through interactive visualizations:

1. **Authentication Fundamentals** - User login, JWT tokens, password hashing
2. **Authorization & Permissions** - Role-based access control (RBAC), middleware guards
3. **API Security** - CORS, rate limiting, input sanitization
4. **Password Management** - Hashing, salting, bcrypt patterns
5. **JWT Implementation** - Token generation, validation, expiration
6. **Security Best Practices** - HTTPS, secure headers, OWASP guidelines

### Quick Start

```bash
cd interactive-learning/session-4
npm install
npm run dev
# Opens http://localhost:3000
```

### 📖 Full Documentation

See `interactive-learning/session-4/README.md` for installation and learning guides.

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

See `expressapp.js` in this repository for how Express simplifies all of this with just a few lines:

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

This is why `nodeserver.js` exists in this repository—to remind you of these challenges and help you appreciate the elegance that Express brings to Node.js development.

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

1. **Start with `nodeserver.js`**: Understand native Node.js HTTP to appreciate Express
2. **Move to `expressapp.js`**: See basic Express in action
3. **Explore `expressBasics/`**: This is your main learning project for beginner & intermediate concepts
   - Start with `app.js` to see the complete structure
   - Study `userRoutes.js` to understand routing
   - Review `userController.js` to see request handling patterns
   - Check `data.js` for sample data structure
4. **Progress to `task/`**: Master advanced MVC architecture
5. **Build Incrementally**: Each level builds on the previous
6. **Understand Layers**: Study the repository → service → controller flow
7. **Experiment**: Modify code and see how changes affect behavior
8. **Use Logging**: Enable Morgan to understand request/response flow
9. **Reference Node.js HTTP**: When you struggle, compare with `nodeserver.js` to appreciate Express simplicity

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
curl -X GET http://localhost:3000/tasks

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
