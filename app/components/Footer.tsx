import Link from "next/link";
import Image from "next/image";

const CONTACT_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScEXuDiU9GfCsL2Q4nmK9En8xLd8UzVYR6B95K9IKwNAL6GTQ/viewform";

export default function Footer() {
  return (
    <footer className="bg-[#2c3841] py-2.5 text-white">
      <div className="mx-auto flex max-w-[1200px] flex-col justify-between gap-5 px-4 md:flex-row">
        <div className="order-3 mt-12 flex-[4] text-center md:order-1 md:text-left">
          <Image
            src="/images/Ic-Growth_white_2.png"
            alt="Ic-Growth ロゴ"
            width={400}
            height={120}
            className="mb-2.5 inline-block w-[70%] md:w-[40%]"
          />
          <Link
            href="/privacy"
            className="mb-5 block text-sm text-[#9b59b6] md:pl-15"
          >
            <h4 className="mb-2.5 text-base md:text-lg">
              個人情報保護方針について
            </h4>
          </Link>
        </div>

        <div className="order-1 flex-1 md:order-2">
          <ul className="m-0 mt-5 list-none p-0 md:mt-[70px]">
            <li className="mb-2.5">
              <Link
                href="/overview"
                className="text-base text-white transition-colors hover:text-[#9b59b6] md:text-lg"
              >
                事業概要
              </Link>
            </li>
            <li className="mb-2.5">
              <Link
                href="/company"
                className="text-base text-white transition-colors hover:text-[#9b59b6] md:text-lg"
              >
                会社概要
              </Link>
            </li>
            <li className="mb-2.5">
              <a
                href={CONTACT_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base text-white transition-colors hover:text-[#9b59b6] md:text-lg"
              >
                お問い合わせ
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
