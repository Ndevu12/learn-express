import {
    createTaskController,
    updateTaskController,
    deleteTaskController,
    getAllTasksController,
    getTaskController,
} from "../controllers/taskControllers.js";
import express from "express";

const router = express.Router();

router.post("/", createTaskController);
router.put("/:id", updateTaskController);
router.delete("/:id", deleteTaskController);
router.get("/", getAllTasksController);
router.get("/:id", getTaskController);

export default router;
