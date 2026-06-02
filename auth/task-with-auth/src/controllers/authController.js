import { 
  hashPassword, 
  comparePassword, 
  generateToken 
} from '../services/authService.js';
import { 
  createUser, 
  getUserByEmail 
} from '../services/userService.js';

export const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ 
        message: 'Email, password, and name are required' 
      });
    }

    const existingUser = getUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ 
        message: 'Email already registered' 
      });
    }

    const hashedPassword = await hashPassword(password);
    const user = await createUser({
      email,
      password: hashedPassword,
      name,
      role: 'user'
    });

    const token = generateToken(user.id, user.role);
    return res.status(201).json({
      message: 'Registration successful',
      token,
      user: { id: user.id, email: user.email, name: user.name }
    });
  } catch (error) {
    return res.status(500).json({ 
      message: 'Registration failed' 
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        message: 'Email and password are required' 
      });
    }

    const user = getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ 
        message: 'Invalid credentials' 
      });
    }

    const passwordMatch = await comparePassword(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ 
        message: 'Invalid credentials' 
      });
    }

    const token = generateToken(user.id, user.role);
    return res.status(200).json({
      message: 'Login successful',
      token,
      user: { id: user.id, email: user.email, name: user.name }
    });
  } catch (error) {
    return res.status(500).json({ 
      message: 'Login failed' 
    });
  }
};
