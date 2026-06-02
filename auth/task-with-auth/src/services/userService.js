import * as userRepository from '../repositories/userRepository.js';

// Business logic only - delegates to repository
export const createUser = async (userData) => {
  return userRepository.createUser(userData);
};

export const getUserByEmail = (email) => {
  return userRepository.getUserByEmail(email);
};

export const getUserById = (id) => {
  return userRepository.getUserById(id);
};

export const updateUser = (id, updates) => {
  return userRepository.updateUser(id, updates);
};
