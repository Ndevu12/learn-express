import 'dotenv/config';

const port = Number(process.env.PORT) || 4000;
const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173';

export const env = {
  port,
  corsOrigin,
  jwtSecret: process.env.JWT_SECRET || 'dev-only-change-in-production',
  nodeEnv: process.env.NODE_ENV || 'development',
};
