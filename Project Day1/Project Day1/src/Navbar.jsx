import React from 'react';

function Navbar () {
  return (
    <nav style={{ padding: '1rem', background: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>← BACK TO ALL PLANTS</span>
      <span style={{ float: 'right' }}>♡</span>
    </nav>
  );
};

export default Navbar;
