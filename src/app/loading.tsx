"use client"

import ReactLoading from "react-loading"
import Image from "next/image"
import loadingGif from "@/app/_assets/images/loading.gif"

export default function Loading() {
  return (
    <main className="max-w-md min-h-screen mx-auto text-white bg-cover bg-top bg-no-repeat">
      <div className=" flex flex-col items-center justify-center min-h-screen">
        <ReactLoading type={"bars"} color={"#0500FF"} />
      </div>
    </main>
  )
}
