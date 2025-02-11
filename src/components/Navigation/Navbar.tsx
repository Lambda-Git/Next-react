"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/tools";

// 静态资源引入也可以封装统一倒入，页面按需引用
import homePng from "@/app/_assets/icons/navbar/home.png";
import taskPng from "@/app/_assets/icons/navbar/task.png";
import topPng from "@/app/_assets/icons/navbar/top.png";
import invitePng from "@/app/_assets/icons/navbar/invite.png";
import homeAPng from "@/app/_assets/icons/navbar/home-a.png";
import taskAPng from "@/app/_assets/icons/navbar/task-a.png";
import topAPng from "@/app/_assets/icons/navbar/top-a.png";
import inviteAPng from "@/app/_assets/icons/navbar/invite-a.png";

export default function Navbar() {
  const pathname = usePathname();
  const hideNavbarPaths = ["/daily"];

  return (
    !hideNavbarPaths.includes(pathname) && (
      //Bottom navigation
      <div className="flex justify-between items-center w-full fixed bottom-0 text-black bg-white pb-1 z-50">
        <div className="flex justify-between items-center w-full h-full mt-2">
          <div className="flex justify-center items-center w-1/4 h-full">
            <Link
              href="/"
              className="flex flex-col justify-center items-center w-full h-full"
            >
              <>
                <Image
                  src={pathname === "/" ? homeAPng : homePng}
                  alt="home"
                  className="w-6 h-6"
                />
                <span
                  className={cn("stroke-gray-400", {
                    "text-[#0500FF]": pathname === "/",
                  })}
                >
                  Home
                </span>
              </>
            </Link>
          </div>
          <div className="flex justify-center items-center w-1/4 h-full">
            <Link
              href="/task"
              className="flex flex-col justify-center items-center w-full h-full"
            >
              <>
                <Image
                  src={pathname === "/task" ? taskAPng : taskPng}
                  alt="home"
                  className="w-6 h-6"
                />
                <span
                  className={cn("stroke-gray-400", {
                    "text-[#0500FF]": pathname === "/task",
                  })}
                >
                  C-1
                </span>
              </>
            </Link>
          </div>
          <div className="flex justify-center items-center w-1/4 h-full">
            <Link
              href="/top"
              className="flex flex-col justify-center items-center w-full h-full"
            >
              <>
                <Image
                  src={pathname === "/top" ? topAPng : topPng}
                  alt="home"
                  className="w-6 h-6"
                />
                <span
                  className={cn("stroke-gray-400", {
                    "text-[#0500FF]": pathname === "/top",
                  })}
                >
                  C-2
                </span>
              </>
            </Link>
          </div>
          <div className="flex justify-center items-center w-1/4 h-full">
            <Link
              href="/invite"
              className="flex flex-col justify-center items-center w-full h-full"
            >
              <>
                <Image
                  src={pathname === "/invite" ? inviteAPng : invitePng}
                  alt="home"
                  className="w-6 h-6"
                />
                <span
                  className={cn("stroke-gray-400", {
                    "text-[#0500FF]": pathname === "/invite",
                  })}
                >
                  Others
                </span>
              </>
            </Link>
          </div>
        </div>
      </div>
    )
  );
}
