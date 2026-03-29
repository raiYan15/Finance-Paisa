import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: 'var(--card-color)',
          color: 'var(--text-primary)',
          border: '1px solid var(--border-color)',
          borderRadius: '0px',
          fontSize: '14px',
          fontFamily: 'Plus Jakarta Sans, system-ui, sans-serif',
        },
        success: { iconTheme: { primary: '#22C55E', secondary: '#111827' } },
        error: { iconTheme: { primary: '#EF4444', secondary: '#111827' } },
      }}
    />
  </React.StrictMode>,
)
