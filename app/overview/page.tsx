import type { Metadata } from "next";
import type { ComponentType } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  Cpu,
  Phone,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "事業概要",
  description:
    "Ic-Growth が提供する経理システムの導入支援、経理支援、経営アドバイザリーサービスについてご紹介します。",
};

const CONTACT_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScEXuDiU9GfCsL2Q4nmK9En8xLd8UzVYR6B95K9IKwNAL6GTQ/viewform";

type IconComponent = ComponentType<{ className?: string }>;

type Service = {
  id: string;
  number: string;
  icon: IconComponent;
  title: string;
  lede: string;
  features: string[];
  extras?: { number: string; title: string; body: string }[];
};

const services: Service[] = [
  {
    id: "business-support",
    number: "01",
    icon: Calculator,
    title: "経理支援",
    lede: "経理人材の不足や担当者の不在に対して、スキル習得から実務運用まで伴走支援します。",
    features: [
      "新しいシステムを正しく活用するスキルと知識の習得をサポート",
      "AI 活用に必要な初期データを弊社で作成、運用に乗せるまで伴走",
      "自動化後も会計データ作成を継続し、経理担当者が戦略業務に集中できる環境を維持",
      "請求書発行・支払請求書整理の代行",
      "給与計算業務の代行",
    ],
  },
  {
    id: "system-support",
    number: "02",
    icon: Cpu,
    title: "経理システム導入支援",
    lede: "「経理の自動化」で、正確性・迅速性・透明性を備えた会計基盤を構築します。",
    features: [
      "手作業に頼らない、時間と労力のかからない経理業務の実現",
      "人為的なエラー・ミスを構造的に削減",
      "意思決定に必要な会計データをリアルタイムに共有",
      "税法や会計基準の変更にシステム側で追従",
      "レポート・分析データの自動生成",
    ],
  },
  {
    id: "msa-support",
    number: "03",
    icon: TrendingUp,
    title: "経営アドバイザリーサービス（MAS）",
    lede: "正確かつ迅速・明瞭な会計を前提に、経営者の戦略的意思決定を伴走支援します。",
    features: [
      "市場動向・リスク・成長機会まで含む戦略立案の壁打ち",
      "P/L・B/S の将来像から資源最適化と事業戦略を逆算",
      "新規投資・組織再編・新規事業の資金計画",
      "短中長期のキャッシュフロー管理を財務会計・管理会計の両面から助言",
      "戦略意思決定とキャッシュフロー管理の継続的フィードバック",
    ],
    extras: [
      {
        number: "01",
        title: "戦略的意思決定のサポート",
        body: "経営陣に会計データを共有しながら、市場動向・リスク・成長機会も踏まえた戦略立案をともに行い、企業の競争力と成長を支えます。P/L・B/S の将来像を必要に応じて細分化し、事業の拡大・縮小・統合・連携につながるコーチングを提供します。",
      },
      {
        number: "02",
        title: "資金調達と運用の管理サポート",
        body: "新規設備投資・組織再編・新規プロジェクトの資金計画から、通常運転資金と短中長期にわたるキャッシュフロー管理まで、財務会計・管理会計の両面から戦略的にアドバイスします。戦略的意思決定とフィードバックし合うことで、相互に重要な影響を及ぼす関係を築きます。",
      },
    ],
  },
];

export default function OverviewPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-muted to-background px-5 pt-12 pb-12 md:pt-16 md:pb-16">
        <div className="mx-auto max-w-6xl">
          <p className="text-center text-sm font-semibold tracking-[0.3em] text-brand-accent uppercase">
            Our Services
          </p>
          <h1 className="mt-3 mb-6 text-center text-3xl font-bold tracking-wide text-brand-success md:text-4xl">
            事 業 概 要
          </h1>
          <p className="mx-auto mb-12 max-w-3xl text-center leading-loose text-muted-foreground md:text-lg">
            会計をエネルギーに変える 3 本柱で、企業の経理基盤と意思決定を支えます。
          </p>

          <div className="grid gap-6 md:grid-cols-3 md:gap-8">
            {services.map((service) => (
              <Link
                key={service.id}
                href={`#${service.id}`}
                className="group block focus-visible:outline-none"
              >
                <Card className="h-full transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-xl group-focus-visible:ring-3 group-focus-visible:ring-primary/40">
                  <CardHeader className="pt-5">
                    <div className="flex items-center gap-3">
                      <span className="flex size-12 items-center justify-center rounded-md bg-primary/10 text-primary">
                        <service.icon className="size-6" />
                      </span>
                      <span className="text-xs font-semibold tracking-widest text-brand-accent uppercase">
                        Service {service.number}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-6">
                    <CardTitle className="mb-3 text-base font-bold text-foreground md:text-lg">
                      {service.title}
                    </CardTitle>
                    <span className="inline-flex items-center gap-1 text-sm text-primary">
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

      {/* Service detail blocks */}
      {services.map((service, idx) => (
        <section
          key={service.id}
          id={service.id}
          className={`scroll-mt-24 px-5 py-16 md:px-8 md:py-20 ${idx % 2 === 0 ? "bg-muted" : "bg-background"}`}
        >
          <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[280px_1fr] md:gap-16">
            <div>
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <service.icon className="size-5" />
                </span>
                <span className="text-xs font-semibold tracking-widest text-brand-accent uppercase">
                  Service {service.number}
                </span>
              </div>
              <h2 className="mt-4 text-2xl font-bold text-brand-success md:text-3xl">
                {service.title}
              </h2>
              <Separator className="mt-4 max-w-12 bg-brand-accent" />
              <p className="mt-6 leading-loose text-muted-foreground">
                {service.lede}
              </p>
            </div>
            <div>
              <ul className="space-y-3">
                {service.features.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 leading-relaxed text-foreground"
                  >
                    <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-brand-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {service.extras && (
                <div className="mt-10 grid gap-5 md:grid-cols-2">
                  {service.extras.map((extra) => (
                    <Card key={extra.number}>
                      <CardHeader className="pt-5">
                        <span className="text-xs font-semibold tracking-widest text-brand-accent uppercase">
                          Case {extra.number}
                        </span>
                        <CardTitle className="text-base leading-snug font-bold text-foreground md:text-lg">
                          {extra.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pb-6">
                        <p className="leading-loose text-muted-foreground">
                          {extra.body}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="bg-background px-5 py-16 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold tracking-[0.3em] text-brand-accent uppercase">
            Contact
          </p>
          <h2 className="mt-3 text-2xl font-bold text-brand-success md:text-3xl">
            ご相談はこちらから
          </h2>
          <p className="mt-4 leading-loose text-muted-foreground">
            まずはお気軽にお問い合わせください。
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={CONTACT_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
            >
              お問い合わせフォーム
              <ArrowRight className="size-4" />
            </a>
            <a
              href="tel:03-3960-3311"
              className="inline-flex items-center gap-2 text-lg font-bold text-foreground transition-colors hover:text-primary"
            >
              <Phone className="size-5 text-[#5fc061]" />
              03-3960-3311
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
