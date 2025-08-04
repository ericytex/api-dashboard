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
      const res = await fetch('https://ims-server-r41toft9x-ericytexs-projects.vercel.app/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
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
    <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '5px', marginBottom: '20px' }}>
      <h3>/api/login</h3>
      <p>Authenticates a user and returns a JWT token.</p>
      <form onSubmit={performLogin}>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '300px', padding: '5px' }}
            required
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '300px', padding: '5px' }}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Perform Login'}
        </button>
      </form>

      {response && (
        <div style={{ marginTop: '15px' }}>
          <h4>Response:</h4>
          <pre style={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '5px', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
            {JSON.stringify(response, null, 2)}
          </pre>
        </div>
      )}

      {error && (
        <div style={{ marginTop: '15px', color: 'red' }}>
          <h4>Error:</h4>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default Login; 