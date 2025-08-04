import React from 'react';
import './App.css';
import HealthCheck from './components/HealthCheck';
import Login from './components/Login';
import Users from './components/Users';

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <header style={{ backgroundColor: '#282c34', padding: '20px', color: 'white', textAlign: 'center' }}>
        <h1>IMS API Test Dashboard</h1>
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
      </div>
  );
}

export default App;
