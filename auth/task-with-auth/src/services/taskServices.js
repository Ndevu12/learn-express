import {
  createTaskRepository,
  updateTaskRepository,
  deleteTaskRepository,
  getAllTaskRepository,
  getTaskRepository,
  getTaskByTitleRepository,
} from '../repositories/taskRepository.js';

const createTaskService = (title, priority, deadline, userId) => {
  deadline = new Date(deadline);
  return createTaskRepository(title, priority, deadline, userId);
};

const updateTaskService = (id, title, priority, deadline, userId, role) => {
  deadline = new Date(deadline);
  const task = getTaskRepository(id);
  if (!task) return { status: 'not_found' };
  if (task.userId !== userId && role !== 'admin') {
    return { status: 'forbidden' };
  }
  return { status: 'ok', task: updateTaskRepository(id, title, priority, deadline, task.userId) };
};

const deleteTaskService = (id, userId, role) => {
  const task = getTaskRepository(id);
  if (!task) return { status: 'not_found' };
  if (task.userId !== userId && role !== 'admin') {
    return { status: 'forbidden' };
  }
  const deleted = deleteTaskRepository(id, task.userId);
  return deleted ? { status: 'ok' } : { status: 'not_found' };
};

const getAllTasksService = (userId, role) => {
  const allTasks = getAllTaskRepository();
  if (role === 'admin') {
    return allTasks;
  }
  return allTasks.filter((task) => task.userId === userId);
};

const getTaskService = (id, userId, role) => {
  const task = getTaskRepository(id);
  if (!task) return { status: 'not_found' };
  if (task.userId !== userId && role !== 'admin') {
    return { status: 'forbidden' };
  }
  return { status: 'ok', task };
};

export const getTaskByTitleForUserService = (title, userId) => {
  return getTaskByTitleRepository(title, userId);
};

export {
  createTaskService,
  updateTaskService,
  deleteTaskService,
  getAllTasksService,
  getTaskService,
};
