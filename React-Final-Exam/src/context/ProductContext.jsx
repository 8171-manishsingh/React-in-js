import { createContext, useContext, useState, useCallback } from 'react';

const ProductContext = createContext();

const initialProducts = [
  {
    id: 1,
    name: 'Wireless Headphones',
    category: 'Electronics',
    price: 79.99,
    stock: 45,
    description: 'Premium wireless headphones with noise cancellation technology, 30-hour battery life, and comfortable over-ear design.',
    createdAt: new Date('2024-01-15').toISOString(),
  },
  {
    id: 2,
    name: 'Running Shoes',
    category: 'Sports',
    price: 129.99,
    stock: 32,
    description: 'Lightweight running shoes with responsive cushioning and breathable mesh upper for maximum performance.',
    createdAt: new Date('2024-02-20').toISOString(),
  },
  {
    id: 3,
    name: 'Coffee Maker',
    category: 'Home & Kitchen',
    price: 49.99,
    stock: 28,
    description: 'Programmable drip coffee maker with 12-cup capacity, auto-shutoff, and brew strength selector.',
    createdAt: new Date('2024-03-10').toISOString(),
  },
  {
    id: 4,
    name: 'Smart Watch',
    category: 'Electronics',
    price: 199.99,
    stock: 18,
    description: 'Advanced smartwatch with health monitoring, GPS tracking, and 7-day battery life.',
    createdAt: new Date('2024-03-25').toISOString(),
  },
  {
    id: 5,
    name: 'Yoga Mat',
    category: 'Sports',
    price: 34.99,
    stock: 55,
    description: 'Eco-friendly non-slip yoga mat with alignment lines, perfect for yoga, pilates, and stretching.',
    createdAt: new Date('2024-04-05').toISOString(),
  },
  {
    id: 6,
    name: 'Desk Lamp',
    category: 'Home & Kitchen',
    price: 39.99,
    stock: 40,
    description: 'LED desk lamp with adjustable brightness, color temperature control, and USB charging port.',
    createdAt: new Date('2024-04-15').toISOString(),
  },
];

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(initialProducts);

  const addProduct = useCallback((product) => {
    const newProduct = {
      ...product,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    };
    setProducts((prev) => [newProduct, ...prev]);
  }, []);

  const updateProduct = useCallback((id, updatedProduct) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, ...updatedProduct } : product
      )
    );
  }, []);

  const deleteProduct = useCallback((id) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  }, []);

  const getProductById = useCallback(
    (id) => products.find((product) => product.id === id),
    [products]
  );

  const getStats = useCallback(() => {
    const totalProducts = products.length;
    const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
    const avgPrice = products.length > 0
      ? (products.reduce((sum, p) => sum + p.price, 0) / products.length).toFixed(2)
      : 0;
    const categories = [...new Set(products.map((p) => p.category))];
    return { totalProducts, totalStock, avgPrice, categories };
  }, [products]);

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductById,
        getStats,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}

