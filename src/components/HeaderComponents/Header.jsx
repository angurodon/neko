import React from 'react';
import { Link } from "react-router-dom";
import './Header.css'; // CSSファイルのインポート
import logo from '../../assets/logo_side.png';

const Header = () => {
  return (
    <header className='header'>
      <div className='logo'>
        <img src={logo} alt="会社ロゴ" />
      </div>

      <nav>
        <ul className='nav-list'>
          <li><Link to="/">ホーム</Link></li>
          <li><Link to="/features">特徴</Link></li>
          <li><Link to="/community">コミュニティ</Link></li>
        </ul>
      </nav>

      <div className='contact-btn'>
        <a href="/contact" className="btn">お問い合わせ</a>
      </div>
    </header>
  );
}

export default Header;
