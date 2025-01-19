"use client"

export type ResponseData = {
  result: any
  msg: string
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
  get(path: string, data: any = null) {
    return this.request("GET", path, data)
  },

  post(path: string, data?: any, token?: string) {
    return this.request("POST", path, data, token)
  },

  put(path: string, data: any, token?: string) {
    return this.request("PUT", path, data)
  },

  delete(path: string, data: any, token?: string) {
    return this.request("DELETE", path, data)
  },

  patch(path: string, data: any, token?: string) {
    return this.request("PATCH", path, data)
  },

  head(path: string, data: any = null, token?: string) {
    return this.request("HEAD", path, data)
  },

  async request(
    method: string,
    path: string,
    data: any = null,
    token?: string,
  ) {
    const tokenStr = localStorage.getItem("token") as string
    const refreshTokenStr = localStorage.getItem("refreshToken") as string
    let res
    if (path == "user_login") {
      const options = getOptions(method, path, data, "tma " + token)
      res = await send("/api/session", options)
    } else {
      const options = getOptions(method, path, data, "Bearer " + tokenStr)
      res = await send("/api/service", options)
    }
    if (res.status == 200) {
      if (res.json.result.code == 10101) {
        const options = getOptions("POST", "user_refreshToken", {
          refreshToken: refreshTokenStr,
        })
        const resToken = await send("/api/service", options)
        if (resToken.status == 200) {
          if (resToken.json.result.code == 0) {
            localStorage.setItem("token", resToken.json.result.data.token)
            localStorage.setItem(
              "refreshToken",
              resToken.json.result.data.refreshToken,
            )
            localStorage.setItem(
              "refreshTokenExpireAt",
              resToken.json.result.data.refreshTokenExpireAt,
            )
            const options = getOptions(
              method,
              path,
              data,
              "Bearer " + resToken.json.result.data.token,
            )
            res = await send("/api/service", options)
          }
          if (resToken.json.result.code == 10102) {
            localStorage.removeItem("token")
            localStorage.removeItem("refreshToken")
            localStorage.removeItem("refreshTokenExpireAt")
            res = resToken
          }
        }
      }
    }
    return res
  },
}
function getOptions(
  method: string,
  path: string,
  data: any = null,
  token?: string,
) {
  const options: RequestInit = {
    method: "POST",
    credentials: "include",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  }

  options.body = JSON.stringify({ method, path, data, token })

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
        msg: "",
        success: false,
        result: undefined,
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

export default fetcher
