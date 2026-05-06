import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
] as const;

export default function Backup() {
  return (
    <section className="bg-background px-5 py-14 md:py-20">
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="mb-3 text-3xl font-bold tracking-wide text-brand-success md:text-4xl">
          事 業 概 要
        </h2>
        <p className="mb-10 text-base text-muted-foreground md:text-lg">
          我々は下記サービスを導入支援いたします
        </p>
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
                <CardContent className="pb-6">
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
  );
}
