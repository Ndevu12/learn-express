import {
  createTaskService,
  updateTaskService,
  deleteTaskService,
  getAllTasksService,
  getTaskService,
  getTaskByTitleForUserService,
} from '../services/taskServices.js';
import { sendError } from '../utils/apiResponse.js';

export const createTaskController = async (req, res) => {
  try {
    const { title, priority, deadline } = req.body;
    const { userId } = req.user;
    const trimmedTitle = typeof title === 'string' ? title.trim() : '';

    if (!trimmedTitle || priority === undefined || !deadline) {
      return sendError(res, 400, 'Title, priority and deadline are required.', {
        code: 'VALIDATION_ERROR',
        fields: {
          ...(!trimmedTitle && { title: 'Title is required' }),
          ...(priority === undefined && { priority: 'Priority is required' }),
          ...(!deadline && { deadline: 'Deadline is required' }),
        },
      });
    }

    if (priority < 1 || priority > 5) {
      return sendError(res, 400, 'Priority must be between 1 and 5.', {
        code: 'VALIDATION_ERROR',
        fields: { priority: 'Priority must be between 1 and 5' },
      });
    }

    const existingTask = getTaskByTitleForUserService(trimmedTitle, userId);
    if (existingTask) {
      return sendError(res, 409, 'A task with the same title already exists.', {
        code: 'DUPLICATE_TITLE',
        fields: { title: 'You already have a task with this title' },
      });
    }

    const result = await createTaskService(trimmedTitle, priority, deadline, userId);
    return res.status(201).json(result);
  } catch {
    return sendError(res, 500, 'An error occurred while creating the task.', {
      code: 'SERVER_ERROR',
    });
  }
};

export const updateTaskController = (req, res) => {
  const { id } = req.params;
  const { title, priority, deadline } = req.body;
  const { userId, role } = req.user;
  const trimmedTitle = typeof title === 'string' ? title.trim() : '';

  if (!trimmedTitle || priority === undefined || !deadline) {
    return sendError(res, 400, 'Title, priority and deadline are required.', {
      code: 'VALIDATION_ERROR',
    });
  }

  if (priority < 1 || priority > 5) {
    return sendError(res, 400, 'Priority must be between 1 and 5.', {
      code: 'VALIDATION_ERROR',
      fields: { priority: 'Priority must be between 1 and 5' },
    });
  }

  const duplicate = getTaskByTitleForUserService(trimmedTitle, userId);
  if (duplicate && duplicate.id !== parseInt(id, 10)) {
    return sendError(res, 409, 'A task with the same title already exists.', {
      code: 'DUPLICATE_TITLE',
      fields: { title: 'You already have a task with this title' },
    });
  }

  const result = updateTaskService(id, trimmedTitle, priority, deadline, userId, role);
  if (result.status === 'not_found') {
    return sendError(res, 404, 'Task not found.', { code: 'NOT_FOUND' });
  }
  if (result.status === 'forbidden') {
    return sendError(res, 403, 'You can only update your own tasks.', { code: 'FORBIDDEN' });
  }
  return res.status(200).json(result.task);
};

export const deleteTaskController = (req, res) => {
  const { id } = req.params;
  const { userId, role } = req.user;

  const result = deleteTaskService(id, userId, role);
  if (result.status === 'not_found') {
    return sendError(res, 404, 'Task not found.', { code: 'NOT_FOUND' });
  }
  if (result.status === 'forbidden') {
    return sendError(res, 403, 'You can only delete your own tasks.', { code: 'FORBIDDEN' });
  }
  return res.status(200).json({ message: 'Task deleted successfully.' });
};

export const getAllTasksController = (req, res) => {
  const { userId, role } = req.user;
  const result = getAllTasksService(userId, role);
  return res.status(200).json(result);
};

export const getTaskController = (req, res) => {
  const { id } = req.params;
  const { userId, role } = req.user;

  const result = getTaskService(id, userId, role);
  if (result.status === 'not_found') {
    return sendError(res, 404, 'Task not found.', { code: 'NOT_FOUND' });
  }
  if (result.status === 'forbidden') {
    return sendError(res, 403, 'You can only view your own tasks.', { code: 'FORBIDDEN' });
  }
  return res.status(200).json(result.task);
};
