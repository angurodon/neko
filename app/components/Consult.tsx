import Image from "next/image";

export default function Consult() {
  return (
    <div className="min-h-[40vh] bg-[#f5f7fa] p-5">
      <div className="bg-[#f5f7fa]">
        <h2 className="mt-5 mb-0 ml-[10%] text-2xl font-bold text-[#5fc061]">
          無料相談はこちらから
        </h2>
      </div>
      <div className="flex min-h-[20vh] flex-col items-center justify-center bg-[#f5f7fa] text-center text-gray-800">
        <a
          href="tel:03-3960-3311"
          className="group relative mt-12 flex items-center justify-center overflow-hidden rounded-xl border-2 border-[#A2E699] bg-white px-5 py-4 text-gray-800 shadow-md transition-colors hover:bg-[#58cf49]"
        >
          <span className="relative z-10 mr-4 flex items-center">
            <Image
              src="/images/phone.png"
              alt="電話アイコン"
              width={112}
              height={112}
              className="h-16 w-16 object-contain md:h-28 md:w-28"
            />
          </span>
          <span className="relative z-10">
            <span className="block text-2xl font-bold text-gray-800 transition-colors group-hover:text-white md:text-3xl">
              TEL:03-3960-3311
            </span>
          </span>
        </a>
      </div>
    </div>
  );
}
