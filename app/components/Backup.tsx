import Link from "next/link";
import Image from "next/image";

const cards = [
  {
    href: "/overview#system-support",
    src: "/images/backup_system.png",
    alt: "経理システムの導入支援",
    title: "経理システムの導入支援",
  },
  {
    href: "/overview#business-support",
    src: "/images/backup_ec.png",
    alt: "経理支援アイコン",
    title: "経理支援",
  },
  {
    href: "/overview#msa-support",
    src: "/images/MAS.png",
    alt: "MAS",
    title: "経営アドバイザリーサービス",
  },
];

export default function Backup() {
  return (
    <div className="bg-white px-5 py-10 text-center md:py-12">
      <h1 className="mb-2.5 text-3xl font-bold text-[#215126] md:text-4xl">
        事 業 概 要
      </h1>
      <p className="mb-7 text-base text-[#555]">
        我々は下記サービスを導入支援いたします
      </p>
      <div className="flex flex-col flex-wrap justify-center gap-5 md:flex-row md:gap-[150px]">
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
    </div>
  );
}
