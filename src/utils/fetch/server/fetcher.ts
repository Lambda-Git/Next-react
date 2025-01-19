export type ResponseData = {
  success: boolean
  err: string
  params?: string[]
  data?: any
}

export type ClientResponse = {
  status: number
  json: ResponseData
  body?: string
}
const fetcher = {
  async request(method: string, path: string, data: any = null, token: string) {
    const options = getOptions(method, path, data, token)
    return send(toUrl(path), options)
  },
}
function getOptions(
  method: string,
  path: string,
  data: any = null,
  token: string,
) {
  const options: RequestInit = {
    method: method.toUpperCase(),
    credentials: "include",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  }

  let tmpData = {
    id: 0,
    jsonrpc: "2.0",
    method: path,
    params: {},
  }
  if (data !== null) {
    tmpData.params = data
  } else {
  }
  options.body = JSON.stringify(tmpData)

  return options
}

async function send(
  url: string,
  options: RequestInit,
  callback: (res: Response) => void = () => void 0,
) {
  try {
    const res = await fetch(url, options)
    const ret: ClientResponse = {
      status: res.status,
      json: {
        err: "unknownError",
        success: false,
      },
    }

    const body = await res.text()
    if (body) {
      try {
        ret.json = JSON.parse(body)
        callback(res)
      } catch (e) {
        ret.body = body
      }
    }
    return ret
  } catch (e) {
    return catchError(e)
  }
}

function catchError(e: any) {
  console.error(e)
  return {
    status: 599,
    json: {
      err: "networkError",
    },
    body: `${e}`,
  } as ClientResponse
}
const toUrl = (path: string) => {
  return `${process.env.NEXT_PUBLIC_API_URL}`
}

export default fetcher
