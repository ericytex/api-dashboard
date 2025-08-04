import React, { useState } from 'react';

const HealthCheck = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const performHealthCheck = async () => {
    setLoading(true);
    setResponse(null);
    setError(null);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const res = await fetch('https://ims-server-one.vercel.app/api/health', {
        method: 'GET',
        credentials: 'include',
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setResponse(data);
    } catch (e) {
      if (e.name === 'AbortError') {
        setError('Request timed out. Please try again.');
      } else {
        setError(e.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="health-check-container">
      <div className="health-card">
        <div className="card-header">
          <div className="endpoint-info">
            <h3>🔍 Health Check Endpoint</h3>
            <p>Monitor the backend server health and connectivity status</p>
            <div className="endpoint-url">
              <span className="method">GET</span>
              <code>/api/health</code>
            </div>
          </div>
        </div>

        <div className="card-body">
          <button 
            onClick={performHealthCheck} 
            disabled={loading}
            className="action-button"
          >
            {loading ? (
              <>
                <span className="loading-spinner"></span>
                Checking Health...
              </>
            ) : (
              <>
                <span className="button-icon">🏥</span>
                Perform Health Check
              </>
            )}
          </button>

          {response && (
            <div className="response-section success">
              <div className="response-header">
                <span className="status-icon">✅</span>
                <h4>Success Response</h4>
              </div>
              <div className="response-content">
                <pre>{JSON.stringify(response, null, 2)}</pre>
              </div>
            </div>
          )}

          {error && (
            <div className="response-section error">
              <div className="response-header">
                <span className="status-icon">❌</span>
                <h4>Error Response</h4>
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

export default HealthCheck; 