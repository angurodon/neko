import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";

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
        <span className="block text-xs text-muted-foreground">
          アイシイグロウス
        </span>
        株式会社 Ｉｃ－Ｇｒｏｗｔｈ
      </>
    ),
  },
  { label: "法人番号", content: "8011401022351" },
  {
    label: "住所",
    content: (
      <>
        <strong className="text-foreground">本社:</strong>
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
        <strong className="text-foreground">【経理システム導入支援】</strong>
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
        <strong className="text-foreground">【経理支援】</strong>
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
        <strong className="text-foreground">【経営支援】</strong>
        <br />
        ・連絡ツール導入支援
        <br />
        ・その他システムのご案内
        <br />
        ・MAS（経営アドバイザリーサービス）
        <br />
        <br />
        <strong className="text-foreground">【その他】</strong>
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
    <div className="bg-gradient-to-b from-muted to-background">
      <div className="mx-auto max-w-4xl px-5 py-14 md:py-20">
        <h1 className="mb-10 text-center text-3xl font-bold tracking-wide text-brand-success md:text-4xl">
          会 社 概 要
        </h1>
        <Card className="overflow-hidden">
          <CardContent className="px-0">
            <Table className="text-base">
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.label}
                    className="hover:bg-transparent has-aria-expanded:bg-transparent"
                  >
                    <TableCell className="w-32 bg-muted/60 px-5 py-5 align-top font-bold whitespace-normal text-foreground md:w-48">
                      {row.label}
                    </TableCell>
                    <TableCell className="px-5 py-5 align-top leading-loose whitespace-normal text-foreground">
                      {row.content}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
