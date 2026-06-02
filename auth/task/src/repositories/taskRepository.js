export let tasks = [];

export const createTaskRepository = (title, priority, deadline) => {
    return tasks.push([title, priority, deadline])
};

export const updateTaskRepository = (id, title, priority, deadline) => {
    tasks[id] = [title, priority, deadline];
};

export const deleteTaskRepository = (id) => {
    tasks.splice(id, 1);
};

export function getAllTaskRepository(){
    return tasks;
};

export function getTaskRepository(id){
    return tasks.at(id);
};

export const getTaskByTitleRepository = (title) => {
    for (const task of tasks) {
        console.log(task[0], title);
        if (task[0] === title) {
            return task;
        }
    }
    return false;
}

