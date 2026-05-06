import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const CONTACT_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScEXuDiU9GfCsL2Q4nmK9En8xLd8UzVYR6B95K9IKwNAL6GTQ/viewform";

export default function SectionComponent1() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-muted to-background px-5 py-16 md:px-10 md:py-24">
      <div className="mx-auto flex min-h-[60vh] max-w-6xl flex-col items-center gap-12 md:flex-row">
        <div className="flex-1 space-y-6 text-center md:text-left">
          <p className="text-sm font-semibold tracking-[0.3em] text-brand-accent uppercase">
            Accounting Transformation
          </p>
          <h1 className="text-3xl leading-tight font-bold text-foreground md:text-4xl lg:text-5xl">
            個人と企業の成長に
            <br className="hidden md:block" />
            貢献します
          </h1>
          <p className="text-sm text-muted-foreground md:text-base">
            Contribute to the growth of individuals and companies
          </p>
          <p className="leading-loose text-muted-foreground md:text-lg">
            日本の近未来における厳しい環境化であっても
            <br />
            持続的成長を遂げるために
            <br />
            有限である経営資源（ヒト・モノ・カネ・時間）活用の最適化を図ることを使命とします。
            <br />
            我々はこの使命を「会計をエネルギーに変換すること」で実現します。
            <br />
            <span className="font-semibold text-foreground">
              「Accounting Transformation」「AX」
            </span>
            の実現を目指します。
          </p>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <Image
            src="/images/Ic-Growth_color_1.png"
            alt="Ic-Growth Logo"
            width={500}
            height={250}
            priority
            className="w-full max-w-md object-contain transition-transform duration-300 hover:scale-105"
          />
        </div>
      </div>
    </section>
  );
}
