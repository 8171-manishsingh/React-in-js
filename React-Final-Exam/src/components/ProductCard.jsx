import { Link } from 'react-router-dom';

const categoryIcons = {
  Electronics: '🔌',
  Sports: '⚽',
  'Home & Kitchen': '🏠',
};

export default function ProductCard({ product, onDelete }) {
  const icon = categoryIcons[product.category] || '📦';

  return (
    <div className="product-card">
      <div className="product-card-image">{icon}</div>
      <div className="product-card-body">
        <h3 className="product-card-title">{product.name}</h3>
        <span className="product-card-category">{product.category}</span>
        <div className="product-card-price">${product.price.toFixed(2)}</div>
        <div className="product-card-stock">
          {product.stock > 0 ? `In Stock: ${product.stock}` : 'Out of Stock'}
        </div>
        <p className="product-card-description">{product.description}</p>
        <div className="product-card-actions">
          <Link to={`/products/${product.id}`} className="btn btn-primary btn-sm">
            View
          </Link>
          <Link to={`/products/edit/${product.id}`} className="btn btn-warning btn-sm">
            Edit
          </Link>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => onDelete(product.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

