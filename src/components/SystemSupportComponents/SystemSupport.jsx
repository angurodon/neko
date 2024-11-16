import React from 'react';
import './SystemSupport.css';

export default function SystemSupport() {
  return (
    <div className="system-support-container">
      <div className="system-support-content">
        <h1 className="system-support-title">経理システム導入支援（経理の自動化）</h1>
        <p className="system-support-description">
          <p>
            <strong>経理の自動化</strong>は、多くの企業や組織にとって欠かせない取り組みとなっています。
          </p>
          <p>
            経理や会計の状況が健全であること、
            すなわち
            <strong>正確性</strong>や
            <strong>迅速性</strong>、そして
            <strong>透明性</strong>を備えていることは、
            経営において非常に重要な要素です。
          </p>
        </p>
        <ul className="system-support-points">
          <li>1. 従来の手作業による経理業務は、多くの時間と労力を必要とします。</li>
          <li>2. 人間による手作業は、エラーやミスの発生が避けられません。</li>
          <li>3. 意思決定プロセスの改善や戦略的な判断のため迅速な会計データを共有できます。</li>
          <li>4. 税法や会計基準は頻繁に変更されます。</li>
          <li>5. レポートや分析データを自動的に生成できます。</li>
        </ul>
      </div>
    </div>
  );
}
