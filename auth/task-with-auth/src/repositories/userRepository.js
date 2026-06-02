// Mock database - replace with real DB in production
let users = [];

export const createUser = async (userData) => {
  const user = {
    id: Date.now(),
    ...userData,
    createdAt: new Date()
  };
  users.push(user);
  return user;
};

export const getUserByEmail = (email) => {
  return users.find(u => u.email === email);
};

export const getUserById = (id) => {
  return users.find(u => u.id === id);
};

export const updateUser = (id, updates) => {
  const user = users.find(u => u.id === id);
  if (user) {
    Object.assign(user, updates);
  }
  return user;
};

export const deleteUser = (id) => {
  users = users.filter(u => u.id !== id);
};

export const getAllUsers = () => {
  return users;
};
