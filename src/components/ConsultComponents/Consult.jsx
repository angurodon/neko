import React from 'react';
import './Consult.css'; // CSSをインポート
import phoneIcon from '../../assets/phone.png';

export default function Consult() {
  return (
    <div className="consult-background">
      <div className="consult-top">
        <h2>無料相談はこちらから</h2>
      </div>
      <div className="consult-container">
        <div className="consult-line">
          {/* 電話番号のリンク */}
          <a href="tel:03-3960-3311" className="consult-phone phone-icon">
            <div className="phone-icon">
              <img src={phoneIcon} alt="電話アイコン" className="phone-icon-svg" />
            </div>
            <div className="phone-details">
              <h1 className="phone-number">TEL:03-3960-3311</h1>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
