"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const CONTACT_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScEXuDiU9GfCsL2Q4nmK9En8xLd8UzVYR6B95K9IKwNAL6GTQ/viewform";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);
  const toggleMenu = () => setIsMenuOpen((open) => !open);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex h-[75px] items-center justify-between bg-white px-5 py-2.5 shadow-sm">
      <div className="z-[1001] flex items-center">
        <Link href="/" onClick={closeMenu} aria-label="ホームへ戻る">
          <Image
            src="/images/logo_side.png"
            alt="Ic-Growth ロゴ"
            width={160}
            height={40}
            priority
            className="h-10 w-auto transition-transform duration-300 hover:scale-110"
          />
        </Link>
      </div>

      {/* ハンバーガーアイコン (モバイル) */}
      <button
        type="button"
        onClick={toggleMenu}
        aria-label="メニューを開閉"
        aria-expanded={isMenuOpen}
        className="absolute right-12 z-[1002] flex flex-col gap-1 sm:hidden"
      >
        {isMenuOpen ? (
          <span className="text-3xl leading-none text-gray-800">×</span>
        ) : (
          <>
            <span className="block h-[3px] w-6 bg-gray-800" />
            <span className="block h-[3px] w-6 bg-gray-800" />
            <span className="block h-[3px] w-6 bg-gray-800" />
          </>
        )}
      </button>

      {/* ナビゲーション (デスクトップは inline、モバイルはサイドメニュー) */}
      <nav
        className={[
          "fixed top-0 h-screen w-[250px] flex-col bg-white pt-12 shadow-[-2px_0_5px_rgba(0,0,0,0.5)] transition-[right] duration-300",
          isMenuOpen ? "right-[-50px]" : "right-[-100%]",
          "sm:static sm:flex sm:h-auto sm:w-auto sm:flex-row sm:items-center sm:bg-transparent sm:pt-0 sm:shadow-none",
          "flex",
        ].join(" ")}
      >
        <ul className="m-0 flex list-none flex-col p-0 text-center sm:flex-row sm:mr-5">
          <li className="my-5 sm:mx-5 sm:my-0">
            <Link
              href="/"
              onClick={closeMenu}
              className="text-lg font-bold text-gray-800"
            >
              ホーム
            </Link>
          </li>
          <li className="my-5 sm:mx-5 sm:my-0">
            <Link
              href="/overview"
              onClick={closeMenu}
              className="text-lg font-bold text-gray-800"
            >
              事業概要
            </Link>
          </li>
          <li className="my-5 sm:mx-5 sm:my-0">
            <Link
              href="/company"
              onClick={closeMenu}
              className="text-lg font-bold text-gray-800"
            >
              会社概要
            </Link>
          </li>
        </ul>
        <div className="mt-8 sm:mt-0">
          <a
            href={CONTACT_FORM_URL}
            onClick={closeMenu}
            className="rounded-md bg-green-600 px-5 py-2.5 text-white"
            target="_blank"
            rel="noopener noreferrer"
          >
            お問い合わせ
          </a>
        </div>
      </nav>
    </header>
  );
}
