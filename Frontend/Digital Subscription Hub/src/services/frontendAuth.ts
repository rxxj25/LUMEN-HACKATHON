// Frontend-only authentication service
import { demoUsers, findUserByEmail, findUserById, emailExists, DemoUser } from '../data/demoUsers';

export interface AuthResponse {
  user: DemoUser;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  name?: string;
}

class FrontendAuthService {
  private token: string | null = null;
  private currentUser: DemoUser | null = null;

  // Generate a simple token (in real app, this would be from backend)
  private generateToken(user: DemoUser): string {
    const tokenData = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      timestamp: Date.now()
    };
    return btoa(JSON.stringify(tokenData)); // Simple base64 encoding
  }

  // Parse token to get user data
  private parseToken(token: string): any {
    try {
      return JSON.parse(atob(token));
    } catch (error) {
      return null;
    }
  }

  // Check if token is valid (not expired)
  private isTokenValid(token: string): boolean {
    const tokenData = this.parseToken(token);
    if (!tokenData) return false;
    
    // Token expires after 24 hours
    const tokenAge = Date.now() - tokenData.timestamp;
    const maxAge = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    
    return tokenAge < maxAge;
  }

  // Login user
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = findUserByEmail(credentials.email);
        
        if (!user) {
          reject(new Error('Invalid email or password'));
          return;
        }

        if (!user.isActive) {
          reject(new Error('Account is deactivated'));
          return;
        }

        if (user.password !== credentials.password) {
          reject(new Error('Invalid email or password'));
          return;
        }

        const token = this.generateToken(user);
        this.token = token;
        this.currentUser = user;
        
        // Store in localStorage
        localStorage.setItem('auth_token', token);
        localStorage.setItem('current_user', JSON.stringify(user));

        resolve({
          user: { ...user, password: '' }, // Remove password from response
          token
        });
      }, 500); // Simulate network delay
    });
  }

  // Register new user
  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (emailExists(credentials.email)) {
          reject(new Error('User with this email already exists'));
          return;
        }

        const newUser: DemoUser = {
          id: demoUsers.length + 1,
          email: credentials.email,
          password: credentials.password,
          name: credentials.name || credentials.email.split('@')[0],
          role: 'user',
          createdAt: new Date().toISOString(),
          isActive: true
        };

        // Add to demo users (in memory only)
        demoUsers.push(newUser);

        const token = this.generateToken(newUser);
        this.token = token;
        this.currentUser = newUser;
        
        // Store in localStorage
        localStorage.setItem('auth_token', token);
        localStorage.setItem('current_user', JSON.stringify(newUser));

        resolve({
          user: { ...newUser, password: '' }, // Remove password from response
          token
        });
      }, 500); // Simulate network delay
    });
  }

  // Get current user
  async getCurrentUser(): Promise<{ user: DemoUser }> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!this.token || !this.isTokenValid(this.token)) {
          reject(new Error('Invalid or expired token'));
          return;
        }

        const tokenData = this.parseToken(this.token);
        const user = findUserById(tokenData.id);
        
        if (!user) {
          reject(new Error('User not found'));
          return;
        }

        resolve({
          user: { ...user, password: '' } // Remove password from response
        });
      }, 200);
    });
  }

  // Logout user
  async logout(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.token = null;
        this.currentUser = null;
        localStorage.removeItem('auth_token');
        localStorage.removeItem('current_user');
        resolve();
      }, 200);
    });
  }

  // Refresh token
  async refreshToken(): Promise<{ token: string }> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!this.currentUser) {
          reject(new Error('No current user'));
          return;
        }

        const token = this.generateToken(this.currentUser);
        this.token = token;
        localStorage.setItem('auth_token', token);

        resolve({ token });
      }, 200);
    });
  }

  // Initialize auth state from localStorage
  initializeAuth(): void {
    const token = localStorage.getItem('auth_token');
    const userStr = localStorage.getItem('current_user');
    
    if (token && userStr && this.isTokenValid(token)) {
      this.token = token;
      this.currentUser = JSON.parse(userStr);
    } else {
      // Clear invalid data
      localStorage.removeItem('auth_token');
      localStorage.removeItem('current_user');
    }
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!(this.token && this.isTokenValid(this.token));
  }

  // Get current token
  getToken(): string | null {
    return this.token;
  }

  // Get current user (synchronous)
  getCurrentUserSync(): DemoUser | null {
    return this.currentUser;
  }
}

// Create and export singleton instance
export const frontendAuthService = new FrontendAuthService();
export default frontendAuthService;
