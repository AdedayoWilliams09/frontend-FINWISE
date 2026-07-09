// FILE: finwise/frontend/src/main.jsx
// LINE: Entire file replaced

// 🧒 Child Explanation:
// This file starts our React app and connects our filing cabinet (Redux).

// 👨‍💻 Technical Explanation:
// main.jsx is the entry point that:
// 1. Renders the React application into the DOM
// 2. Provides the Redux store to all components
// 3. Applies global CSS styles

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import App from './App';
import './index.css';

//  Child Explanation:
// Find the element with id "root" in index.html and put our app there.
// Connect the filing cabinet (Redux) so everyone can use it.

//  Technical Explanation:
// ReactDOM.createRoot creates a React root for the DOM.
// Provider makes the Redux store available to all components.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);