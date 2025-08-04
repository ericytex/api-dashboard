import React, { useState, useEffect } from 'react';
import './App.css';
import HealthCheck from './components/HealthCheck';
import Login from './components/Login';
import Users from './components/Users';

function App() {
  const [connectionStatus, setConnectionStatus] = useState('checking');
  const [activeTab, setActiveTab] = useState('health');

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
        return '#10b981';
      case 'error':
        return '#ef4444';
      default:
        return '#f59e0b';
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

  const tabs = [
    { id: 'health', label: 'Health Check', icon: '🏥' },
    { id: 'auth', label: 'Authentication', icon: '🔐' },
    { id: 'users', label: 'User Management', icon: '👥' }
  ];

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo-section">
            <div className="logo">
              <span className="logo-icon">🚀</span>
              <h1>IMS API Dashboard</h1>
            </div>
            <p className="subtitle">Inventory Management System API Testing Interface</p>
          </div>
          
          <div className="status-indicator">
            <div className="status-dot" style={{ backgroundColor: getStatusColor() }}></div>
            <span className="status-text">{getStatusText()}</span>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="nav-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* Main Content */}
      <main className="main-content">
        <div className="content-wrapper">
          {activeTab === 'health' && (
            <div className="tab-content">
              <div className="section-header">
                <h2>🏥 Health Check</h2>
                <p>Monitor the backend server health and connectivity status</p>
              </div>
              <HealthCheck />
            </div>
          )}
          
          {activeTab === 'auth' && (
            <div className="tab-content">
              <div className="section-header">
                <h2>🔐 Authentication</h2>
                <p>Test user authentication and JWT token generation</p>
              </div>
              <Login />
            </div>
          )}
          
          {activeTab === 'users' && (
            <div className="tab-content">
              <div className="section-header">
                <h2>👥 User Management</h2>
                <p>Access user data and test protected endpoints</p>
              </div>
              <Users />
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p>© 2025 IMS Development Team | Built with React & Vite</p>
          <div className="footer-links">
            <span>Backend: ims-server-one.vercel.app</span>
            <span>Version: 1.0.0</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
