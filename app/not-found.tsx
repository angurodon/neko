import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Home } from "lucide-react";

export const metadata: Metadata = {
  title: "ページが見つかりません",
  description:
    "お探しのページは見つかりませんでした。Ic-Growth コーポレートサイトのホームへ戻るか、各ページをご覧ください。",
};

const CONTACT_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScEXuDiU9GfCsL2Q4nmK9En8xLd8UzVYR6B95K9IKwNAL6GTQ/viewform";

const quickLinks = [
  { href: "/overview", label: "事業概要" },
  { href: "/company", label: "会社概要" },
] as const;

export default function NotFound() {
  return (
    <section className="bg-gradient-to-b from-muted to-background px-5 py-20 md:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold tracking-[0.3em] text-brand-accent uppercase">
          Error 404
        </p>
        <h1 className="mt-6 text-7xl leading-none font-bold tracking-tight text-brand-success md:text-8xl">
          404
        </h1>
        <p className="mt-6 text-lg font-bold text-foreground md:text-xl">
          ページが見つかりません
        </p>
        <p className="mt-3 leading-loose text-muted-foreground">
          お探しのページは移動または削除された可能性があります。
          <br />
          下記からご希望の内容をお探しください。
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
          >
            <Home className="size-4" />
            ホームへ戻る
          </Link>
          <a
            href={CONTACT_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-brand-contact px-6 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#4cae50]"
          >
            お問い合わせ
            <ArrowRight className="size-4" />
          </a>
        </div>
        <div className="mt-12 flex items-center justify-center gap-6 text-sm">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-bold text-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
