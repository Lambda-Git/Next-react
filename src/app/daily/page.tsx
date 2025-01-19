"use client";
import { useEffect } from "react";
import Image from "next/image";
import pointPng from "@/app/_assets/icons/point.png";
import Link from "next/link";
import fetcher from "@/utils/fetch/client/fetcher";
import { useSession } from "@/hooks/useSession";
import { useRouter } from "next/navigation";

export default function Daily() {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    
  }, []);

 

  return (
    <main
      className={
        "max-w-lg min-h-screen mx-auto bg-bg bg-cover bg-top bg-no-repeat text-black"
      }
    >
      <section className="flex flex-col justify-between items-center relative min-h-screen pt-20 pb-48 bg-gradient-to-br from-white/0 to-[#F4F4F7]/90">
        <h1 className="text-2xl font-bold *mt-40">Your daily record</h1>
        <article className="text-lg text-center *mt-28">
          <p className=" text-7xl font-bold text-[#0500FF]">100</p>
          <p className=" flex flex-row items-center gap-2">
            <Image src={pointPng} alt="daily" className="w-6 h-6" />
            <span className="">Points earned</span>
          </p>
        </article>
        <div className="text-[#6F7282] text-center *mt-40 mx-4">
          Come back tomorrow to continue receiving your sign-in rewards!
        </div>
        <Link href={"/"} className="w-full block absolute bottom-28 px-4">
          <button className="bg-[#0500FF] w-full h-12 text-white rounded-full mt-3 font-bold">
            Continue
          </button>
        </Link>
      </section>
    </main>
  );
}
