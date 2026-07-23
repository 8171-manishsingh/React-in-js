import { useState } from 'react';
import apis from '../data/apis.js';

function TestConsole() {
  const [selectedApiId, setSelectedApiId] = useState(apis[0]?.id || null);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const selectedApi = apis.find(a => a.id === selectedApiId);

  const testApi = async () => {
    if (!selectedApi) return;
    setLoading(true);
    setError(null);
    setResponse(null);
    try {
      const res = await fetch(selectedApi.url);
      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  if (!isOpen) {
    return (
      <button className="console-toggle" onClick={() => setIsOpen(true)} title="Open API Console">
        🧪 Console
      </button>
    );
  }

  return (
    <div className="test-console">
      <div className="console-header">
        <h3>🧪 API Test Console</h3>
        <button className="console-close" onClick={() => setIsOpen(false)}>✕</button>
      </div>
      <div className="console-body">
        <select
          className="console-select"
          value={selectedApiId}
          onChange={e => setSelectedApiId(Number(e.target.value))}
        >
          {apis.map(api => (
            <option key={api.id} value={api.id}>{api.name}</option>
          ))}
        </select>
        <button className="btn btn-primary console-test-btn" onClick={testApi} disabled={loading}>
          {loading ? '⏳ Testing...' : '🚀 Send Request'}
        </button>
        {error && <div className="console-error">❌ Error: {error}</div>}
        {response && (
          <div className="console-response">
            <h4>Response:</h4>
            <pre>{response}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default TestConsole;

