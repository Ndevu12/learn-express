import {
  hashPassword,
  comparePassword,
  generateToken,
} from '../services/authService.js';
import { createUser, getUserByEmail, getUserById } from '../services/userService.js';
import { toPublicUser } from '../utils/userResponse.js';
import { sendError } from '../utils/apiResponse.js';

export const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return sendError(res, 400, 'Email, password, and name are required', {
        code: 'VALIDATION_ERROR',
      });
    }

    if (password.length < 6) {
      return sendError(res, 400, 'Password must be at least 6 characters', {
        code: 'VALIDATION_ERROR',
        fields: { password: 'Password must be at least 6 characters' },
      });
    }

    const existingUser = getUserByEmail(email);
    if (existingUser) {
      return sendError(res, 409, 'Email already registered', {
        code: 'DUPLICATE_EMAIL',
        fields: { email: 'This email is already in use' },
      });
    }

    const hashedPassword = await hashPassword(password);
    const user = await createUser({
      email,
      password: hashedPassword,
      name,
      role: 'user',
    });

    const token = generateToken(user.id, user.role);
    return res.status(201).json({
      message: 'Registration successful',
      token,
      user: toPublicUser(user),
    });
  } catch {
    return sendError(res, 500, 'Registration failed', { code: 'SERVER_ERROR' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return sendError(res, 400, 'Email and password are required', {
        code: 'VALIDATION_ERROR',
      });
    }

    const user = getUserByEmail(email);
    if (!user) {
      return sendError(res, 401, 'Invalid credentials', { code: 'INVALID_CREDENTIALS' });
    }

    const passwordMatch = await comparePassword(password, user.password);
    if (!passwordMatch) {
      return sendError(res, 401, 'Invalid credentials', { code: 'INVALID_CREDENTIALS' });
    }

    const token = generateToken(user.id, user.role);
    return res.status(200).json({
      message: 'Login successful',
      token,
      user: toPublicUser(user),
    });
  } catch {
    return sendError(res, 500, 'Login failed', { code: 'SERVER_ERROR' });
  }
};

export const getMe = (req, res) => {
  const user = getUserById(req.user.userId);
  if (!user) {
    return sendError(res, 404, 'User not found', { code: 'NOT_FOUND' });
  }
  return res.status(200).json({ user: toPublicUser(user) });
};
