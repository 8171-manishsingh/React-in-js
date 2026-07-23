import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';

export default function AddProduct() {
  const navigate = useNavigate();
  const { addProduct } = useProducts();
  const [formData, setFormData] = useState({
    name: '',
    category: 'Electronics',
    price: '',
    stock: '',
    description: '',
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.price || isNaN(formData.price) || Number(formData.price) <= 0)
      newErrors.price = 'Valid price is required';
    if (!formData.stock || isNaN(formData.stock) || Number(formData.stock) < 0)
      newErrors.stock = 'Valid stock quantity is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    addProduct({
      name: formData.name.trim(),
      category: formData.category,
      price: Number(formData.price),
      stock: Number(formData.stock),
      description: formData.description.trim(),
    });

    navigate('/products');
  };

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <div className="form-container">
        <h1 className="form-title">➕ Add New Product</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Product Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
            />
            {errors.name && <span style={{ color: '#e53e3e', fontSize: '13px' }}>{errors.name}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="Electronics">Electronics</option>
                <option value="Sports">Sports</option>
                <option value="Home & Kitchen">Home & Kitchen</option>
                <option value="Clothing">Clothing</option>
                <option value="Books">Books</option>
                <option value="Other">Other</option>
              </select>
              {errors.category && <span style={{ color: '#e53e3e', fontSize: '13px' }}>{errors.category}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="price">Price ($)</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="0.00"
                step="0.01"
                min="0"
              />
              {errors.price && <span style={{ color: '#e53e3e', fontSize: '13px' }}>{errors.price}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="stock">Stock Quantity</label>
              <input
                type="number"
                id="stock"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                placeholder="0"
                min="0"
              />
              {errors.stock && <span style={{ color: '#e53e3e', fontSize: '13px' }}>{errors.stock}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter product description"
            />
            {errors.description && <span style={{ color: '#e53e3e', fontSize: '13px' }}>{errors.description}</span>}
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
            <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
              Add Product
            </button>
            <Link to="/products" className="btn" style={{ background: '#e2e8f0', color: '#4a5568', flex: 1, textAlign: 'center' }}>
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

