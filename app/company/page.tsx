import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "会社概要",
  description:
    "株式会社 Ic-Growth の会社概要。所在地、設立、代表者、事業内容などをご案内します。",
};

const rows: { label: string; content: React.ReactNode }[] = [
  {
    label: "会社名",
    content: (
      <>
        <span className="block text-sm text-gray-500">アイシイグロウス</span>
        株式会社 Ｉｃ－Ｇｒｏｗｔｈ
      </>
    ),
  },
  { label: "法人番号", content: "8011401022351" },
  {
    label: "住所",
    content: (
      <>
        <strong>本社:</strong>
        <br />
        〒174-0056
        <br />
        東京都板橋区志村１丁目３０番１５号
        <br />
        <br />
        Tel:03-3960-3311
      </>
    ),
  },
  { label: "設立", content: "令和2年（2020年）1月22日" },
  { label: "代表者", content: "前田 剛" },
  { label: "資本金", content: "800千円（2024年月日現在）" },
  {
    label: "事業内容",
    content: (
      <>
        経理支援
        <br />
        経理システムの導入支援
        <br />
        経理分析
      </>
    ),
  },
  {
    label: "弊社サービス",
    content: (
      <>
        <strong>【経理システム導入支援】</strong>
        <br />
        ・勤怠管理システム導入支援
        <br />
        ・給与計算システム導入支援
        <br />
        ・会計システム導入支援
        <br />
        ・請求書発行システム導入支援
        <br />
        ・経費精算システム導入支援
        <br />
        ・証憑管理システム導入支援
        <br />
        ・証憑データ化システム導入支援
        <br />
        <br />
        <strong>【経理支援】</strong>
        <br />
        ・会計データ作成業務
        <br />
        ・経理指導
        <br />
        ・請求書発行業務
        <br />
        ・受取請求書等整理業務
        <br />
        ・給与計算業務
        <br />
        <br />
        <strong>【経営支援】</strong>
        <br />
        ・連絡ツール導入支援
        <br />
        ・その他システムのご案内
        <br />
        ・MAS（経営アドバイザリーサービス）
        <br />
        <br />
        <strong>【その他】</strong>
        <br />
        ・生命保険業務
        <br />
        ・相続時資料回収業務
      </>
    ),
  },
];

export default function CompanyPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-12">
      <h1 className="mb-8 text-center text-3xl font-bold text-[#215126] md:text-4xl">
        会 社 概 要
      </h1>
      <table className="w-full border-collapse text-left">
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-b border-gray-200 align-top">
              <th className="w-32 bg-[#f5f7fa] px-4 py-4 font-bold text-gray-800 md:w-40">
                {row.label}
              </th>
              <td className="px-4 py-4 leading-loose text-gray-800">
                {row.content}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
