// FILE: finwise/frontend/src/store/apiSlice.js
// LINE: Entire file

//  Child Explanation:
// This slice handles all the communication with the backend.
// When we need to test if the backend is working, we ask this slice.

//  Technical Explanation:
// Redux Toolkit slice for API-related state and actions.
// Contains async thunk for testing the backend connection.

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../utils/axiosConfig';

// ────────────────────────────────────────────────
// Async Thunk: Test Backend Connection
// ────────────────────────────────────────────────

//  Child Explanation:
// This is like sending a message to the backend saying "Are you there?"

//  Technical Explanation:
// createAsyncThunk creates an async action that handles:
// - pending, fulfilled, and rejected states automatically
// - error handling with try/catch
// - dispatch of actions for each state

export const testBackendConnection = createAsyncThunk(
  // Action type (will be used for action creators)
  'api/testBackend',
  // Async function that performs the actual work
  async (_, { rejectWithValue }) => {
    try {
      // Make GET request to /api/test endpoint
      const response = await axiosInstance.get('/api/test');
      // Return the data from the response
      return response.data;
    } catch (error) {
      // If there's an error, return it for the rejected state
      // Check if error has response data (API error)
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      // Network error or other issue
      return rejectWithValue({
        success: false,
        message: error.message || 'Failed to connect to backend',
      });
    }
  }
);

// ────────────────────────────────────────────────
// API Slice
// ────────────────────────────────────────────────

//  Child Explanation:
// This is the drawer in our filing cabinet for API-related stuff.

//  Technical Explanation:
// The slice defines the initial state and reducers for the API feature.
// Extra reducers handle the async thunk states (pending, fulfilled, rejected).

const initialState = {
  // Loading state for the test request
  isLoading: false,
  // The response data from the backend
  data: null,
  // Any error that occurred
  error: null,
  // Timestamp of the last test
  lastTestTime: null,
};

const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {
    // Clear the test results (reset state)
    clearTestResults: (state) => {
      state.data = null;
      state.error = null;
      state.isLoading = false;
      state.lastTestTime = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // When the test is pending (loading)
      .addCase(testBackendConnection.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        console.log('⏳ Testing backend connection...');
      })
      // When the test succeeds
      .addCase(testBackendConnection.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
        state.lastTestTime = new Date().toISOString();
        console.log(' Backend test successful!');
      })
      // When the test fails
      .addCase(testBackendConnection.rejected, (state, action) => {
        state.isLoading = false;
        state.data = null;
        state.error = action.payload || { message: 'Unknown error occurred' };
        console.log(' Backend test failed:', state.error);
      });
  },
});

// Export the reducer and actions
export const { clearTestResults } = apiSlice.actions;
export default apiSlice.reducer;