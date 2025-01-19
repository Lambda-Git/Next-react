"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { formatNumber } from "@/utils/tools";
import fetcher from "@/utils/fetch/client/fetcher";
import { useSession } from "@/hooks/useSession";
import { toast } from "react-toastify";
import { Spacer, Skeleton, Spinner, Card } from "@nextui-org/react";
import Loading from "@/components/Loading";
import Swiper from "react-id-swiper";
import 'swiper/swiper.css'

export default function Task() {
  const [pageLoading, setPageLoading] = useState(true);
  const session = useSession();

  useEffect(() => {
    setPageLoading(true);
    setTimeout(function () {
      setPageLoading(false);
    }, 2000);
  }, []);

  const params = {
    slidesPerView: 3,
    spaceBetween: 30,
    slidesPerGroup: 3,
    loop: true,
    loopFillGroupWithBlank: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  };

  return (
    <main
      className={
        "max-w-lg min-h-screen mx-auto bg-bg bg-cover bg-top bg-no-repeat"
      }
    >
      {pageLoading && (
        <div className="flex items-center justify-center h-screen">
          <Spinner className="text-center" label="Loading..." color="warning" />
        </div>
      )}
      {!pageLoading && (
        <section className="flex flex-col justify-start items-center relative min-h-screen text-black bg-[#EFEFEF]/30">
          <Swiper {...params}>
            <div>Slide #1</div>
            <div>Slide #2</div>
            <div>Slide #3</div>
            <div>Slide #4</div>
            <div>Slide #5</div>
          </Swiper>
          <div className="flex">
            <Card className="w-[200px] space-y-5 p-4">
              <div className="h-24 rounded-lg bg-default-300"></div>
              <div className="space-y-3">
                <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
              </div>
            </Card>
            <Spacer x={4} />
            <Card className="w-[200px] space-y-5 p-4">
              <div className="h-24 rounded-lg bg-default-300"></div>
              <div className="space-y-3">
                <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
              </div>
            </Card>
          </div>
          <div className="flex mt-5">
            <Card className="w-[200px] space-y-5 p-4">
              <div className="h-24 rounded-lg bg-default-300"></div>
              <div className="space-y-3">
                <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
              </div>
            </Card>
            <Spacer x={4} />
            <Card className="w-[200px] space-y-5 p-4">
              <div className="h-24 rounded-lg bg-default-300"></div>
              <div className="space-y-3">
                <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
              </div>
            </Card>
          </div>
          <div className="flex mt-5">
            <Card className="w-[200px] space-y-5 p-4">
              <div className="h-24 rounded-lg bg-default-300"></div>
              <div className="space-y-3">
                <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
              </div>
            </Card>
            <Spacer x={4} />
            <Card className="w-[200px] space-y-5 p-4">
              <div className="h-24 rounded-lg bg-default-300"></div>
              <div className="space-y-3">
                <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
              </div>
            </Card>
          </div>
        </section>
      )}
    </main>
  );
}
