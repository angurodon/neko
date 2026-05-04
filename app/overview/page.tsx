import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

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
];

export default function OverviewPage() {
  return (
    <div>
      <div>
        <h1 className="mt-7 mb-2.5 text-center text-3xl font-bold text-[#215126] md:text-4xl">
          事 業 概 要
        </h1>
      </div>

      <div className="flex flex-col flex-wrap justify-center gap-5 px-5 py-8 md:flex-row md:gap-[150px]">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="block max-w-full rounded-xl bg-white p-5 text-inherit shadow-md transition-all duration-300 hover:-translate-y-2.5 hover:shadow-lg md:max-w-[300px] md:min-w-[250px] md:flex-1"
          >
            <div className="mb-4 flex justify-center">
              <Image
                src={card.src}
                alt={card.alt}
                width={100}
                height={100}
                className="h-20 w-20 object-contain md:h-[100px] md:w-[100px]"
              />
            </div>
            <h2 className="mb-7 pt-5 text-xl text-gray-800 md:text-2xl">
              {card.title}
            </h2>
          </Link>
        ))}
      </div>

      <section
        id="business-support"
        className="bg-[#f5f7fa] px-5 py-12 md:px-20"
      >
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-5 text-2xl font-bold text-[#215126] md:text-3xl">
            経理支援
          </h2>
          <p className="mb-5 leading-loose text-[#555]">
            経理の人材不足が中小企業経営に大きな課題をもたらしています。新しいシステムの導入後の不慣れな時期や経理担当者の一時的な不在時に備え、様々なサービスをご用意しております。
          </p>
          <ul className="list-disc space-y-3 pl-6 leading-loose text-[#555]">
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
            <li>
              請求書の発行、支払請求書の整理などのお手伝いをいたします。
            </li>
            <li>給与計算業務のお手伝いをいたします。</li>
          </ul>
        </div>
      </section>

      <section id="system-support" className="bg-white px-5 py-12 md:px-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-5 text-2xl font-bold text-[#215126] md:text-3xl">
            経理システム導入支援（経理の自動化）
          </h2>
          <p className="mb-5 leading-loose text-[#555]">
            <strong>経理の自動化</strong>
            は、多くの企業や組織にとって欠かせない取り組みとなっています。経理や会計の状況が健全であること、すなわち
            <strong>正確性</strong>や<strong>迅速性</strong>、そして
            <strong>透明性</strong>
            を備えていることは、経営において非常に重要な要素です。
          </p>
          <ul className="list-disc space-y-3 pl-6 leading-loose text-[#555]">
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
        </div>
      </section>

      <section id="msa-support" className="bg-[#f5f7fa] px-5 py-12 md:px-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-2 text-2xl font-bold text-[#215126] md:text-3xl">
            経営支援
          </h2>
          <h3 className="mb-5 text-lg font-semibold text-[#215126]">
            MAS（経営アドバイザリーサービス）
          </h3>
          <p className="mb-5 leading-loose text-[#555]">
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

          <div className="space-y-8">
            <article>
              <h4 className="mb-3 text-lg font-bold text-gray-800">
                戦略的意思決定のサポート
              </h4>
              <p className="mb-3 leading-loose text-[#555]">
                企業の経営陣に対して、会計データを共有しながら戦略的な意思決定を促します。
                <br />
                さらに会計データに留まらず市場動向、情勢、リスク、成長機会などの情報も共有しながら、
                <br />
                最適な戦略を一緒に考え企業の競争力を維持し、成長戦略を展開するのに役立てます。
              </p>
              <p className="leading-loose text-[#555]">
                また損益計算書、貸借対照表の将来像を経営戦略に落とし込んでいくイメージでデータを必要に応じて
                <br />
                細分化、経営資源を最適に活用、加えて事業の拡大・縮小・統合・連携等に繋がるようにコーチングして参ります。
              </p>
            </article>

            <article>
              <h4 className="mb-3 text-lg font-bold text-gray-800">
                資金調達と運用に関する管理サポート
              </h4>
              <p className="mb-3 leading-loose text-[#555]">
                新規設備投資、法人の組織再編、新しいプロジェクトに関する資金計画だけでなく、
                <br />
                通常の運転資金と短中長期にわたるキャッシュフロー管理を財務会計、管理会計の両面から戦略的なアドバイスを提供します。
              </p>
              <p className="leading-loose text-[#555]">
                このキャッシュフロー管理と前者の戦略的意思決定とはお互いにフィードバックすることを通して重要な影響を及ぼしあう関係性を持ちます。
              </p>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}
