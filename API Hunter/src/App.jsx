import { useState, useEffect, useMemo } from 'react';
import apis, { categories } from './data/apis.js';
import Header from './components/Header.jsx';
import SearchBar from './components/SearchBar.jsx';
import CategoryFilter from './components/CategoryFilter.jsx';
import ApiCard from './components/ApiCard.jsx';
import ApiModal from './components/ApiModal.jsx';
import StatsBar from './components/StatsBar.jsx';
import TestConsole from './components/TestConsole.jsx';
import './App.css';

function App() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedApi, setSelectedApi] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('api-hunter-favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    localStorage.setItem('api-hunter-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const filteredApis = useMemo(() => {
    return apis.filter(api => {
      const matchesSearch = api.name.toLowerCase().includes(search.toLowerCase()) ||
        api.description.toLowerCase().includes(search.toLowerCase()) ||
        api.category.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = activeCategory === 'All' || api.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  const toggleFavorite = (apiId) => {
    setFavorites(prev =>
      prev.includes(apiId)
        ? prev.filter(id => id !== apiId)
        : [...prev, apiId]
    );
  };

  const openApi = (api) => setSelectedApi(api);
  const closeApi = () => setSelectedApi(null);

  return (
    <div className={`app ${darkMode ? 'dark' : 'light'}`}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className="main-content">
        <StatsBar apis={apis} favorites={favorites} />
        <SearchBar search={search} setSearch={setSearch} />
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
        <div className="apis-grid">
          {filteredApis.length > 0 ? (
            filteredApis.map(api => (
              <ApiCard
                key={api.id}
                api={api}
                isFavorite={favorites.includes(api.id)}
                toggleFavorite={toggleFavorite}
                openApi={openApi}
              />
            ))
          ) : (
            <div className="no-results">
              <span className="no-results-icon">🔍</span>
              <h3>No APIs Found</h3>
              <p>Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </main>
      {selectedApi && (
        <ApiModal api={selectedApi} onClose={closeApi} />
      )}
      <TestConsole />
    </div>
  );
}

export default App;

