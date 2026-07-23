import './Header.css';

function Header({ darkMode, setDarkMode }) {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <div className="logo">
            <span className="logo-icon">🎯</span>
            <h1 className="logo-text">API Hunter</h1>
          </div>
          <p className="header-subtitle">Discover & Test Free APIs</p>
        </div>
        <div className="header-right">
          <button
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;

