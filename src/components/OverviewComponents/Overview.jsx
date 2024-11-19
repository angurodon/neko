import React, { useEffect, useState } from 'react';
import './Overview.css';
import backup_ec from '../../assets/backup_ec.png';
import backup_system from '../../assets/backup_system.png';
import MAS from '../../assets/MAS.png';
import { useLocation } from 'react-router-dom';
import { Element, scroller } from 'react-scroll';
import { Link as ScrollLink } from 'react-scroll';

export default function Overview() {
  const location = useLocation();
  const [fadeElements, setFadeElements] = useState([]); // 修正: useStateで要素を管理

  // クエリパラメータからスクロールターゲットを取得
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const target = params.get('target');

    if (target) {
      scroller.scrollTo(target, {
        smooth: true,
        duration: 500,
        offset: -70, // ヘッダーがある場合の調整
      });
    }
  }, [location]);

  // フェードインアニメーションの設定
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible');
            observer.unobserve(entry.target); // 一度表示されたら監視を解除
          }
        });
      },
      { threshold: 0.1 } // 要素の10%が見えたらフェードインを開始
    );

    fadeElements.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      fadeElements.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, [fadeElements]); // 修正: fadeElementsを依存配列に追加

  // 要素を登録する関数
  const registerFadeElement = (el) => {
    if (el && !fadeElements.includes(el)) {
      setFadeElements((prev) => [...prev, el]);
    }
  };

  return (
    <div>
      {/* タイトル */}
      <div>
        <h1 className="backup-title"><br />事 業 概 要</h1>
      </div>

      {/* カード部分 */}
      <div className="backup-cards">
        {/* カード1 */}
        <div
          className="card fade-in"
          ref={registerFadeElement} // 修正: registerFadeElementを使用
        >
          <ScrollLink to="system-support" smooth={true} duration={500} className="card-link">
            <div className="card-icon">
              <img src={backup_system} alt="経理システムの導入支援" className="icon-image" />
            </div>
            <h2 className="card-title">経理システムの導入支援</h2>
          </ScrollLink>
        </div>

        {/* カード2 */}
        <div
          className="card fade-in"
          ref={registerFadeElement} // 修正: registerFadeElementを使用
        >
          <ScrollLink to="business-support" smooth={true} duration={500} className="card-link">
            <div className="card-icon">
              <img src={backup_ec} alt="経理支援アイコン" className="icon-image" />
            </div>
            <h2 className="card-title">経理支援</h2>
          </ScrollLink>
        </div>

        {/* カード3 */}
        <div
          className="card fade-in"
          ref={registerFadeElement} // 修正: registerFadeElementを使用
        >
          <ScrollLink to="msa-support" smooth={true} duration={500} className="card-link">
            <div className="card-icon">
              <img src={MAS} alt="MAS" className="icon-image" />
            </div>
            <h2 className="card-title">経営<br />アドバイザリーサービス</h2>
          </ScrollLink>
        </div>
      </div>

      {/* セクション1 */}
      <Element name="business-support">
      <div 
          className="business-support-container fade-in"
          ref={registerFadeElement} // 修正: registerFadeElementを使用
        >
          <div className="business-support-content">
            <h1 className="business-support-title">経理支援</h1>
            <p className="business-support-description">
              経理の人材不足が中小企業経営に大きな課題をもたらしています。
              新しいシステムの導入後の不慣れな時期や経理担当者の一時的な不在時に備え、様々なサービスをご用意しております。
            </p>
            <ul className="business-support-points">
              <li>新しいシステムを正しく活用できるスキルと知識を習得していく過程をサポートいたします。</li>
              <li>
                AIの活用には数か月分のデータの登録が必要です。<br />
                初期段階は弊社にて会計データの作成をお手伝い、その後正しくAIを活用できるようにサポートいたします。
              </li>
              <li>
                経理自動化後も経理業務には時間と手間を要します。<br />
                経理担当者が戦略的な業務に集中できるよう弊社にて会計データ作成を継続することも可能です。
              </li>
              <li>請求書の発行、支払請求書の整理などのお手伝いをいたします。</li>
              <li>給与計算業務のお手伝いをいたします。</li>
            </ul>
          </div>
        </div>
      </Element>

      {/* セクション2 */}
      <Element name="system-support">
      <div 
          className="system-support-container fade-in"
          ref={registerFadeElement} // 修正: registerFadeElementを使用
        >
          <div className="system-support-content">
            <h1 className="system-support-title">経理システム導入支援 <br />（経理の自動化）</h1>
            <p className="system-support-description">
              <strong>経理の自動化</strong>は、多くの企業や組織にとって欠かせない取り組みとなっています。
              経理や会計の状況が健全であること、すなわち<strong>正確性</strong>や<strong>迅速性</strong>、そして
              <strong>透明性</strong>を備えていることは、経営において非常に重要な要素です。
            </p>
            <ul className="system-support-points">
              <li>従来の手作業による経理業務は、多くの時間と労力を必要とします。</li>
              <li>人間による手作業は、エラーやミスの発生が避けられません。</li>
              <li>意思決定プロセスの改善や戦略的な判断のため迅速な会計データを共有できます。</li>
              <li>税法や会計基準は頻繁に変更されます。</li>
              <li>レポートや分析データを自動的に生成できます。</li>
            </ul>
          </div>
        </div>
      </Element>

      {/* セクション3 */}
      <Element name="msa-support">
      <div 
          className="msa-support-container fade-in"
          ref={registerFadeElement} // 修正: registerFadeElementを使用
        >
          <div className="msa-content">
            <h1 className="msa-title">経営支援</h1>
            <h2 className="msa-subtitle">MAS（経営アドバイザリーサービス）</h2>
            <p className="msa-description">
              経営アドバイザリーサービスは、企業や組織にとって非常に重要な役割を果たすものです。<br /><br />
              ただし経営者が戦略的意思決定をするヒントになる鍵は、経理、会計のコンディションが優良であること、
              すなわち経理処理が正確かつスピーディであり、さらに明瞭であることが前提条件となります。<br /><br />
              具体的なサービス内容は各企業、経営者に応じて多種多様なものとなりますが、
              <br />次の2項目が代表的な弊社の関与事例となっております。
            </p>
            <div className="msa-services">
              <div className="msa-service">
                <h3 className="msa-service-title">戦略的意思決定のサポート</h3>
                <p className="msa-service-description">
                  企業の経営陣に対して、会計データを共有しながら戦略的な意思決定を促します。<br />
                  さらに会計データに留まらず市場動向、情勢、リスク、成長機会などの情報も共有しながら、<br />
                  最適な戦略を一緒に考え企業の競争力を維持し、成長戦略を展開するのに役立てます。
                </p>
                <p className="msa-service-description">
                  また損益計算書、貸借対照表の将来像を経営戦略に落とし込んでいくイメージでデータを必要に応じて<br />細分化、
                  経営資源を最適に活用、加えて事業の拡大・縮小・統合・連携等に繋がるようにコーチングして参ります。
                </p>
              </div>
              <div className="msa-service">
                <h3 className="msa-service-title">資金調達と運用に関する管理サポート</h3>
                <p className="msa-service-description">
                  新規設備投資、法人の組織再編、新しいプロジェクトに関する資金計画だけでなく、<br />
                  通常の運転資金と短中長期にわたるキャッシュフロー管理を財務会計、管理会計の両面から戦略的なアドバイスを提供します。
                </p>
                <p className="msa-service-description">
                  このキャッシュフロー管理と前者の戦略的意思決定とはお互いにフィードバックすることを通して重要な影響を及ぼしあう関係性を持ちます。
                </p>
              </div>
            </div>
          </div>
        </div>
      </Element>

    </div>
  );
}
