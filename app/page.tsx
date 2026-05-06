import type { Metadata } from "next";
import SectionComponent1 from "./components/SectionComponent1";
import Backup from "./components/Backup";
import Consult from "./components/Consult";

export const metadata: Metadata = {
  description:
    "Ic-Growth は経理システム導入支援、経理支援、経営アドバイザリーサービス（MAS）で企業の事業成長を支援します。",
};

export default function HomePage() {
  return (
    <>
      <SectionComponent1 />
      <Backup />
      <Consult />
    </>
  );
}
