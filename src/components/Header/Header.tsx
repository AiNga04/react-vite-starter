import React, { useState } from "react";
import {
  FaBars,
  FaTimes,
  FaSearch,
  FaUser,
  FaShoppingCart,
} from "react-icons/fa";

import { Link } from "react-router-dom";
import "./Header.scss";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleSearch = () => setSearchOpen(!searchOpen);

  return (
    <header className="navbar">
      <div className="container">
        {/* Logo */}
        <div className="logo">
          <Link to="/">Zyna</Link>
        </div>

        {/* Main Navigation */}
        <nav className={`nav-links ${isOpen ? "active" : ""}`}>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">User</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/services">Services</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>

        {/* Right Side Icons */}
        <div className="nav-icons">
          <button className="search-icon" onClick={toggleSearch}>
            <FaSearch />
          </button>
          <Link to="/account" className="user-icon">
            <FaUser />
          </Link>
          <Link to="/cart" className="cart-icon">
            <FaShoppingCart />
            <span className="cart-count">0</span>
          </Link>
          <button className="hamburger" onClick={toggleMenu}>
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Search Bar */}
        <div className={`search-bar ${searchOpen ? "active" : ""}`}>
          <input type="text" placeholder="Search..." />
          <button className="search-button">
            <FaSearch />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
