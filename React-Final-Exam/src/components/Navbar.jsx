import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="container">
        <NavLink to="/" className="navbar-brand">
          📦 PMS
        </NavLink>
        <ul className="navbar-links">
          <li>
            <NavLink to="/" end>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/products">Products</NavLink>
          </li>
          <li>
            <NavLink to="/products/add">Add Product</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

