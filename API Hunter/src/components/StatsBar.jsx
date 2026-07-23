import './StatsBar.css';

function StatsBar({ apis, favorites }) {
  const categories = [...new Set(apis.map(a => a.category))];
  const freeApis = apis.filter(a => a.pricing === 'Free').length;
  return (
    <div className="stats-bar">
      <div className="stat">
        <span className="stat-number">{apis.length}</span>
        <span className="stat-label">Total APIs</span>
      </div>
      <div className="stat">
        <span className="stat-number">{categories.length}</span>
        <span className="stat-label">Categories</span>
      </div>
      <div className="stat">
        <span className="stat-number">{freeApis}</span>
        <span className="stat-label">Free APIs</span>
      </div>
      <div className="stat">
        <span className="stat-number">{favorites.length}</span>
        <span className="stat-label">Favorites</span>
      </div>
    </div>
  );
}

export default StatsBar;
