import React, { useState, useEffect } from 'react';
import './App.css';
import HealthCheck from './components/HealthCheck';
import Login from './components/Login';
import Users from './components/Users';

function App() {
  const [connectionStatus, setConnectionStatus] = useState('checking');

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const res = await fetch('https://ims-server-one.vercel.app/api/health', {
          method: 'GET',
          credentials: 'include',
        });
        setConnectionStatus(res.ok ? 'connected' : 'error');
      } catch (error) {
        setConnectionStatus('error');
      }
    };

    checkConnection();
  }, []);

  const getStatusColor = () => {
    switch (connectionStatus) {
      case 'connected':
        return '#4caf50';
      case 'error':
        return '#f44336';
      default:
        return '#ff9800';
    }
  };

  const getStatusText = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'Connected to Backend';
      case 'error':
        return 'Connection Error';
      default:
        return 'Checking Connection...';
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <header style={{ backgroundColor: '#282c34', padding: '20px', color: 'white', textAlign: 'center' }}>
        <h1>IMS API Test Dashboard</h1>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          gap: '10px',
          marginTop: '10px'
        }}>
          <div style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: getStatusColor(),
            animation: connectionStatus === 'checking' ? 'pulse 2s infinite' : 'none'
          }}></div>
          <span style={{ fontSize: '14px' }}>{getStatusText()}</span>
        </div>
      </header>
      <main style={{ flex: 1, padding: '20px' }}>
        <h2>API Endpoints</h2>
        <HealthCheck />
        <Login />
        <Users />
        {/* Additional API endpoint testers will go here */}
      </main>
      <footer style={{ backgroundColor: '#282c34', padding: '10px', color: 'white', textAlign: 'center', marginTop: 'auto' }}>
        <p>© 2025 IMS Development Team</p>
      </footer>
      <style>
        {`
          @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 1; }
          }
        `}
      </style>
    </div>
  );
}

export default App;
