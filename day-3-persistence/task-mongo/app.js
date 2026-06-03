import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import TaskRouter from "./src/routes/taskRoutes.js";
import { connectDB } from "./config/db.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/tasks", TaskRouter);

const port = process.env.PORT || 4001;
const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  console.error("MONGODB_URI is required. Copy .env.example to .env and set your connection string.");
  process.exit(1);
}

await connectDB(mongoUri);

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
