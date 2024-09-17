import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL}api`;

// Helper to get the auth header with the token
const authHeader = () => {
  const token = localStorage.getItem('userToken');
  return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
};

// Thunk to fetch the user profile
export const fetchUserProfile = createAsyncThunk('user/fetchUserProfile', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}/users/profile`, authHeader());
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data.message : error.message);
  }
});

// Thunk to update the user profile
export const updateUserProfile = createAsyncThunk('user/updateUserProfile', async (profileData, { rejectWithValue }) => {
  try {
    const response = await axios.put(`${API_URL}/users/profile`, profileData, authHeader());
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data.message : error.message);
  }
});

// Slice for managing the user profile state
const userSlice = createSlice({
  name: 'user',
  initialState: {
    profile: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    loading: false,
    error: '',
    success: '',
  },
  reducers: {
    clearSuccess(state) {
      state.success = '';
    },
    clearError(state) {
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch user profile
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile.name = action.payload.name;
        state.profile.email = action.payload.email;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update user profile
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = '';
        state.success = '';
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile.name = action.payload.name;
        state.profile.email = action.payload.email;
        state.success = 'Profile updated successfully';
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSuccess, clearError } = userSlice.actions;
export default userSlice.reducer;
