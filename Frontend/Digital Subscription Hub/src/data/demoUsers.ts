// Demo users for frontend-only authentication
export interface DemoUser {
  id: number;
  email: string;
  password: string;
  name: string;
  role: 'user' | 'admin';
  createdAt: string;
  isActive: boolean;
}

export const demoUsers: DemoUser[] = [
  {
    id: 1,
    email: 'demo@sunstone.com',
    password: 'password',
    name: 'Demo User',
    role: 'user',
    createdAt: '2024-01-01T00:00:00.000Z',
    isActive: true
  },
  {
    id: 2,
    email: 'admin@sunstone.com',
    password: 'password',
    name: 'Admin User',
    role: 'admin',
    createdAt: '2024-01-01T00:00:00.000Z',
    isActive: true
  },
  {
    id: 3,
    email: 'john@example.com',
    password: 'password123',
    name: 'John Doe',
    role: 'user',
    createdAt: '2024-02-15T10:30:00.000Z',
    isActive: true
  },
  {
    id: 4,
    email: 'jane@example.com',
    password: 'password123',
    name: 'Jane Smith',
    role: 'user',
    createdAt: '2024-03-20T14:45:00.000Z',
    isActive: true
  },
  {
    id: 5,
    email: 'manager@sunstone.com',
    password: 'admin123',
    name: 'Manager User',
    role: 'admin',
    createdAt: '2024-01-15T09:15:00.000Z',
    isActive: true
  }
];

// Helper function to find user by email
export const findUserByEmail = (email: string): DemoUser | undefined => {
  return demoUsers.find(user => user.email === email);
};

// Helper function to find user by ID
export const findUserById = (id: number): DemoUser | undefined => {
  return demoUsers.find(user => user.id === id);
};

// Helper function to get all users (for admin)
export const getAllUsers = (): DemoUser[] => {
  return demoUsers;
};

// Helper function to check if email exists
export const emailExists = (email: string): boolean => {
  return demoUsers.some(user => user.email === email);
};
