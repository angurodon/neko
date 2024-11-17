import React from 'react';
import './MAS.css'; // CSSファイルをインポート

export default function MAS() {
  return (
  <div className="msa-container">
      <div className="msa-content">
        <h1 className="msa-title">経営支援</h1>
        <h2 className="msa-subtitle">ＭＡＳ（経営アドバイザリーサービス）</h2>
        <p className="msa-description">
          経営アドバイザリーサービスは、企業や組織にとって非常に重要な役割を果たすものです。
          ただし経営者が戦略的意思決定をするヒントになる鍵は、経理、会計のコンディションが優良であること、
          すなわち経理処理が正確かつスピーディであり、さらに明瞭であることが前提条件となります。
          具体的なサービス内容は各企業、経営者に応じて多種多様なものとなりますが、次の2項目が代表的な弊社の関与事例となっております。
        </p>
        <div className="msa-services">
          <div className="msa-service">
            <h3 className="msa-service-title">戦略的意思決定のサポート</h3>
            <p className="msa-service-description">
              企業の経営陣に対して、会計データを共有しながら戦略的な意思決定を促します。
              さらに会計データに留まらず市場動向、情勢、リスク、成長機会などの情報も共有しながら、
              最適な戦略を一緒に考え企業の競争力を維持し、成長戦略を展開するのに役立てます。
            </p>
            <p className="msa-service-description">
              また損益計算書、貸借対照表の将来像を経営戦略に落とし込んでいくイメージでデータを必要に応じて細分化、
              経営資源を最適に活用、加えて事業の拡大・縮小・統合・連携等に繋がるようにコーチングして参ります。
            </p>
          </div>
          <div className="msa-service">
            <h3 className="msa-service-title">資金調達と運用に関する管理サポート</h3>
            <p className="msa-service-description">
              新規設備投資、法人の組織再編、新しいプロジェクトに関する資金計画だけでなく、
              通常の運転資金と短中長期にわたるキャッシュフロー管理を財務会計、管理会計の両面から戦略的なアドバイスを提供します。
            </p>
            <p className="msa-service-description">
              このキャッシュフロー管理と前者の戦略的意思決定とはお互いにフィードバックすることを通して重要な影響を及ぼしあう関係性を持ちます。
            </p>
          </div>
        </div>
      </div>
  </div>
  );
}
