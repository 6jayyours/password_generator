import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define thunks

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:8080/api/v1/users/register', userData, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'An error occurred');
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:8080/api/v1/users/login', userData, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'An error occurred');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      return 'Logout successful';
    } catch (error) {
      return rejectWithValue(error.message || 'An error occurred during logout');
    }
  }
);

export const savePassword = createAsyncThunk(
  'password/savePassword',
  async (passwordData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:8080/api/v1/users/savepass', passwordData, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data; // Expecting { passwords: [...] } or directly an array
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'An error occurred');
    }
  }
);


// Define slice

const passwordSlice = createSlice({
  name: 'password',
  initialState: {
    username: '',
    passwords: [],
    message: '',
    error: null,
    status: 'idle',
  },
  reducers: {
    setUser(state, action) {
      state.username = action.payload.username;
      state.passwords = action.payload.passwords;
      state.message = action.payload.message;
    },
    clearUser(state) {
      state.username = '';
      state.passwords = [];
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.username = action.payload.username;
        state.passwords = action.payload.passwords;
        state.message = action.payload.message;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(logoutUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = 'succeeded';
        state.username = '';
        state.passwords = [];
        state.message = '';
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(savePassword.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(savePassword.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.passwords = Array.isArray(action.payload) ? action.payload : action.payload.passwords; // Ensure payload is handled correctly
      })
      .addCase(savePassword.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { setUser, clearUser } = passwordSlice.actions;
export const passReducer = passwordSlice.reducer;
