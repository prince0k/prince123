import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './AnimatedHamburgerMenu.css';

const AnimatedHamburgerMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { name: 'Home', path: '/', color: '#DEF06C' },
    { name: 'Projects', path: '/projects', color: '#71C1D1' },
    { name: 'Gallery', path: '/gallery', color: '#DD7171' },
    { name: 'Contact', path: '/contact', color: '#A871D1' }
  ];

  const isActive = (path) => location.pathname === path;

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="hamburger-menu-container">
      {/* Hidden checkbox for CSS animations */}
      <input
        type="checkbox"
        id="hamburger-toggle"
        className="hamburger-checkbox"
        checked={isMenuOpen}
        onChange={handleMenuToggle}
      />
      
      {/* Hamburger icon */}
      <label htmlFor="hamburger-toggle" className="hamburger-label">
        <div className="hamburger-icon">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </label>

      {/* Sliding menu */}
      <div className={`menu-overlay ${isMenuOpen ? 'menu-open' : ''}`}>
        <div className="menu-content">
          {menuItems.map((item, index) => (
            <Link
              key={item.name}
              to={item.path}
              className={`menu-item ${isActive(item.path) ? 'active' : ''}`}
              style={{ '--item-color': item.color }}
              onClick={handleMenuItemClick}
            >
              {item.name}
            </Link>
          ))}
          <div className="move-item"></div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedHamburgerMenu; 