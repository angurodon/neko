import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowRight,
  Briefcase,
  Building2,
  Calculator,
  Calendar,
  Coins,
  Cpu,
  Hash,
  MapPin,
  Phone,
  Sparkles,
  TrendingUp,
  User,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "会社概要",
  description:
    "株式会社 Ic-Growth の会社概要。所在地、設立、代表者、事業内容などをご案内します。",
};

const CONTACT_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScEXuDiU9GfCsL2Q4nmK9En8xLd8UzVYR6B95K9IKwNAL6GTQ/viewform";

const MAP_QUERY = "東京都板橋区志村1-30-15";

const heroFacts = [
  {
    icon: Building2,
    label: "Company",
    value: "株式会社 Ｉｃ－Ｇｒｏｗｔｈ",
    sub: "アイシイグロウス",
  },
  {
    icon: Calendar,
    label: "Founded",
    value: "2020年1月22日",
    sub: "令和2年",
  },
  {
    icon: User,
    label: "Representative",
    value: "前田 剛",
    sub: "代表取締役",
  },
] as const;

const detailRows = [
  { icon: Hash, label: "法人番号", content: "8011401022351" },
  {
    icon: MapPin,
    label: "本社所在地",
    content: (
      <>
        〒174-0056
        <br />
        東京都板橋区志村１丁目３０番１５号
      </>
    ),
  },
  {
    icon: Phone,
    label: "電話番号",
    content: (
      <a
        href="tel:03-3960-3311"
        className="text-foreground transition-colors hover:text-primary"
      >
        03-3960-3311
      </a>
    ),
  },
  { icon: Coins, label: "資本金", content: "800千円（2024年現在）" },
  {
    icon: Briefcase,
    label: "事業内容",
    content: "経理支援 / 経理システムの導入支援 / 経理分析",
  },
] as const;

const serviceCategories = [
  {
    icon: Cpu,
    title: "経理システム導入支援",
    items: [
      "勤怠管理システム",
      "給与計算システム",
      "会計システム",
      "請求書発行システム",
      "経費精算システム",
      "証憑管理システム",
      "証憑データ化システム",
    ],
  },
  {
    icon: Calculator,
    title: "経理支援",
    items: [
      "会計データ作成業務",
      "経理指導",
      "請求書発行業務",
      "受取請求書等整理業務",
      "給与計算業務",
    ],
  },
  {
    icon: TrendingUp,
    title: "経営支援",
    items: [
      "連絡ツール導入支援",
      "その他システムのご案内",
      "MAS（経営アドバイザリーサービス）",
    ],
  },
  {
    icon: Sparkles,
    title: "その他",
    items: ["生命保険業務", "相続時資料回収業務"],
  },
] as const;

export default function CompanyPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-muted to-background px-5 pt-12 pb-12 md:pt-16 md:pb-16">
        <div className="mx-auto max-w-5xl">
          <p className="text-center text-sm font-semibold tracking-[0.3em] text-brand-accent uppercase">
            About Us
          </p>
          <h1 className="mt-3 mb-10 text-center text-3xl font-bold tracking-wide text-brand-success md:text-4xl">
            会 社 概 要
          </h1>
          <div className="mb-12 flex justify-center">
            <Image
              src="/images/Ic-Growth_color_1.png"
              alt="Ic-Growth ロゴ"
              width={500}
              height={250}
              priority
              className="h-auto w-[200px] md:w-[260px]"
            />
          </div>
          <div className="grid gap-4 md:grid-cols-3 md:gap-6">
            {heroFacts.map((fact) => (
              <Card key={fact.label}>
                <CardHeader className="pt-5">
                  <fact.icon className="size-5 text-brand-accent" />
                  <CardTitle className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                    {fact.label}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-5">
                  <p className="text-lg leading-snug font-bold text-foreground md:text-xl">
                    {fact.value}
                  </p>
                  {fact.sub && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      {fact.sub}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Basic info */}
      <section className="bg-background px-5 py-14 md:py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-2 text-xl font-bold text-brand-success md:text-2xl">
            基本情報
          </h2>
          <Separator className="mb-8 max-w-12 bg-brand-accent" />
          <dl className="divide-y divide-border">
            {detailRows.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-1 gap-2 py-5 md:grid-cols-[180px_1fr] md:gap-6"
              >
                <dt className="flex items-center gap-2 text-sm font-bold text-muted-foreground">
                  <row.icon className="size-4 text-brand-accent" />
                  {row.label}
                </dt>
                <dd className="leading-loose text-foreground">{row.content}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Services */}
      <section className="bg-muted px-5 py-14 md:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-center text-sm font-semibold tracking-[0.3em] text-brand-accent uppercase">
            Our Services
          </p>
          <h2 className="mt-3 mb-10 text-center text-2xl font-bold text-brand-success md:text-3xl">
            弊社サービス
          </h2>
          <div className="grid gap-5 md:grid-cols-2 md:gap-6">
            {serviceCategories.map((cat) => (
              <Card key={cat.title}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <cat.icon className="size-5" />
                    </span>
                    <CardTitle className="text-base font-bold text-foreground md:text-lg">
                      {cat.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pb-6">
                  <ul className="space-y-2.5">
                    {cat.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground"
                      >
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-accent" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Access & CTA */}
      <section className="bg-background px-5 py-14 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 md:gap-12">
          <div>
            <p className="text-sm font-semibold tracking-[0.3em] text-brand-accent uppercase">
              Access
            </p>
            <h2 className="mt-3 mb-2 text-2xl font-bold text-brand-success md:text-3xl">
              本社所在地
            </h2>
            <Separator className="mb-6 max-w-12 bg-brand-accent" />
            <p className="leading-loose text-foreground">
              〒174-0056
              <br />
              東京都板橋区志村１丁目３０番１５号
            </p>
            <a
              href="tel:03-3960-3311"
              className="mt-6 inline-flex items-center gap-2 text-lg font-bold text-foreground transition-colors hover:text-primary"
            >
              <Phone className="size-5 text-[#5fc061]" />
              03-3960-3311
            </a>
            <div className="mt-8">
              <a
                href={CONTACT_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-brand-contact px-6 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#4cae50]"
              >
                お問い合わせフォーム
                <ArrowRight className="size-4" />
              </a>
            </div>
          </div>
          <div className="overflow-hidden rounded-xl ring-1 ring-border">
            <iframe
              src={`https://maps.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&output=embed`}
              title="Ic-Growth 本社地図"
              className="aspect-square w-full md:aspect-auto md:h-full md:min-h-[400px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
