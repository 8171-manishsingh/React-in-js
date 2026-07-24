import React, { useState, useEffect } from 'react';
import DataTable from './components/DataTable';
import users from './data';

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate API fetch
    const fetchData = () => {
      try {
        setLoading(true);
        // Simulate network delay
        setTimeout(() => {
          setData(users);
          setLoading(false);
        }, 500);
      } catch (err) {
        setError('Failed to load data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="app">
        <h1>User Management</h1>
        <div className="loading">Loading data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app">
        <h1>User Management</h1>
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="app">
      <h1>User Management</h1>
      <DataTable data={data} />
    </div>
  );
};

export default App;

