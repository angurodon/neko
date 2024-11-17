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

      <nav className='nav'>
        <ul className='nav-list'>
          <li></li>
          <li><Link to="/">ホーム</Link></li>
          <li><Link to="/overview">事業概要</Link></li>
          <li><Link to="/company">会社概要</Link></li>
        </ul>
      </nav>
        <div className='contact-btn'>
          <a href="mailto:ic-growth-aoi@ic-gr.com" className="btn">お問い合わせ</a>
        </div>

    </header>
  );
}

export default Header;
