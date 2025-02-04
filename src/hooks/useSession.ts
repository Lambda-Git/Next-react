import { useInitData, useLaunchParams } from "@telegram-apps/sdk-react"

export function useSession() {
  let initDataRaw = useLaunchParams().initDataRaw
  let initData = useInitData()
  let tgId: number = initData?.user?.id || 0

  // 本地开发环境 test
  // if (process.env.BUILD_ENV === "development") {
  //   initDataRaw =
  //     "query_id=AAHz4y1LAgAAAPPjLUvvyhYZ&user=%7B%22id%22%3A5556265971%2C%22first_name%22%3A%22Ekko%22%2C%22last_name%22%3A%22Wu%22%2C%22username%22%3A%22Ekko_Wu%22%2C%22language_code%22%3A%22zh-hans%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1729839770&hash=08e34097e9e5123942d9b00278027e0e9bf56ec6f6f04bc7f4986979f3076687"
  //   tgId = 5556265971
  // }
  let startParam = initData?.startParam || "ref_0"

  startParam = startParam.replace("ref_", "")

  return { initDataRaw, tgId, startParam }
}
