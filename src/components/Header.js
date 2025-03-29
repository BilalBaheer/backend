import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <nav className="header">
      <div className="header-container">
        <div className="logo">
          <span className="logo-icon">🤖</span>
          <span className="logo-text">YourApp</span>
        </div>
        <div className="nav-links">
          <a href="#features" className="nav-link">Features</a>
          <a href="#tech-stack" className="nav-link">Tech Stack</a>
          <a href="#episodes" className="nav-link">Episodes</a>
          <a href="#testimonials" className="nav-link">Testimonials</a>
          <a href="#get-started" className="nav-link cta">Get Started</a>
        </div>
      </div>
    </nav>
  );
};

export default Header;
