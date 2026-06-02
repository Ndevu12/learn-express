import {
    createTaskRepository, 
    updateTaskRepository,
    deleteTaskRepository,
    getAllTaskRepository,
    getTaskRepository,
    getTaskByTitleRepository
} from "../repositories/taskRepository.js";

const createTaskService = (title, priority, deadline, userId) => {
    deadline = new Date(deadline);
    return createTaskRepository(title, priority, deadline, userId);
};

const updateTaskService = (id, title, priority, deadline, userId) => {
    deadline = new Date(deadline);
    return updateTaskRepository(id, title, priority, deadline, userId);
};

const deleteTaskService = (id, userId) => {
    return deleteTaskRepository(id, userId);
};

const getAllTasksService = (userId) => {
    const allTasks = getAllTaskRepository();
    return allTasks.filter(task => task.userId === userId);
};

const getTaskService = (id, userId) => {
    const task = getTaskRepository(id);
    if (task && task.userId === userId) {
        return task;
    }
    return null;
};

export const getTaskByTitleService = (title) => {
    return getTaskByTitleRepository(title);
};

export {
    createTaskService,
    updateTaskService,
    deleteTaskService,
    getAllTasksService,
    getTaskService
};