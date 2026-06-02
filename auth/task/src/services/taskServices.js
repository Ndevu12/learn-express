import {
    createTaskRepository, 
    updateTaskRepository,
    deleteTaskRepository,
    getAllTaskRepository,
    getTaskRepository,
    getTaskByTitleRepository
} from "../repositories/taskRepository.js";

const createTaskService = (title, priority, deadline) => {
    deadline = new Date(deadline);
    return createTaskRepository(title, priority, deadline);
};

const updateTaskService = (id, title, priority, deadline) => {
    deadline = new Date(deadline);
    return updateTaskRepository(id, title, priority, deadline);
};

const deleteTaskService = (id) => {
    return deleteTaskRepository(id);
};

const getAllTasksService = () => {
    return getAllTaskRepository();
};

const getTaskService = (id) => {
    return getTaskRepository(id);
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