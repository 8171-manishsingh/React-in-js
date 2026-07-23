import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';

export default function ProductList() {
  const { products, deleteProduct } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const categories = [...new Set(products.map((p) => p.category))];

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory = !categoryFilter || product.category === categoryFilter;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'stock':
          return a.stock - b.stock;
        default:
          return 0;
      }
    });

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
    }
  };

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <div className="page-header">
        <h1>📦 Products</h1>
        <Link to="/products/add" className="btn btn-primary">
          + Add Product
        </Link>
      </div>

      <div
        className="card"
        style={{ marginBottom: '24px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}
      >
        <div style={{ flex: 1, minWidth: '200px' }}>
          <label style={{ display: 'block', marginBottom: '4px', fontWeight: 600, fontSize: '13px' }}>
            Search
          </label>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '2px solid #e2e8f0',
              borderRadius: '8px',
              fontSize: '14px',
            }}
          />
        </div>
        <div style={{ minWidth: '150px' }}>
          <label style={{ display: 'block', marginBottom: '4px', fontWeight: 600, fontSize: '13px' }}>
            Category
          </label>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '2px solid #e2e8f0',
              borderRadius: '8px',
              fontSize: '14px',
            }}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div style={{ minWidth: '150px' }}>
          <label style={{ display: 'block', marginBottom: '4px', fontWeight: 600, fontSize: '13px' }}>
            Sort By
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '2px solid #e2e8f0',
              borderRadius: '8px',
              fontSize: '14px',
            }}
          >
            <option value="name">Name</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="stock">Stock</option>
          </select>
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onDelete={handleDelete} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-state-icon">🔍</div>
          <h3>No products found</h3>
          <p>Try adjusting your search or filter criteria</p>
          {searchTerm || categoryFilter ? (
            <button
              className="btn btn-primary"
              onClick={() => {
                setSearchTerm('');
                setCategoryFilter('');
              }}
            >
              Clear Filters
            </button>
          ) : (
            <Link to="/products/add" className="btn btn-primary">
              Add your first product
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

