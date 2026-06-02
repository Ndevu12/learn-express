import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./src/routes/authRoutes.js";
import TaskRouter from "./src/routes/taskRoutes.js";
import { authenticateToken } from "./src/middleware/authMiddleware.js";
import { apiLimiter } from "./src/middleware/rateLimitMiddleware.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(apiLimiter);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Task Manager API running' });
});

// Public routes
app.use("/auth", authRoutes);

// Protected routes
app.use("/tasks", authenticateToken, TaskRouter);

const port = 4000;

const listen = (port) =>  console.log(`Server is listening on http://localhost:${port}`);

app.listen(port, listen(port))
