import Task from "../models/Task.js";

const toTask = (doc) => {
  if (!doc) return null;
  const task = doc.toObject ? doc.toObject() : doc;
  return {
    id: task.id,
    title: task.title,
    priority: task.priority,
    deadline: task.deadline,
    createdAt: task.createdAt,
  };
};

export const createTaskRepository = async (title, priority, deadline) => {
  const task = await Task.create({
    id: Date.now(),
    title,
    priority,
    deadline,
    createdAt: new Date(),
  });
  return toTask(task);
};

export const updateTaskRepository = async (id, title, priority, deadline) => {
  const task = await Task.findOneAndUpdate(
    { id: parseInt(id, 10) },
    { title, priority, deadline },
    { new: true }
  );
  return toTask(task);
};

export const deleteTaskRepository = async (id) => {
  const result = await Task.deleteOne({ id: parseInt(id, 10) });
  return result.deletedCount > 0;
};

export const getAllTaskRepository = async () => {
  const tasks = await Task.find().sort({ createdAt: -1 });
  return tasks.map(toTask);
};

export const getTaskRepository = async (id) => {
  const task = await Task.findOne({ id: parseInt(id, 10) });
  return toTask(task);
};

export const getTaskByTitleRepository = async (title) => {
  const task = await Task.findOne({ title });
  return toTask(task);
};
