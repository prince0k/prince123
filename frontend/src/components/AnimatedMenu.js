import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./AnimatedMenu.css";

const AnimatedMenu = () => {
  const [checked, setChecked] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  const handleMenuClick = () => {
    setChecked(false);
  };

  return (
    <div className="animated-navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          Prince Sharma
        </Link>

        {/* Animated Menu */}
        <div className="menu-container">
          <input
            type="checkbox"
            id="menu"
            checked={checked}
            onChange={() => setChecked(!checked)}
          />
          <label htmlFor="menu">
            <div className="menu"></div>
          </label>

          <div className={`box ${checked ? "box-visible" : ""}`}>
            {navItems.map((item, index) => (
              <Link
                key={item.name}
                to={item.path}
                className={`menu-item ${isActive(item.path) ? 'active' : ''}`}
                onClick={handleMenuClick}
              >
                {item.name}
              </Link>
            ))}
            <div className="move-item"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedMenu; 