import React from 'react';
import '../CSS/About.css';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="about-page" dir="rtl">
      <div className="about-container">
        <h2 className="about-title">ברוכים הבאים ליקב אַסְפָר</h2>
        
        <p className="about-text">
          היקב שלנו מתמקד בייצור יינות איכותיים בעבודת יד, מהענבים הטובים ביותר. עם שנים של מומחיות ותשוקה, אנו מביאים לכם חוויה ייחודית בכל בקבוק.
        </p>
        
        {/* חלק עם וידאו */}
        <div className="about-video-section">
          <video autoPlay loop muted className="about-video">
            <source src="/Photo/wine8.mp4" type="video/mp4" />
            הדפדפן שלכם אינו תומך בתג וידאו.
          </video>
        </div>
        
        {/* חלק עם תמונות */}
        <div className="about-image-section">
          <img src="/Photo/wine6.jpg" alt="כרם" className="about-image" />
          <img src="/Photo/wine5.jpg" alt="טעימות יין" className="about-image" />
        </div>
        
        <h3 className="about-subtitle">הסיפור שלנו</h3>
        <p className="about-text">
        הכרמים שלנו נטעו בשנת 2012  בפני קדם שבמזרח גוש עציון. החלקות ממוקמות באזור ייחודי מאוד בספר המדבר בגובה רב וצופות לים המלח. לאחר גילגולים שונים החלטנו לפתוח יקב משפחתי קטן מתוך שאיפה לשלוט באופן מלא בכל שלבי הייצור של היין, משלב גידול הענבים בכרם, מועד הבציר ועד הכנת היין, בחירת החביות והרכב הבלנדים.        </p>
        
        {/* קישור לדף החנות */}
        <div className="shop-link">
          <h3 className="about-subtitle">היינות שלנו</h3>
          <p className="about-text">גלו את אוסף יינות הבוטיק שלנו.</p>
          <div>
            <button onClick={() => navigate('/info')} className="info-page-button info-page-button-order">
              בקרו בחנות שלנו
            </button>
          </div>
        </div>
        
        <h3 className="about-subtitle">עקבו אחרינו</h3>
        <p className="about-text">
          ניתן לעקוב אחרינו גם בפייסבוק "הכרם של היאט"
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
