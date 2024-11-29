import React from 'react';
import { Link } from "react-router-dom";
import './Footer.css'; // CSSファイルのインポート
import logo from '../../assets/Ic-Growth_white_2.png'; // ロゴ画像のインポート

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* ロゴと個人情報保護方針 */}
        <div className="footer-logo">
          <img src={logo} alt="Ic ロゴ" />
          <Link to="/privacy"><h4>個人情報保護方針について</h4></Link>
        </div>

        {/* 会社概要 */}
        <div className="footer-links company-info">
          {/* <h4>会社概要</h4> */}
          <ul>
          <li><Link to="/overview">事業概要</Link></li>
            <li><Link to="/company">会社概要</Link></li>
            <li><a href="https://docs.google.com/forms/d/e/1FAIpQLScEXuDiU9GfCsL2Q4nmK9En8xLd8UzVYR6B95K9IKwNAL6GTQ/viewform"> お問い合わせ</a></li>
            {/* <li><Link to="/testimonials">お客様の声</Link></li> */}
          </ul>
        </div>

        {/* サービス */}
        {/* <div className="footer-links services">
          <h4>サービス</h4>
          <ul>
            <li><Link to="/policy">利用規約</Link></li>
            <li><Link to="/guidelines">ガイドライン</Link></li>
            <li><Link to="/overview">事業概要</Link></li>
            <li><Link to="#">-</Link></li>
          </ul>
        </div> */}
      </div>
    </footer>
  );
}
