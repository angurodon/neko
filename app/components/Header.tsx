import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const CONTACT_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScEXuDiU9GfCsL2Q4nmK9En8xLd8UzVYR6B95K9IKwNAL6GTQ/viewform";

const navLinks = [
  { href: "/", label: "ホーム" },
  { href: "/overview", label: "事業概要" },
  { href: "/company", label: "会社概要" },
] as const;

const ctaClass =
  "inline-flex h-10 items-center justify-center rounded-md bg-brand-contact px-5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#4cae50] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-contact/40";

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex h-[75px] items-center justify-between border-b border-border bg-background/95 px-5 py-2.5 shadow-sm supports-[backdrop-filter]:bg-background/85 supports-[backdrop-filter]:backdrop-blur">
      <Link href="/" aria-label="ホームへ戻る" className="flex items-center">
        <Image
          src="/images/logo_side.png"
          alt="Ic-Growth ロゴ"
          width={160}
          height={40}
          priority
          className="h-10 w-auto transition-transform duration-300 hover:scale-110"
        />
      </Link>

      <nav className="hidden items-center gap-8 sm:flex">
        <ul className="flex items-center gap-6 text-base font-bold text-foreground">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <a
          href={CONTACT_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={ctaClass}
        >
          お問い合わせ
        </a>
      </nav>

      <Sheet>
        <SheetTrigger
          aria-label="メニューを開閉"
          className="inline-flex size-10 items-center justify-center rounded-md text-foreground transition-colors hover:bg-muted sm:hidden"
        >
          <Menu className="size-6" />
        </SheetTrigger>
        <SheetContent side="right" className="w-[280px] sm:max-w-sm">
          <SheetTitle className="sr-only">メニュー</SheetTitle>
          <nav className="flex h-full flex-col gap-8 px-6 pt-12">
            <ul className="flex flex-col gap-1 text-base font-bold text-foreground">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <SheetClose
                    render={<Link href={link.href} />}
                    className="block rounded-md px-2 py-3 text-left transition-colors hover:bg-muted hover:text-primary"
                  >
                    {link.label}
                  </SheetClose>
                </li>
              ))}
            </ul>
            <SheetClose
              render={
                <a
                  href={CONTACT_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
              className={ctaClass}
            >
              お問い合わせ
            </SheetClose>
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
}
