import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';

const categoryIcons = {
  Electronics: '🔌',
  Sports: '⚽',
  'Home & Kitchen': '🏠',
};

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById, deleteProduct } = useProducts();
  const product = getProductById(Number(id));

  if (!product) {
    return (
      <div className="not-found">
        <h1>404</h1>
        <p>Product not found</p>
        <Link to="/products" className="btn btn-primary">
          Back to Products
        </Link>
      </div>
    );
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(product.id);
      navigate('/products');
    }
  };

  const icon = categoryIcons[product.category] || '📦';
  const createdDate = new Date(product.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="container">
      <div className="detail-container">
        <div className="detail-image">{icon}</div>
        <div className="detail-info">
          <h1>{product.name}</h1>
          <div className="detail-meta">
            <span className="detail-category">{product.category}</span>
          </div>
          <div className="detail-price">${product.price.toFixed(2)}</div>
          <div className="detail-stock">
            {product.stock > 0 ? `📦 In Stock: ${product.stock} units` : '❌ Out of Stock'}
          </div>
          <p className="detail-description">{product.description}</p>
          <p style={{ color: '#a0aec0', fontSize: '14px', marginBottom: '24px' }}>
            Added on: {createdDate}
          </p>
          <div className="detail-actions">
            <Link to={`/products/edit/${product.id}`} className="btn btn-warning">
              ✏️ Edit Product
            </Link>
            <button className="btn btn-danger" onClick={handleDelete}>
              🗑️ Delete Product
            </button>
            <Link to="/products" className="btn" style={{ background: '#e2e8f0', color: '#4a5568' }}>
              ← Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

