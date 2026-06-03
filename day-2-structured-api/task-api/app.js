import express from "express";
import cors from "cors";
import morgan from "morgan";
import TaskRouter from "./src/routes/taskRoutes.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());



app.use("/tasks", TaskRouter);

const port = 4000;

const listen = (port) =>  console.log(`Server is listening on http://localhost:${port}`);

app.listen(port, listen(port))
