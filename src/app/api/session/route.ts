import { NextRequest, NextResponse } from "next/server"
import fetcher from "@/utils/fetch/server/fetcher"

type ServiceReq = {
  path: string
  method: string
  data: any
  token?: string
}

export async function POST(req: NextRequest) {
  const r: ServiceReq = await req.json()
  if (!r.path || !r.method) {
    return NextResponse.json({ err: "RequestInvalid" }, { status: 400 })
  }
  const response = await fetcher.request(
    r.method,
    r.path,
    r.data || null,
    r.token || "",
  )
  if (response.json) {
    return NextResponse.json(response.json, { status: response.status })
  }

  return new NextResponse(response.body, { status: response.status })
}
