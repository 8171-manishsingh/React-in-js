import './CategoryFilter.css';

function CategoryFilter({ categories, activeCategory, setActiveCategory }) {
  return (
    <div className="category-filter">
      {categories.map(cat => (
        <button
          key={cat}
          className={`category-btn ${activeCategory === cat ? 'active' : ''}`}
          onClick={() => setActiveCategory(cat)}
        >
          {cat === 'All' ? '🏠' : ''}{cat}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
