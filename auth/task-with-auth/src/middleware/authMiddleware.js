import { verifyToken } from '../services/authService.js';

/**
 * Authentication: establish identity (401 if missing or invalid token).
 */
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }

  req.user = {
    userId: decoded.userId,
    role: decoded.role,
  };
  next();
};

/**
 * Authorization: check role after authenticateToken (403 if role not allowed).
 */
export const authorizeRole = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'You do not have permission' });
    }

    next();
  };
};
