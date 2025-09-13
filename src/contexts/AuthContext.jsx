import React, { createContext, useContext, useReducer, useEffect } from 'react';

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  role: null, // 'admin' or 'user'
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, isLoading: true };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        role: action.payload.role,
        isAuthenticated: true,
        isLoading: false,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        user: null,
        role: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        role: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check for existing session on app load
  useEffect(() => {
    const checkAuth = () => {
      const savedUser = localStorage.getItem('user');
      const savedRole = localStorage.getItem('role');
      
      if (savedUser && savedRole) {
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: {
            user: JSON.parse(savedUser),
            role: savedRole,
          },
        });
      } else {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password, role) => {
    dispatch({ type: 'LOGIN_START' });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data based on role
      const user = {
        id: role === 'admin' ? 'admin-1' : 'user-1',
        email,
        name: role === 'admin' ? 'Admin User' : 'John Doe',
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(role === 'admin' ? 'Admin' : 'User')}&background=3b82f6&color=fff`,
      };

      // Save to localStorage
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('role', role);

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { user, role },
      });

      return { success: true };
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE' });
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    dispatch({ type: 'LOGOUT' });
  };

  const value = {
    ...state,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
