import React from 'react';
import './SectionComponent1.css'; // コンポーネント専用のCSSをインポート
import logo from '../../assets/Ic-Growth_color_1.png';


const SectionComponent1 = () => {
  return (
    <div className="homepage-container">
      <div className="content-section">
        <h1>文章</h1>
        <p>概要</p>
        <button className="contact-button">お問い合わせ</button>
      </div>
      <div className="logo-section">
        <img src={logo} alt="Ic-Growth Logo" />
      </div>
    </div>
  );
};

export default SectionComponent1;
