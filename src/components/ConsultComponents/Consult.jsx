import React from 'react';
import './Consult.css'; // CSSをインポート

export default function Consult() {
  return (
    <div className="consult-background">
      <div className="consult-top">
        <h2>無料相談はこちらから</h2>
      </div>
      <div className="consult-container">
        <div className="consult-line">
          {/* 左側の Consult タイトル */}
          <h1>Tel:03-3960-3311</h1>
          <h1>FAX:</h1>
          <div className="mail">
          <h2><a href="mailto:ic-growth-aoi@ic-gr.com">ic-growth-aoi@ic-gr.com</a></h2>
          </div>

        </div>
      </div>
    </div>
  );
}
