import React from 'react';
import './Backup.css'; // コンポーネント専用のCSSをインポート
import back from '../../assets/backup.png';
import backup_system from '../../assets/backup_system.png';
import MAS from '../../assets/MAS.png';

export default function Backup() {
  return (
    <div className="backup-container">
      <h1 className="backup-title">経理システムの導入支援</h1>
      <p className="backup-description">
        我々は下記サービスを導入支援いたします
      </p>
      <div className="backup-cards">
        <div className="card">
          <div className="card-icon">
          <img src={backup_system} alt="経理システムの導入支援" className="icon-image" />
          </div>
          <h2 className="card-title">経理システムの導入支援</h2>
          <p className="card-description">
            当社の会員管理ソフトウェアは、会員の更新と支払いを自動化します
          </p>
        </div>
        <div className="card">
          <div className="card-icon">
            <img src={back} alt="経理支援アイコン" className="icon-image" />
          </div>
          <h2 className="card-title">経理支援</h2>
          <p className="card-description">
            当社の会員管理ソフトウェアは、会員の更新と支払いを自動化します
          </p>
        </div>
        <div className="card">
          <div className="card-icon">
            <img src={MAS} alt="MAS" className="icon-image" />
          </div>
          <h2 className="card-title">MAS(経営アドバイザリーサービス)</h2>
          <p className="card-description">
            当社の会員管理ソフトウェアは、会員の更新と支払いを自動化します
          </p>
        </div>
      </div>
    </div>
  );
}
