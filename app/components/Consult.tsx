import { Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function Consult() {
  return (
    <section className="bg-muted px-5 py-16 md:py-20">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-8 text-2xl font-bold text-brand-success md:text-3xl">
          無料相談はこちらから
        </h2>
        <Card className="overflow-hidden">
          <CardContent className="px-0">
            <a
              href="tel:03-3960-3311"
              className="group flex flex-col items-center justify-center gap-4 px-6 py-10 text-center md:flex-row md:gap-8 md:py-12"
            >
              <span className="relative flex size-20 items-center justify-center md:size-24">
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-full bg-[#5fc061]/15"
                />
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-full bg-[#5fc061]/40 opacity-0 group-hover:animate-ping"
                />
                <Phone className="relative size-8 text-[#5fc061] group-hover:animate-[ring_0.6s_ease-in-out_infinite] md:size-10" />
              </span>
              <span className="flex flex-col items-center md:items-start">
                <span className="text-sm font-medium text-muted-foreground">
                  お電話でのお問い合わせ
                </span>
                <span className="text-3xl font-bold tracking-wide text-foreground md:text-4xl">
                  03-3960-3311
                </span>
              </span>
            </a>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
