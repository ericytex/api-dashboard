import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('admin@ims.com');
  const [password, setPassword] = useState('admin123');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const performLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);
    setError(null);

    try {
      const res = await fetch('https://ims-server-one.vercel.app/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || `HTTP error! status: ${res.status}`);
      }
      setResponse(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="card-header">
          <div className="endpoint-info">
            <h3>🔐 Authentication Endpoint</h3>
            <p>Test user authentication and JWT token generation</p>
            <div className="endpoint-url">
              <span className="method">POST</span>
              <code>/api/login</code>
            </div>
          </div>
        </div>

        <div className="card-body">
          <form onSubmit={performLogin} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                placeholder="Enter your email"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                placeholder="Enter your password"
                required
              />
            </div>
            
            <button type="submit" disabled={loading} className="action-button">
              {loading ? (
                <>
                  <span className="loading-spinner"></span>
                  Authenticating...
                </>
              ) : (
                <>
                  <span className="button-icon">🔐</span>
                  Authenticate User
                </>
              )}
            </button>
          </form>

          {response && (
            <div className="response-section success">
              <div className="response-header">
                <span className="status-icon">✅</span>
                <h4>Authentication Successful</h4>
              </div>
              <div className="response-content">
                <div className="token-info">
                  <h5>JWT Token:</h5>
                  <code className="token-display">{response.token}</code>
                </div>
                <div className="user-info">
                  <h5>User Details:</h5>
                  <pre>{JSON.stringify(response.user, null, 2)}</pre>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="response-section error">
              <div className="response-header">
                <span className="status-icon">❌</span>
                <h4>Authentication Failed</h4>
              </div>
              <div className="response-content">
                <p className="error-message">{error}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login; 