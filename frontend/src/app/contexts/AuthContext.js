import { createContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { InjLoading } from 'app/components';

axios.defaults.withCredentials = true;

const initialState = {
  user: null,
  isInitialised: false,
  isAuthenticated: false
};

const isValidToken = (accessToken) => {
  if (!accessToken) return false;

  const decodedToken = jwtDecode(accessToken);
  const currentTime = Date.now() / 1000;
  return decodedToken.exp > currentTime;
};

const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem('accessToken');
    delete axios.defaults.headers.common.Authorization;
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'INIT': {
      const { isAuthenticated, user } = action.payload;
      return { ...state, isAuthenticated, isInitialised: true, user };
    }

    case 'LOGIN': {
      const { user, accessToken } = action.payload;
      setSession(accessToken);
      return { ...state, isAuthenticated: true, user };
    }

    case 'LOGOUT': {
      setSession(null);
      return { ...state, isAuthenticated: false, user: null };
    }

    case 'REGISTER': {
      const { user, accessToken } = action.payload;
      setSession(accessToken);
      return { ...state, isAuthenticated: true, user };
    }

    case 'SET_FORMS': {
      const { forms } = action.payload;
      return { ...state, forms };
    }

    default:
      return state;
  }
};

const AuthContext = createContext({
  ...initialState,
  method: 'JWT',
  login: () => {},
  logout: () => {},
  getForms: () => {},
  register: () => {}
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = async (email, password) => {
    try {
      const response = await axios.post('https://injury-tracker-backend-blond.vercel.app/api/login', { email, password });
      const { user, token } = response.data;

      dispatch({ type: 'LOGIN', payload: { user, accessToken: token } });
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const register = async (email, username, password) => {
    try {
      const response = await axios.post('https://injury-tracker-backend-blond.vercel.app/api/register', {
        email,
        username,
        password
      });
      const { user, token } = response.data;

      dispatch({ type: 'REGISTER', payload: { user, accessToken: token } });
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  const getForms = async () => {
    try {
      const response = await axios.get('https://injury-tracker-backend-blond.vercel.app/api/myForms', {
        withCredentials: true
      });
      const forms = response.data;
      console.log('Forms received:', forms);

      dispatch({ type: 'SET_FORMS', payload: { forms } });
    } catch (error) {
      console.error('Error fetching forms:', error);
    }
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  useEffect(() => {
    // Check if there is a valid token in local storage
    const token = localStorage.getItem('accessToken');
    if (isValidToken(token)) {
      const decodedToken = jwtDecode(token);
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      dispatch({ type: 'INIT', payload: { ...state, isAuthenticated: true, user: decodedToken } });
    } else {
      setSession(null);
      dispatch({ type: 'INIT', payload: { isAuthenticated: false, user: null } });
    }
  }, []);

  if (!state.isInitialised) return <InjLoading />;

  return (
    <AuthContext.Provider value={{ ...state, method: 'JWT', login, logout, register, getForms }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
