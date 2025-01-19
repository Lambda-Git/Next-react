"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import fetcher from "@/utils/fetch/client/fetcher";
import pointSPng from "@/app/_assets/icons/point-s.png";
import { useSession } from "@/hooks/useSession";
import { formatNumber, convertTimestampToUTC } from "@/utils/tools";
import InfiniteScroll from "react-infinite-scroll-component";
import { toast } from "react-toastify";

export default function Invite() {
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [pageLoading, setPageLoading] = useState(true);
  const [history, setHistory] = useState<any>(null);
  const [hasMore, setHasMore] = useState(false);
  const session = useSession();

  useEffect(() => {
    setPageLoading(true);
    setTimeout(function () {
      setPageLoading(false);
      init();
    }, 2000);
  }, []);

  const init = () => {
    setHistory([
      { recordCodeMsg: "1111", changePoints: "10", createTime: new Date() },
      { recordCodeMsg: "1111", changePoints: "10", createTime: new Date() },
      { recordCodeMsg: "1111", changePoints: "10", createTime: new Date() },
      { recordCodeMsg: "1111", changePoints: "10", createTime: new Date() },
      { recordCodeMsg: "1111", changePoints: "10", createTime: new Date() },
      { recordCodeMsg: "1111", changePoints: "10", createTime: new Date() },
      { recordCodeMsg: "1111", changePoints: "10", createTime: new Date() },
      { recordCodeMsg: "1111", changePoints: "10", createTime: new Date() },
      { recordCodeMsg: "1111", changePoints: "10", createTime: new Date() },
      { recordCodeMsg: "1111", changePoints: "10", createTime: new Date() },
      { recordCodeMsg: "1111", changePoints: "10", createTime: new Date() },
      { recordCodeMsg: "1111", changePoints: "10", createTime: new Date() },
    ]);
  };

  return (
    <main
      className={
        "max-w-lg min-h-screen mx-auto bg-white bg-cover bg-top bg-no-repeat text-black"
      }
    >
      <section>
        <div className="flex flex-col pb-32 bg-white">
          {/* list */}
          <div className="flex flex-col overflow-y-scroll">
            {history ? (
              <InfiniteScroll
                dataLength={history.length}
                next={() => {
                  setPageNum((prevPage) => prevPage + 1);
                }}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                endMessage={""}
                scrollableTarget="scrollableDiv"
              >
                {history.map((list: any, i: any) => (
                  <div
                    key={i}
                    className="flex flex-row justify-between items-center p-4 border-b border-[#E9EBF1]"
                  >
                    <div className="flex flex-col items-start gap-2">
                      <div className=" text-sm text-[#6F7282]">
                        {list.recordCodeMsg}
                      </div>
                      <div className="flex flex-row gap-1 justify-center items-center">
                        <Image
                          src={pointSPng}
                          alt="point"
                          className=" w-4 h-4"
                        />
                        <b>x {formatNumber(list.changePoints)}</b>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2 min-w-36">
                      <div className="text-sm text-[#6F7282]">Date (UTC+0)</div>
                      <div className="text-[#6F7282]">
                        {convertTimestampToUTC(list.createTime)}
                      </div>
                    </div>
                  </div>
                ))}
              </InfiniteScroll>
            ) : (
              <div className="flex flex-row justify-center items-center h-16 px-4">
                No data
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
