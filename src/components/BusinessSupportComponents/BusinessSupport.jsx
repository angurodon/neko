import React from 'react';
import './BusinessSupport.css'; // CSSファイルをインポート

export default function BusinessSupport() {
  return (
    <div className="business-support-container">
      <div className="business-support-content">
        <h1 className="business-support-title">経理支援</h1>
        <p className="business-support-description">
          経理の人材不足が中小企業経営に大きな課題をもたらしています。
          新しいシステムの導入後の不慣れな時期や経理担当者の一時的な不在時に備え、様々なサービスをご用意しております。
        </p>
        <ul className="business-support-points">
          <li>
            新しいシステムを正しく活用できるスキルと知識を習得していく過程をサポートいたします。
          </li>
          <li>
            ＡＩの活用には数か月分のデータの登録が必要です。
            初期段階は弊社にて会計データの作成をお手伝い、その後正しくＡＩを活用できるようにサポートいたします。
          </li>
          <li>
            経理自動化後も経理業務には時間と手間を要します。
            経理担当者が戦略的な業務に集中できるよう弊社にて会計データ作成を継続することも可能です。
          </li>
          <li>
            請求書の発行、支払請求書の整理などのお手伝いをいたします。
          </li>
          <li>
            給与計算業務のお手伝いをいたします。
            <br />
            ※弊社指定のシステム導入をお願いいたします。
          </li>
        </ul>
      </div>
    </div>
  );
}
