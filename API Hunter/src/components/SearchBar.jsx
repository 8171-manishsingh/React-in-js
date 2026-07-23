import './SearchBar.css';

function SearchBar({ search, setSearch }) {
  return (
    <div className="search-container">
      <div className="search-wrapper">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="search-input"
          placeholder="Search APIs by name, description, or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && (
          <button className="search-clear" onClick={() => setSearch('')}>
            ✕
          </button>
        )}
      </div>
    </div>
  );
}

export default SearchBar;

