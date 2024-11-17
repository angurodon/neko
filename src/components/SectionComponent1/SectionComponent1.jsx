import React from 'react';
import './SectionComponent1.css'; // 修正版CSSをインポート
import logo from '../../assets/Ic-Growth_color_1.png';

const SectionComponent1 = () => {
  return (
    <div className="homepage-container">
      <div className="content-section">

        <p>
          <strong>個人と企業の成長に貢献します！</strong><br />
          Contribute to the growth of individuals and companies
        </p>
        <p>
          日本の近未来における厳しい環境化であっても、持続的成長を遂げるために、
          有限である経営資源（ヒト、モノ、カネ、時間）活用の最適化を図ることを使命とします。<br></br>
          我々はこの使命を「会計をエネルギーに変換すること」で実現します。「Accounting Transformation」「AX」の実現を目指します。
        </p>
      </div>
      <div className="logo-section">
        <img src={logo} alt="Ic-Growth Logo" />
      </div>
    </div>
  );
};

export default SectionComponent1;
