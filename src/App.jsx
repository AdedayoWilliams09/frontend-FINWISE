// FILE: finwise/frontend/src/App.jsx
// LINE: Entire file replaced

//  Child Explanation:
// This is the main screen of our application.
// We'll build more pages later, but for now we just test
// if the frontend can talk to the backend.

//  Technical Explanation:
// App is the root React component.
// It demonstrates:
// 1. Redux integration with useDispatch and useSelector
// 2. Async thunk action dispatch
// 3. Loading, success, and error states
// 4. Tailwind CSS styling

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { testBackendConnection, clearTestResults } from './store/apiSlice';

function App() {
  //  Child Explanation:
  // This is how we send messages to our filing cabinet (Redux).
  // We ask it to do things and we ask it for information.
  
  //  Technical Explanation:
  // useDispatch returns the dispatch function to send actions to Redux.
  // useSelector subscribes to changes in the Redux store state.
  const dispatch = useDispatch();
  
  // Get state from the Redux store
  const { isLoading, data, error, lastTestTime } = useSelector((state) => state.api);

  // Local state for the button click count (just for demo)
  const [clickCount, setClickCount] = useState(0);

  //  Child Explanation:
  // This function runs when you click the "Test Backend" button.
  
  //  Technical Explanation:
  // Handles the test button click - dispatches the async thunk
  // and updates local state for demonstration.
  const handleTestBackend = () => {
    setClickCount(clickCount + 1);
    console.log(`🔘 Test button clicked (${clickCount + 1})`);
    dispatch(testBackendConnection());
  };

  //  Child Explanation:
  // This function clears the test results from the screen.
  const handleClearResults = () => {
    dispatch(clearTestResults());
    console.log('🧹 Test results cleared');
  };

  return (
    //  Child Explanation:
    // These className classes are Tailwind CSS.
    // They make things look nice without writing custom CSS.
    
    //  Technical Explanation:
    // Tailwind utility classes applied directly to elements.
    // The `dark:` variant handles dark mode styling.
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4 transition-colors duration-200">
      <div className="max-w-2xl w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 transition-colors duration-200">
        {/* ── Header Section ── */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Finwise
            <span className="text-blue-600 dark:text-blue-400 ml-2">
              Expense Tracker
            </span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm md:text-base">
            Foundation Phase — Backend Connection Test
          </p>
          <div className="mt-1 h-0.5 w-20 mx-auto bg-gradient-to-r from-blue-500 to-purple-500"></div>
        </div>

        {/* ── Status Section ── */}
        <div className="space-y-4 mb-8">
          {/* Loading State */}
          {isLoading && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-center">
              <div className="flex items-center justify-center gap-3">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600 dark:border-blue-400"></div>
                <span className="text-blue-700 dark:text-blue-300 font-medium">
                  ⏳ Testing connection to backend...
                </span>
              </div>
            </div>
          )}

          {/* Success State */}
          {!isLoading && data && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <span className="text-green-600 dark:text-green-400 text-xl">✅</span>
                <div className="flex-1">
                  <p className="text-green-700 dark:text-green-300 font-medium">
                    Backend is healthy!
                  </p>
                  <p className="text-green-600 dark:text-green-400 text-sm mt-1">
                    {data.message || 'API connection successful'}
                  </p>
                  {data.data && (
                    <div className="mt-2 bg-green-100 dark:bg-green-900/30 rounded-md p-3 text-xs font-mono text-green-800 dark:text-green-300 overflow-x-auto">
                      <pre className="whitespace-pre-wrap break-all">
                        {JSON.stringify(data.data, null, 2)}
                      </pre>
                    </div>
                  )}
                  {lastTestTime && (
                    <p className="text-xs text-green-500 dark:text-green-400 mt-2">
                      Last tested: {new Date(lastTestTime).toLocaleString()}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Error State */}
          {!isLoading && error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <span className="text-red-600 dark:text-red-400 text-xl">❌</span>
                <div className="flex-1">
                  <p className="text-red-700 dark:text-red-300 font-medium">
                    Connection Failed
                  </p>
                  <p className="text-red-600 dark:text-red-400 text-sm mt-1">
                    {error.message || 'Could not connect to backend'}
                  </p>
                  {error.code && (
                    <p className="text-red-500 dark:text-red-400 text-xs mt-1">
                      Error code: {error.code}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Empty State - No test performed yet */}
          {!isLoading && !data && !error && (
            <div className="bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-lg p-6 text-center">
              <div className="text-4xl mb-2">🚀</div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Click the button below to test the backend connection
              </p>
            </div>
          )}
        </div>

        {/* ── Buttons Section ── */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={handleTestBackend}
            disabled={isLoading}
            className="
              min-h-[44px] min-w-[44px] px-6 py-2.5
              bg-blue-600 hover:bg-blue-700 
              dark:bg-blue-500 dark:hover:bg-blue-600
              text-white font-medium rounded-lg
              transition-all duration-200
              disabled:opacity-50 disabled:cursor-not-allowed
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              dark:focus:ring-offset-gray-800
              flex items-center justify-center gap-2
            "
          >
            {isLoading ? (
              <>
                <span className="animate-spin inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                Testing...
              </>
            ) : (
              '🔗 Test Backend Connection'
            )}
          </button>

          <button
            onClick={handleClearResults}
            disabled={!data && !error}
            className="
              min-h-[44px] min-w-[44px] px-6 py-2.5
              bg-gray-200 hover:bg-gray-300
              dark:bg-gray-700 dark:hover:bg-gray-600
              text-gray-800 dark:text-gray-200 font-medium rounded-lg
              transition-all duration-200
              disabled:opacity-40 disabled:cursor-not-allowed
              focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2
              dark:focus:ring-offset-gray-800
            "
          >
            🧹 Clear Results
          </button>
        </div>

        {/* ── Console Instructions ── */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            📱 Open your browser console (F12 → Console) to see detailed logs
          </p>
          <div className="mt-2 flex justify-center gap-4 text-xs text-gray-400 dark:text-gray-500">
            <span>Backend: {import.meta.env.VITE_API_URL || 'http://localhost:5000'}</span>
            <span>•</span>
            <span>Click count: {clickCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;