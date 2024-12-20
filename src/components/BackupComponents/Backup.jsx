import React from 'react';
import { Link } from 'react-router-dom';
import './Backup.css';
import backup_ec from '../../assets/backup_ec.png';
import backup_system from '../../assets/backup_system.png';
import MAS from '../../assets/MAS.png';

export default function Backup() {
  return (
    <div className="backup-container">
      <div>
        <h1 className="backup-title">事 業 概 要</h1>
      </div>
      <p className="backup-description">
        我々は下記サービスを導入支援いたします
      </p>
      <div className="backup-cards">
        <div className="card">
          <Link to="/overview?target=system-support" className="card-link">
            <div className="card-icon">
              <img src={backup_system} alt="経理システムの導入支援" className="icon-image" />
            </div>
            <h2 className="card-title">経理システムの導入支援</h2>
            <p className="card-description">
              {/* 当社の会員管理ソフトウェアは、会員の更新と支払いを自動化します */}
            </p>
          </Link>
        </div>
        <div className="card">
          <Link to="/overview?target=business-support" className="card-link">
            <div className="card-icon">
              <img src={backup_ec} alt="経理支援アイコン" className="icon-image" />
            </div>
            <h2 className="card-title">経理支援</h2>
            <p className="card-description">
              {/* 当社の会員管理ソフトウェアは、会員の更新と支払いを自動化します */}
            </p>
          </Link>
        </div>
        <div className="card">
          <Link to="/overview?target=msa-support" className="card-link">
            <div className="card-icon">
              <img src={MAS} alt="MAS" className="icon-image" />
            </div>
            <h2 className="card-title">経営 <br/>アドバイザリーサービス</h2>


          </Link>
        </div>
      </div>
    </div>
  );
}
