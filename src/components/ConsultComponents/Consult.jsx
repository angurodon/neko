import React from 'react';
import './Consult.css'; // CSSをインポート

export default function Consult() {
  return (

    <div className="consult-background"> {/* 背景用のクラスを追加 */}
      <div className='consult-top'>
        <h2>無料相談はこちらから</h2>
      </div>
      <div className="consult-container">
        <div className='consult-line'>
          <h1>consult</h1>
        </div>
      </div>
    </div>
  );
}
