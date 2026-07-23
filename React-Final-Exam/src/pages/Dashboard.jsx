import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';

export default function Dashboard() {
  const { products, getStats } = useProducts();
  const { totalProducts, totalStock, avgPrice, categories } = getStats();

  const lowStockProducts = products.filter((p) => p.stock < 10);

  return (
    <div className="dashboard">
      <div className="container">
        <h1>📊 Dashboard</h1>
        <p className="dashboard-subtitle">Overview of your product inventory</p>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📦</div>
            <div className="stat-number">{totalProducts}</div>
            <div className="stat-label">Total Products</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-number">{totalStock}</div>
            <div className="stat-label">Total Stock</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">💰</div>
            <div className="stat-number">${avgPrice}</div>
            <div className="stat-label">Average Price</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🏷️</div>
            <div className="stat-number">{categories.length}</div>
            <div className="stat-label">Categories</div>
          </div>
        </div>

        {lowStockProducts.length > 0 && (
          <div className="card" style={{ marginBottom: '32px' }}>
            <h2 style={{ color: '#e53e3e', marginBottom: '16px' }}>
              ⚠️ Low Stock Alert ({lowStockProducts.length})
            </h2>
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Stock</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {lowStockProducts.map((product) => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td style={{ color: '#e53e3e', fontWeight: 600 }}>{product.stock}</td>
                    <td>
                      <Link
                        to={`/products/edit/${product.id}`}
                        className="btn btn-warning btn-sm"
                      >
                        Restock
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="card">
          <div className="page-header">
            <h2>Recent Products</h2>
            <Link to="/products" className="btn btn-primary">
              View All
            </Link>
          </div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
              </tr>
            </thead>
            <tbody>
              {products.slice(0, 5).map((product) => (
                <tr key={product.id}>
                  <td>
                    <Link
                      to={`/products/${product.id}`}
                      style={{ color: '#667eea', textDecoration: 'none', fontWeight: 600 }}
                    >
                      {product.name}
                    </Link>
                  </td>
                  <td>{product.category}</td>
                  <td>${product.price.toFixed(2)}</td>
                  <td>{product.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

