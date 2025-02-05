import React from 'react';
import '../CSS/About.css';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="about-page">
      <div className="about-container">
        <h2 className="about-title"> Welcome to Our Winery</h2>
        
        <p className="about-text">
          Our winery is dedicated to producing high-quality, handcrafted wines made from the finest grapes. 
          With years of expertise and passion, we bring you a unique experience in every bottle.
        </p>
        
        {/* Section with Running Video */}
        <div className="about-video-section">
          <video autoPlay loop muted className="about-video">
            <source src="/Photo/wine8.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        
        {/* Section for Images */}
        <div className="about-image-section">
          <img src="/Photo/wine6.jpg" alt="Vineyard" className="about-image" />
          <img src="/Photo/wine5.jpg" alt="Wine Tasting" className="about-image" />
        </div>
        
        <h3 className="about-subtitle">Our Story</h3>
        <p className="about-text">
          Founded in 1990, our winery started as a small family-owned business and has grown into an internationally recognized name.
          Our mission is to create wines that bring people together and tell a story in every sip.
        </p>
                {/* Link to the Info (Shop) Page */}
          <div className="shop-link">
             <h3 className="about-subtitle">Our Wine</h3>
          <p className="about-text">Discover our collection of fine wines.</p>
          <div>
            <button onClick={() => navigate('/info')} className="info-page-button info-page-button-order">
              Visit Our Shop
            </button>
          </div>
        </div>
        
        <h3 className="about-subtitle">Follow Us</h3>
        <p className="about-text">
          "ניתן לעקוב אחרינו גם בפייסבוק "הכרם של היאט
        </p>
        <div className="social-media">
          <a href="https://www.facebook.com/Asfar.winery/" target="_blank" rel="noopener noreferrer">
            <img src="/Photo/facebook2.jpg" alt="Facebook" className="social-icon" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
