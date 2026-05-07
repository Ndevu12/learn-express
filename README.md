# Learn Express 🚀

A comprehensive learning repository for **Express.js** development, designed to take you from beginner to advanced level with practical, hands-on examples.

## 📚 Overview

This repository contains a structured learning path for mastering Express.js, one of the most popular Node.js web frameworks. Whether you're just starting or looking to deepen your skills, you'll find practical projects and examples here.

## 🎯 Learning Path

### Beginner Level
- Basic server setup with Node.js
- Creating your first Express application
- Understanding routing fundamentals
- Handling HTTP requests and responses
- Working with middleware

### Intermediate Level
- RESTful API development
- MVC (Model-View-Controller) architecture
- Data persistence and repositories
- Input validation and error handling
- CORS and security basics

### Advanced Level
- Service-oriented architecture
- Complex routing patterns
- Advanced middleware composition
- Performance optimization
- Logging and monitoring

## 📁 Project Structure

```
learn-express/
├── nodeserver.js           # Basic Node.js server example
├── expressapp.js           # Simple Express application
├── data.js                 # Sample data for learning
├── userController.js       # User management controller
├── userRoutes.js           # User routes configuration
├── package.json            # Project dependencies
│
└── task/                   # Advanced Task Management API
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

3. **Navigate to the task project:**
   ```bash
   cd task
   npm install
   ```

## 📖 Projects Included

### 1. Basic Express Server (`expressapp.js`)
- Foundation for understanding Express basics
- Simple route handling
- Request/response fundamentals

### 2. User Management API (`userController.js`, `userRoutes.js`)
- CRUD operations for user management
- Role-based user structure (admin, manager, user)
- Search and filter functionality
- Error handling examples

### 3. Task Management API (`task/`)
**Architecture:** MVC Pattern with separation of concerns

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

1. **Start Simple**: Begin with `expressapp.js` to understand basic concepts
2. **Build Incrementally**: Progress from user management to the full task API
3. **Understand Layers**: Study the repository → service → controller flow
4. **Experiment**: Modify the code and see how changes affect behavior
5. **Use Logging**: Enable Morgan to understand request/response flow

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
