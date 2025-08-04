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
      <h3>/api/users (Protected)</h3>
      <p>Fetches a list of users. Requires a valid JWT token.</p>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>JWT Token:</label>
        <input
          type="text"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Paste JWT token here"
          style={{ width: '100%', padding: '5px', boxSizing: 'border-box' }}
        />
      </div>
      <button onClick={fetchUsers} disabled={loading}>
        {loading ? 'Fetching Users...' : 'Fetch Users'}
      </button>

      {response && (
        <div style={{ marginTop: '15px' }}>
          <h4>Response:</h4>
          <pre style={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '5px' }}>
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

export default Users; 