import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/slices/authSlice';

function Header() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
    setShowDropdown(false);
  };

  if (loading) {
    return <div className="container mt-4">Loading...</div>;
  }

  return (
    <header className="bg-dark text-white">
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container">
          <Link to="/" className="navbar-brand">BookStore</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to="/books" className="nav-link">Books</Link>
              </li>
              {user ? (
                <li className="nav-item dropdown">
                  <button
                    className="nav-link dropdown-toggle btn btn-link"
                    onClick={() => setShowDropdown(!showDropdown)}
                    aria-expanded={showDropdown}
                    type="button"
                  >
                    Account
                  </button>
                  {showDropdown && (
                    <ul className="dropdown-menu dropdown-menu-end show">
                      <li><Link to="/orders" className="dropdown-item">Orders</Link></li>
                      <li><Link to="/profile" className="dropdown-item">Profile</Link></li>
                      <li><button onClick={handleLogout} className="dropdown-item">Logout</button></li>
                    </ul>
                  )}
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <Link to="/login" className="nav-link">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/register" className="nav-link">Register</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;