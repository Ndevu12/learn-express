export let tasks = [];

export const createTaskRepository = (title, priority, deadline, userId) => {
    const task = {
        id: Date.now(),
        title,
        priority,
        deadline,
        userId,
        createdAt: new Date()
    };
    tasks.push(task);
    return task;
};

export const updateTaskRepository = (id, title, priority, deadline, userId) => {
    const task = tasks.find(t => t.id === parseInt(id) && t.userId === userId);
    if (task) {
        task.title = title;
        task.priority = priority;
        task.deadline = deadline;
        return task;
    }
    return null;
};

export const deleteTaskRepository = (id, userId) => {
    const index = tasks.findIndex(t => t.id === parseInt(id) && t.userId === userId);
    if (index > -1) {
        tasks.splice(index, 1);
        return true;
    }
    return false;
};

export const getAllTaskRepository = () => {
    return tasks;
};

export const getTaskRepository = (id) => {
    return tasks.find(t => t.id === parseInt(id)) || null;
};

export const getTaskByTitleRepository = (title) => {
    return tasks.find(t => t.title === title) || null;
};

