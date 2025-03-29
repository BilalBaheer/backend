import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <div className="hero-icon">🤖</div>
          <h1 className="hero-title">
            Actually Build Backend Apps
            <span className="hero-subtitle">Using AI</span>
          </h1>
          <p className="hero-description">
            Harness the power of AI to streamline your backend development process.
          </p>
          <button className="hero-button">Watch Series</button>
        </div>
        <div className="hero-image-container">
          <div className="placeholder-image">
            <div className="placeholder-content">
              <div className="placeholder-avatar">
                <div className="placeholder-avatar-inner"></div>
              </div>
              <div className="placeholder-text">
                <div className="placeholder-line"></div>
                <div className="placeholder-line"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
