import React from 'react';
import { Link } from "react-router-dom";
import './Footer.css'; // CSSファイルのインポート
import logo from '../../assets/Ic-Growth_white_2.png'; // ロゴ画像のインポート

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* ロゴと会社情報 */}
        <div className="footer-logo">
          <img src={logo} alt="Ic ロゴ" />

          
          <Link to="/privacy"><h4>個人情報保護方針について</h4></Link>

          {/* ソーシャルアイコン */}
          {/* <div className="social-icons">
            <a href="#"><i className="fa fa-instagram"></i></a>
            <a href="#"><i className="fa fa-dribbble"></i></a>
            <a href="#"><i className="fa fa-twitter"></i></a>
            <a href="#"><i className="fa fa-youtube"></i></a>
          </div> */}
        </div>

        {/* 会社概要 */}
        <div className="footer-links">
          <h4>会社概要</h4>
          <ul>
            <li><Link to="/about-us">会社情報</Link></li>
            <li><Link to="/contact">お問い合わせ</Link></li>
            <li><Link to="/pricing">料金</Link></li>
            <li><Link to="/testimonials">お客様の声</Link></li>
          </ul>
        </div>

        {/* サービス */}
        <div className="footer-links">
          <h4>サービス</h4>
          <ul>
            <li><Link to="/policy">利用規約</Link></li>
            <li><Link to="/guidelines">ガイドラインについて</Link></li>
            <li><Link to="/overview">事業概要</Link></li>
            <li><Link to="#">-</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
