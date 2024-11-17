import React from 'react';
import './Company.css'; // CSSファイルのインポート

const Company = () => {
  return (
    <div className="company-container">
      <h1>会社概要</h1>
      <table className="company-table">
        <tbody>
        <tr>
          <th><br />会社名</th>
          <td>
          <span className="furigana">　　　　　　　　アイシイグロウス </span><br />

        株式会社　Ｉｃ－Ｇｒｏｗｔｈ
          </td>
        </tr>
        <tr>
            <th>法人番号</th>
            <td>8011401022351</td>
          </tr>

          <tr>
            <th><br />住所</th>
            <td>
              <strong>本社:</strong><br />
              〒174-0056 東京都板橋区志村１丁目３０番１５号<br />
              <br />
              Tel:03-3960-3311  / Fax: <br />
            </td>
          </tr>

          <tr>
            <th>設立</th>
            <td>2000年1月1日</td>
          </tr>
          <tr>
            <th>代表者</th>
            <td>前田 剛</td>
          </tr>
          <tr>
            <th>資本金</th>
            <td>800千円（2024年月日現在）</td>
          </tr>
          <tr>
            <th><br />事業内容</th>
            <td>経理支援<br />経理システムの導入支援<br />経理分析</td>
          </tr>

          <tr>
            <th><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />弊社サービス</th>
            <td>
              <strong>【経理システム導入支援】</strong><br />
              ・勤怠管理システム導入支援<br />
              ・給与計算システム導入支援<br />
              ・会計システム導入支援<br />
              ・請求書発行システム導入支援<br />
              ・経費精算システム導入支援<br />
              ・証憑管理システム導入支援<br />
              ・証憑データ化システム導入支援<br /><br />
              
              <strong>【経理支援】</strong><br />
              ・会計データ作成業務<br />
              ・経理指導<br />
              ・請求書発行業務<br />
              ・受取請求書等整理業務<br />
              ・給与計算<br /><br />
              
              <strong>【経営支援】</strong><br />
              ・連絡ツール導入支援<br />
              ・その他システムのご案内<br />
              ・MAS（経営アドバイザリーサービス）<br /><br />
              
              <strong>【その他】</strong><br />
              ・生命保険業務<br />
              ・相続時資料回収業務
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Company;
