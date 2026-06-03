import {
  createTaskRepository,
  updateTaskRepository,
  deleteTaskRepository,
  getAllTaskRepository,
  getTaskRepository,
  getTaskByTitleRepository,
} from "../repositories/taskRepository.js";

const createTaskService = async (title, priority, deadline) => {
  deadline = new Date(deadline);
  return createTaskRepository(title, priority, deadline);
};

const updateTaskService = async (id, title, priority, deadline) => {
  deadline = new Date(deadline);
  return updateTaskRepository(id, title, priority, deadline);
};

const deleteTaskService = async (id) => {
  return deleteTaskRepository(id);
};

const getAllTasksService = async () => {
  return getAllTaskRepository();
};

const getTaskService = async (id) => {
  return getTaskRepository(id);
};

export const getTaskByTitleService = async (title) => {
  return getTaskByTitleRepository(title);
};

export {
  createTaskService,
  updateTaskService,
  deleteTaskService,
  getAllTasksService,
  getTaskService,
};
