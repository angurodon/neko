import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

const CONTACT_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScEXuDiU9GfCsL2Q4nmK9En8xLd8UzVYR6B95K9IKwNAL6GTQ/viewform";

const COPYRIGHT_YEAR = new Date().getFullYear();

const linkClass =
  "text-base text-white/90 transition-colors hover:text-[#9b59b6] md:text-lg";

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-8 px-6 py-12 md:flex-row md:items-start md:justify-between">
        <div className="flex flex-col items-center gap-4 text-center md:items-start md:text-left">
          <Image
            src="/images/Ic-Growth_white_2.png"
            alt="Ic-Growth ロゴ"
            width={400}
            height={120}
            className="w-[60%] md:w-[280px]"
          />
          <Link
            href="/privacy"
            className="text-sm text-[#c79be0] transition-colors hover:text-white"
          >
            個人情報保護方針について
          </Link>
        </div>

        <nav className="flex justify-center md:justify-end">
          <ul className="flex flex-col gap-3">
            <li>
              <Link href="/overview" className={linkClass}>
                事業概要
              </Link>
            </li>
            <li>
              <Link href="/company" className={linkClass}>
                会社概要
              </Link>
            </li>
            <li>
              <a
                href={CONTACT_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                お問い合わせ
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <Separator className="bg-white/10" />
      <p className="px-6 py-4 text-center text-xs text-white/60">
        © {COPYRIGHT_YEAR} Ic-Growth Co., Ltd.
      </p>
    </footer>
  );
}
