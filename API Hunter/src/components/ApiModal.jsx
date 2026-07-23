import { useState } from 'react';
import './ApiModal.css';

function ApiModal({ api, onClose }) {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const testApi = async () => {
    setLoading(true);
    setError(null);
    setResponse(null);
    try {
      const res = await fetch(api.url);
      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>X</button>
        <div className="modal-header">
          <h2>{api.name}</h2>
          <span className="modal-category">{api.category}</span>
        </div>
        <p className="modal-desc">{api.description}</p>
        <div className="modal-info">
          <div className="info-row">
            <span className="info-label">URL</span>
            <code className="info-value">{api.url}</code>
          </div>
          <div className="info-row">
            <span className="info-label">Auth</span>
            <span className="info-value">{api.auth}</span>
          </div>
          <div className="info-row">
            <span className="info-label">CORS</span>
            <span className="info-value">{api.cors}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Pricing</span>
            <span className="info-value">{api.pricing}</span>
          </div>
        </div>
        <div className="modal-actions">
          <button className="btn btn-primary" onClick={testApi} disabled={loading}>
            {loading ? 'Testing...' : 'Test API'}
          </button>
          <a href={api.docs} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
            View Docs
          </a>
        </div>
        {error && <div className="modal-error">Error: {error}</div>}
        {response && (
          <div className="modal-response">
            <h4>Response:</h4>
            <pre>{response}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default ApiModal;
