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
          <h1>TEL:03-3960-3311</h1>
        </div>
      </div>
    </div>
  );
}
