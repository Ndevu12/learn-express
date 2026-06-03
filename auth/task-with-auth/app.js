import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './src/routes/authRoutes.js';
import TaskRouter from './src/routes/taskRoutes.js';
import { authenticateToken } from './src/middleware/authMiddleware.js';
import { apiLimiter } from './src/middleware/rateLimitMiddleware.js';
import { env } from './src/config/env.js';
import { seedDemoUsers } from './src/seed/demoUsers.js';

const app = express();

app.use(cors({ origin: env.corsOrigin }));
app.use(morgan('dev'));
app.use(express.json());
app.use(apiLimiter);

app.get('/', (req, res) => {
  res.json({
    message: 'Task Manager API with authentication',
    docs: 'See auth/README.md for endpoints and demo accounts',
    health: 'ok',
  });
});

app.use('/auth', authRoutes);
app.use('/tasks', authenticateToken, TaskRouter);

await seedDemoUsers();

app.listen(env.port, () => {
  console.log(`Auth API listening on http://localhost:${env.port}`);
  console.log(`CORS origin: ${env.corsOrigin}`);
});
