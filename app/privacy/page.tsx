import type { Metadata } from "next";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "個人情報保護方針",
  description:
    "株式会社 Ic-Growth の個人情報保護方針について。個人情報の管理、利用目的、第三者提供、安全対策などを記載しています。",
};

const sections = [
  {
    title: "1. 個人情報の管理",
    body: (
      <p>
        当社は、お客さまの個人情報を正確かつ最新の状態に保ち、個人情報への不正アクセス・紛失・破損・改ざん・漏洩などを防止するため、セキュリティシステムの維持・管理体制の整備・社員教育の徹底等の必要な措置を講じ、安全対策を実施し個人情報の厳重な管理を行ないます。
      </p>
    ),
  },
  {
    title: "2. 個人情報の利用目的",
    body: (
      <p>
        お客さまからお預かりした個人情報は、当社からのご連絡や業務のご案内やご質問に対する回答として、電子メールや資料のご送付に利用いたします。
      </p>
    ),
  },
  {
    title: "3. 個人情報の第三者への開示・提供の禁止",
    body: (
      <>
        <p>
          当社は、お客さまよりお預かりした個人情報を適切に管理し、次のいずれかに該当する場合を除き、個人情報を第三者に開示いたしません。
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-6">
          <li>お客さまの同意がある場合</li>
          <li>
            お客さまが希望されるサービスを行なうために当社が業務を委託する業者に対して開示する場合
          </li>
          <li>法令に基づき開示することが必要である場合</li>
        </ul>
      </>
    ),
  },
  {
    title: "4. 個人情報の安全対策",
    body: (
      <p>
        当社は、個人情報の正確性及び安全性確保のために、セキュリティに万全の対策を講じています。
      </p>
    ),
  },
  {
    title: "5. ご本人の照会",
    body: (
      <p>
        お客さまがご本人の個人情報の照会・修正・削除などをご希望される場合には、ご本人であることを確認の上、対応させていただきます。
      </p>
    ),
  },
  {
    title: "6. 法令、規範の遵守と見直し",
    body: (
      <p>
        当社は、保有する個人情報に関して適用される日本の法令、その他規範を遵守するとともに、本ポリシーの内容を適宜見直し、その改善に努めます。
      </p>
    ),
  },
  {
    title: "7. お問い合せ",
    body: (
      <>
        <p className="mb-3">
          当社の個人情報の取扱に関するお問い合せは下記までご連絡ください。
        </p>
        <p>
          <a
            href="mailto:ic-growth-aoi@ic-gr.com"
            className="text-primary underline-offset-4 hover:underline"
          >
            ic-growth-aoi@ic-gr.com
          </a>
        </p>
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <div className="bg-gradient-to-b from-muted to-background">
      <article className="mx-auto max-w-3xl px-5 py-14 leading-loose text-foreground md:py-20">
        <h1 className="mb-3 text-center text-2xl font-bold text-brand-success md:text-3xl">
          個人情報保護方針について
        </h1>
        <Separator className="mx-auto mb-8 max-w-16 bg-brand-accent" />
        <p className="mb-10 text-muted-foreground">
          株式会社Ｉｃ－Ｇｒｏｗｔｈ（以下「当社」）は、以下のとおり個人情報保護方針を定め、個人情報保護の仕組みを構築し、全従業員に個人情報保護の重要性の認識と取組みを徹底させることにより、個人情報の保護を推進致します。
        </p>

        <div className="space-y-8">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="mb-3 text-lg font-bold text-foreground">
                {section.title}
              </h2>
              <div className="text-muted-foreground">{section.body}</div>
            </section>
          ))}
        </div>
      </article>
    </div>
  );
}
