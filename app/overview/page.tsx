import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "事業概要",
  description:
    "Ic-Growth が提供する経理システムの導入支援、経理支援、経営アドバイザリーサービスについてご紹介します。",
};

const cards = [
  {
    href: "#system-support",
    src: "/images/backup_system.png",
    alt: "経理システムの導入支援",
    title: "経理システムの導入支援",
  },
  {
    href: "#business-support",
    src: "/images/backup_ec.png",
    alt: "経理支援アイコン",
    title: "経理支援",
  },
  {
    href: "#msa-support",
    src: "/images/MAS.png",
    alt: "MAS",
    title: "経営アドバイザリーサービス",
  },
] as const;

const sections = [
  {
    id: "business-support",
    eyebrow: "Service 01",
    title: "経理支援",
    bg: "bg-muted",
    body: (
      <>
        <p className="leading-loose text-muted-foreground">
          経理の人材不足が中小企業経営に大きな課題をもたらしています。新しいシステムの導入後の不慣れな時期や経理担当者の一時的な不在時に備え、様々なサービスをご用意しております。
        </p>
        <ul className="list-disc space-y-3 pl-6 leading-loose text-muted-foreground">
          <li>
            新しいシステムを正しく活用できるスキルと知識を習得していく過程をサポートいたします。
          </li>
          <li>
            AIの活用には数か月分のデータの登録が必要です。
            <br />
            初期段階は弊社にて会計データの作成をお手伝い、その後正しくAIを活用できるようにサポートいたします。
          </li>
          <li>
            経理自動化後も経理業務には時間と手間を要します。
            <br />
            経理担当者が戦略的な業務に集中できるよう弊社にて会計データ作成を継続することも可能です。
          </li>
          <li>請求書の発行、支払請求書の整理などのお手伝いをいたします。</li>
          <li>給与計算業務のお手伝いをいたします。</li>
        </ul>
      </>
    ),
  },
  {
    id: "system-support",
    eyebrow: "Service 02",
    title: "経理システム導入支援（経理の自動化）",
    bg: "bg-background",
    body: (
      <>
        <p className="leading-loose text-muted-foreground">
          <strong className="text-foreground">経理の自動化</strong>
          は、多くの企業や組織にとって欠かせない取り組みとなっています。経理や会計の状況が健全であること、すなわち
          <strong className="text-foreground">正確性</strong>や
          <strong className="text-foreground">迅速性</strong>、そして
          <strong className="text-foreground">透明性</strong>
          を備えていることは、経営において非常に重要な要素です。
        </p>
        <ul className="list-disc space-y-3 pl-6 leading-loose text-muted-foreground">
          <li>
            従来の手作業による経理業務は、多くの時間と労力を必要とします。
          </li>
          <li>人間による手作業は、エラーやミスの発生が避けられません。</li>
          <li>
            意思決定プロセスの改善や戦略的な判断のため迅速な会計データを共有できます。
          </li>
          <li>税法や会計基準は頻繁に変更されます。</li>
          <li>レポートや分析データを自動的に生成できます。</li>
        </ul>
      </>
    ),
  },
] as const;

export default function OverviewPage() {
  return (
    <div>
      <section className="bg-gradient-to-b from-muted to-background px-5 py-12 md:py-16">
        <div className="mx-auto max-w-6xl">
          <h1 className="mb-10 text-center text-3xl font-bold tracking-wide text-brand-success md:text-4xl">
            事 業 概 要
          </h1>

          <div className="grid gap-6 md:grid-cols-3 md:gap-8">
            {cards.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="group block focus-visible:outline-none"
              >
                <Card className="h-full transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-xl group-focus-visible:ring-3 group-focus-visible:ring-primary/40">
                  <CardHeader className="items-center pt-2">
                    <div className="flex justify-center">
                      <Image
                        src={card.src}
                        alt={card.alt}
                        width={100}
                        height={100}
                        className="h-24 w-24 object-contain"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="pb-6 text-center">
                    <CardTitle className="text-lg text-foreground md:text-xl">
                      {card.title}
                    </CardTitle>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm text-primary">
                      詳しく見る
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {sections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className={`${section.bg} px-5 py-14 md:px-8 md:py-20`}
        >
          <div className="mx-auto max-w-4xl space-y-5">
            <div>
              <p className="text-sm font-semibold tracking-widest text-primary uppercase">
                {section.eyebrow}
              </p>
              <h2 className="mt-2 text-2xl font-bold text-brand-success md:text-3xl">
                {section.title}
              </h2>
              <Separator className="mt-4 max-w-16 bg-primary" />
            </div>
            {section.body}
          </div>
        </section>
      ))}

      <section id="msa-support" className="bg-muted px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-4xl space-y-5">
          <div>
            <p className="text-sm font-semibold tracking-widest text-primary uppercase">
              Service 03
            </p>
            <h2 className="mt-2 text-2xl font-bold text-brand-success md:text-3xl">
              経営支援
            </h2>
            <h3 className="mt-2 text-lg font-semibold text-brand-success">
              MAS（経営アドバイザリーサービス）
            </h3>
            <Separator className="mt-4 max-w-16 bg-primary" />
          </div>
          <p className="leading-loose text-muted-foreground">
            経営アドバイザリーサービスは、企業や組織にとって非常に重要な役割を果たすものです。
            <br />
            <br />
            ただし経営者が戦略的意思決定をするヒントになる鍵は、経理、会計のコンディションが優良であること、すなわち経理処理が正確かつスピーディであり、さらに明瞭であることが前提条件となります。
            <br />
            <br />
            具体的なサービス内容は各企業、経営者に応じて多種多様なものとなりますが、
            <br />
            次の2項目が代表的な弊社の関与事例となっております。
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-foreground">
                  戦略的意思決定のサポート
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 pb-6 leading-loose text-muted-foreground">
                <p>
                  企業の経営陣に対して、会計データを共有しながら戦略的な意思決定を促します。
                  さらに会計データに留まらず市場動向、情勢、リスク、成長機会などの情報も共有しながら、最適な戦略を一緒に考え企業の競争力を維持し、成長戦略を展開するのに役立てます。
                </p>
                <p>
                  また損益計算書、貸借対照表の将来像を経営戦略に落とし込んでいくイメージでデータを必要に応じて細分化、経営資源を最適に活用、加えて事業の拡大・縮小・統合・連携等に繋がるようにコーチングして参ります。
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-foreground">
                  資金調達と運用に関する管理サポート
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 pb-6 leading-loose text-muted-foreground">
                <p>
                  新規設備投資、法人の組織再編、新しいプロジェクトに関する資金計画だけでなく、通常の運転資金と短中長期にわたるキャッシュフロー管理を財務会計、管理会計の両面から戦略的なアドバイスを提供します。
                </p>
                <p>
                  このキャッシュフロー管理と前者の戦略的意思決定とはお互いにフィードバックすることを通して重要な影響を及ぼしあう関係性を持ちます。
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
