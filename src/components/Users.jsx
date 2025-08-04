import React, { useState } from 'react';

const Users = () => {
  const [token, setToken] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    if (!token) {
      setError('Please provide a JWT token.');
      return;
    }
    setLoading(true);
    setResponse(null);
    setError(null);

    try {
      const res = await fetch('https://ims-server-one.vercel.app/api/users', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
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
    <div className="users-container">
      <div className="users-card">
        <div className="card-header">
          <div className="endpoint-info">
            <h3>👥 User Management Endpoint</h3>
            <p>Access user data and test protected endpoints</p>
            <div className="endpoint-url">
              <span className="method">GET</span>
              <code>/api/users</code>
            </div>
          </div>
        </div>

        <div className="card-body">
          <div className="token-section">
            <div className="form-group">
              <label htmlFor="token">JWT Token</label>
              <input
                id="token"
                type="text"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="form-input"
                placeholder="Paste your JWT token here"
              />
              <small className="help-text">
                Use the token from the Authentication tab after successful login
              </small>
            </div>
            
            <button onClick={fetchUsers} disabled={loading || !token} className="action-button">
              {loading ? (
                <>
                  <span className="loading-spinner"></span>
                  Fetching Users...
                </>
              ) : (
                <>
                  <span className="button-icon">👥</span>
                  Fetch Users
                </>
              )}
            </button>
          </div>

          {response && (
            <div className="response-section success">
              <div className="response-header">
                <span className="status-icon">✅</span>
                <h4>Users Retrieved Successfully</h4>
                <span className="user-count">{response.length} users found</span>
              </div>
              <div className="response-content">
                <div className="users-table">
                  <table>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Created</th>
                      </tr>
                    </thead>
                    <tbody>
                      {response.map((user, index) => (
                        <tr key={user.id || index}>
                          <td>{user.id}</td>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>
                            <span className={`role-badge role-${user.role}`}>
                              {user.role}
                            </span>
                          </td>
                          <td>{new Date(user.created_at).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <details className="raw-data">
                  <summary>View Raw JSON Response</summary>
                  <pre>{JSON.stringify(response, null, 2)}</pre>
                </details>
              </div>
            </div>
          )}

          {error && (
            <div className="response-section error">
              <div className="response-header">
                <span className="status-icon">❌</span>
                <h4>Failed to Fetch Users</h4>
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

export default Users; 