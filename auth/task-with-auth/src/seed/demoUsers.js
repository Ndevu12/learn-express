import { hashPassword } from '../services/authService.js';
import { getAllUsers, createUser } from '../services/userService.js';

const DEMO_USERS = [
  {
    email: 'admin@learn-express.test',
    password: 'admin123',
    name: 'Admin Demo',
    role: 'admin',
  },
  {
    email: 'user@learn-express.test',
    password: 'user123',
    name: 'User Demo',
    role: 'user',
  },
];

export async function seedDemoUsers() {
  if (getAllUsers().length > 0) {
    return;
  }

  for (const demo of DEMO_USERS) {
    const hashedPassword = await hashPassword(demo.password);
    await createUser({
      email: demo.email,
      password: hashedPassword,
      name: demo.name,
      role: demo.role,
    });
  }

  console.log('Seeded demo users (in-memory):');
  DEMO_USERS.forEach((u) => {
    console.log(`  ${u.role.padEnd(5)} ${u.email} / ${u.password}`);
  });
}
