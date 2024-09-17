// src/redux/slices/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const API_URL = process.env.REACT_APP_API_URL + '/auth';

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      if (response.data.token) {
        const decodedUser = jwtDecode(response.data.token);
        localStorage.setItem('userToken', response.data.token);
        return { ...decodedUser, token: response.data.token };
      }
      return rejectWithValue('Login failed: No token received');
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data.message || 'Login failed');
      } else if (error.request) {
        return rejectWithValue('No response from server. Please try again.');
      } else {
        return rejectWithValue('Error setting up request. Please try again.');
      }
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/register`, { name, email, password });
      if (response.data.token) {
        const decodedUser = jwtDecode(response.data.token);
        localStorage.setItem('userToken', response.data.token);
        return { ...decodedUser, token: response.data.token };
      }
      return rejectWithValue('Registration failed: No token received');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue('An unexpected error occurred during registration');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem('userToken');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setUser, clearError, logoutUser } = authSlice.actions;

export default authSlice.reducer;

export const getCurrentUser = () => {
  const token = localStorage.getItem('userToken');
  if (token) {
    const decodedUser = jwtDecode(token);
    return { ...decodedUser, token };
  }
  return null;
};