import {
  createTaskService,
  updateTaskService,
  deleteTaskService,
  getAllTasksService,
  getTaskService,
  getTaskByTitleService,
} from "../services/taskServices.js";

export const createTaskController = async (req, res) => {
  try {
    const { title, priority, deadline } = req.body;
    if (!title || !priority || !deadline) {
      return res.status(400).json({ message: "Title, priority and deadline are required." });
    }

    if (priority < 1 || priority > 5) {
      return res.status(400).json({ message: "Priority must be between 1 and 5." });
    }

    const existingTask = await getTaskByTitleService(title);
    if (existingTask) {
      return res.status(409).json({ message: "A task with the same title already exists." });
    }

    const result = await createTaskService(title, priority, deadline);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ message: "An error occurred while creating the task." });
  }
};

export const updateTaskController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, priority, deadline } = req.body;

    if (!title || !priority || !deadline) {
      return res.status(400).json({ message: "Title, priority and deadline are required." });
    }

    if (priority < 1 || priority > 5) {
      return res.status(400).json({ message: "Priority must be between 1 and 5." });
    }

    const result = await updateTaskService(id, title, priority, deadline);
    if (!result) {
      return res.status(404).json({ message: "Task not found." });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: "An error occurred while updating the task." });
  }
};

export const deleteTaskController = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await deleteTaskService(id);
    if (!deleted) {
      return res.status(404).json({ message: "Task not found." });
    }
    return res.status(200).json({ message: "Task deleted successfully." });
  } catch (error) {
    return res.status(500).json({ message: "An error occurred while deleting the task." });
  }
};

export const getAllTasksController = async (req, res) => {
  try {
    const result = await getAllTasksService();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: "An error occurred while fetching tasks." });
  }
};

export const getTaskController = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await getTaskService(id);
    if (!result) {
      return res.status(404).json({ message: "Task not found." });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: "An error occurred while fetching the task." });
  }
};
