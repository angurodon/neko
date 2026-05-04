import Image from "next/image";

export default function SectionComponent1() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-between gap-6 bg-gradient-to-b from-[#f5f7fa] to-[#e9ecef] px-5 py-10 md:flex-row md:px-10">
      <div className="flex-1 px-2 text-center md:px-5 md:text-left">
        <p className="mb-5 text-base leading-loose text-[#555] md:text-xl">
          <strong>個人と企業の成長に貢献します！</strong>
          <br />
          Contribute to the growth of individuals and companies
        </p>
        <p className="mb-5 text-base leading-loose text-[#555] md:text-xl">
          日本の近未来における厳しい環境化であっても
          <br />
          持続的成長を遂げるために
          <br />
          有限である経営資源（ヒト・モノ・カネ・時間）活用の最適化を図ることを使命とします。
          <br />
          我々はこの使命を「会計をエネルギーに変換すること」で実現します。
          <br />
          「Accounting Transformation」「AX」の実現を目指します。
        </p>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center px-2 md:px-5">
        <Image
          src="/images/Ic-Growth_color_1.png"
          alt="Ic-Growth Logo"
          width={500}
          height={250}
          className="max-h-[200px] w-auto max-w-[80%] object-contain transition-transform duration-300 hover:scale-110 md:max-h-[250px] md:max-w-full"
        />
      </div>
    </div>
  );
}
