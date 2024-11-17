import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './Header.css'; // CSSファイルのインポート
import logo from '../../assets/logo_side.png';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
  
    return (
        <header className='header'>
            <div className='logo'>
                <img src={logo} alt="会社ロゴ" />
            </div>

            {/* ハンバーガーメニューアイコン */}
            <div className={`menu-icon ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
                {isMenuOpen ? (
                    // 「×」アイコン表示
                    <div className="close-icon">&times;</div>
                ) : (
                    <>
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                    </>
                )}
            </div>

            {/* サイドメニュー */}
            <nav className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
                <ul className='nav-list'>
                    <li><Link to="/" onClick={toggleMenu}>ホーム</Link></li>
                    <li><Link to="/overview" onClick={toggleMenu}>事業概要</Link></li>
                    <li><Link to="/company" onClick={toggleMenu}>会社概要</Link></li>
                </ul>
                <div className='contact-btn'>
                    <a href="mailto:ic-growth-aoi@ic-gr.com" className="btn" onClick={toggleMenu}>お問い合わせ</a>
                </div>
            </nav>
        </header>
    );
}

export default Header;
