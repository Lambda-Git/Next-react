"use client"
import { Key, useEffect, useState } from "react"
import Image from "next/image"
import pointSPng from "@/app/_assets/icons/point-s.png"
import noDataPng from "@/app/_assets/images/no-data.png"
import fetcher from "@/utils/fetch/client/fetcher"
import { useSession } from "@/hooks/useSession"
import { formatNumber, convertTimestampToLocal } from "@/utils/tools"
import InfiniteScroll from "react-infinite-scroll-component"

import Link from "next/link"

import leftPng from "@/app/_assets/icons/left.png"
import { toast } from "react-toastify"
import Loading from "@/components/Loading"

export default function History() {
  const [pageLoading, setPageLoading] = useState(true)
  const session = useSession()
  const [pageNum, setPageNum] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [history, setHistory] = useState<any>(null)
  const [hasMore, setHasMore] = useState(false)

  useEffect(() => {
    init(pageNum, pageSize)
  }, [pageNum])

  const init = async (pageNum: number, pageSize: number) => {
    const res = await fetcher.post(
      "point_getList",
      { pageNum, pageSize },
      session?.initDataRaw,
    )
    if (res.status == 200) {
      let data = res.json.result
      if (data.success) {
        let dataList = data.data.dataList
        if (pageNum > 1) {
          dataList = [...history.dataList, ...data.data.dataList]
          setHistory({
            ...history,
            pageNum,
            dataList: dataList,
          })
        } else {
          setHistory(data.data)
        }
        if (dataList.length >= data.data.totalCount) {
          setHasMore(false)
        } else {
          setHasMore(true)
        }
      } else {
        if (data.code == 10102) {
          toast.error("Login timed out, please re-enter.")
        } else {
          toast.error(data.msg)
        }
      }
    }
    setPageLoading(false)
  }

  {
    return pageLoading ? (
      <Loading />
    ) : (
      <main className={"max-w-lg min-h-screen mx-auto text-black bg-white"}>
        <section className="flex flex-row justify-between items-center bg-white">
          <div className=" text-center relative w-full h-12">
            <Link href={"/"} className="block absolute left-0 top-0 h-12 w-12">
              <Image src={leftPng} alt="left" className="w-6 h-6 m-3" />
            </Link>
            <h1 className="h-12 leading-[3rem]">Points Record</h1>
          </div>
        </section>
        <section>
          <div className="flex flex-col pb-32 bg-white">
            {/* list scroll */}
            <div className="flex flex-col overflow-y-scroll">
              {history ? (
                <InfiniteScroll
                  dataLength={history.dataList.length}
                  next={() => {
                    setPageNum((prevPage) => prevPage + 1)
                  }}
                  hasMore={hasMore}
                  loader={<h4>Loading...</h4>}
                  endMessage={""}
                  scrollableTarget="scrollableDiv"
                >
                  {history.dataList.map(
                    (list: any, i: Key | null | undefined) => (
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
                          <div className="text-sm text-[#6F7282]">Date</div>
                          <div className="text-[#6F7282]">
                            {convertTimestampToLocal(list.createTime)}
                          </div>
                        </div>
                      </div>
                    ),
                  )}
                </InfiniteScroll>
              ) : (
                <div className="flex flex-col justify-center items-center h-[80vh] px-4 gap-4">
                  <Image src={noDataPng} alt="no data" className=" w-40" />
                  <span className="text-xl font-bold">
                    There‘s nothing here yet
                  </span>
                </div>
              )}
            </div>
          </div>
        </section>
        <div className="text-center text-sm text-[#6F7282] fixed bottom-[60px] left-0 w-full bg-white py-1">
          Only show the latest 100 records
        </div>
      </main>
    )
  }
}
