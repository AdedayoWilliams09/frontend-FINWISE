// FILE: finwise/frontend/src/store/store.js
// LINE: Entire file

//  Child Explanation:
// This is the main filing cabinet that holds all the drawers (slices).

//  Technical Explanation:
// The store combines all slices into one global state container.
// It's configured with Redux DevTools for debugging.

import { configureStore } from '@reduxjs/toolkit';
import apiReducer from './apiSlice';

//  Child Explanation:
// We create the store and add our API drawer to it.

//  Technical Explanation:
// configureStore creates the Redux store with:
// - Reducers for each slice
// - DevTools integration automatically
// - Middleware (thunk) included by default
export const store = configureStore({
  reducer: {
    api: apiReducer,
  },
  // Enable Redux DevTools in development
  devTools: process.env.NODE_ENV !== 'production',
});

// Export types for use in components
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;