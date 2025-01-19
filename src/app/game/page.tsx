"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import fetcher from "@/utils/fetch/client/fetcher";
import { useSession } from "@/hooks/useSession";
import { toast } from "react-toastify";
import { encrypt, signParams } from "@/utils/tools";

export default function Game() {
  const [pageLoading, setPageLoading] = useState(true);
  const session = useSession();

  useEffect(() => {
    setPageLoading(true);
    setTimeout(function () {
      setPageLoading(false);
    }, 2000);
  }, []);

  return (
    <main
      className={
        "max-w-lg min-h-screen mx-auto bg-bg bg-cover bg-top bg-no-repeat"
      }
    >
      <section className="flex flex-col justify-start items-center relative min-h-screen text-black bg-[#EFEFEF]/30">
        111
      </section>
    </main>
  );
}
