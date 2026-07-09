# Project Name: Finwise - Personal Finance Management System

A comprehensive personal finance management platform that enables users to track income/expenses, set budgets, generate financial insights, and achieve their financial goals through data-driven decision making.

# Finwise - Frontend Foundation

##  What Is This?

** Child Explanation:**
This is the visible part of Finwise - the part you see on your screen. Right now, it's like a storefront window that shows a sign saying "We're open!" and a button to check if the back room (backend) is working.

** Technical Explanation:**
This is the React frontend for the Finwise Expense Tracker application. In this foundation phase, it includes:
- Vite build tooling
- React 19.3.0+ with functional components
- Tailwind CSS for styling
- Redux Toolkit 2.5.0+ for state management
- Axios for HTTP requests
- A single test page to verify backend connectivity



##  Quick Start

### Prerequisites
- Node.js 22 LTS or higher
- npm or yarn package manager

### Installation

1. Clone the repository:

git clone https://github.com/yourusername/finwise-frontend.git
cd finwise-frontend

2. Install dependencies: npm install

3. Set up environment variables: cp .env.example .env or copy .env.example .env
Then edit .env and update VITE_API_URL to point to your backend.

4. Start the development server: npm run dev

5. Open your browser to http://localhost:5173

###  Folder Structure

frontend/
├── public/              # Static assets (favicon, images)
├── src/
│   ├── components/      # React components (none in foundation phase)
│   ├── pages/           # Page components (none in foundation phase)
│   ├── store/
│   │   ├── store.js     # Redux store configuration
│   │   └── apiSlice.js  # API-related Redux slice
│   ├── utils/
│   │   └── axiosConfig.js # Axios instance with interceptors
│   ├── App.jsx          # Main React component
│   ├── main.jsx         # Entry point with Redux Provider
│   └── index.css        # Global styles with Tailwind
├── .env                 # Environment variables
├── .env.example         # Environment variables template
├── .gitignore           # Git ignore file
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── vite.config.js       # Vite configuration
└── README.md            # This file

### Testing the Backend Connection
1. Start the backend server (see backend README for instructions)

2. Start the frontend with npm run dev

3. Open your browser to http://localhost:5173

4. Click the "Test Backend Connection" button

5. Open browser console (F12 → Console) to see detailed logs

### Expected Success Response:
{
  "success": true,
  "message": "✅ API connection successful!",
  "data": {
    "backendStatus": "healthy",
    "timestamp": "2026-06-13T12:00:00.000Z",
    "version": "1.0.0"
  }
}

### Expected Error (if backend is offline):
Error: Network error - please check if the backend is running


### Tailwind CSS
This project uses Tailwind CSS 4.2.1+ with the new Vite plugin integration.

#### Verification:

- vite.config.js includes tailwindcss() in plugins

- src/index.css starts with @import 'tailwindcss'

- The App component uses Tailwind classes like bg-blue-600, text-white, etc.

### Troubleshooting

#### "Cannot connect to backend"

- Ensure the backend server is running on port 5000

- Check that VITE_API_URL in .env matches your backend URL

- Check browser console for CORS errors

#### "Tailwind styles not applying"

- Ensure src/index.css has @import 'tailwindcss' at the top

- Run npm run build and check if styles are present

#### "Module not found" errors

- Run npm install to ensure all dependencies are installed

- Check package.json for required dependencies

### Related Repositories
- [Finwise Backend](https://github.com/your-username/finwise-backend) - Backend API server

 License
MIT License - see LICENSE file for details