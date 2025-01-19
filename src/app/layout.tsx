import type { PropsWithChildren } from "react";
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { Root } from "@/components/Root/Root";
import "@telegram-apps/telegram-ui/dist/styles.css";
import "normalize.css/normalize.css";
import "./_assets/globals.css";
import 'animate.css';
import ToastClientContainer from "@/components/Feedback/Toast/ToastClientContainer";
import Navbar from "@/components/Navigation/Navbar";

export const metadata: Metadata = {
  title: "tg-min-app",
  description: "tg-min-app",
};

const space_grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-primary",
});

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className={space_grotesk.className}>
      <body className=" bg-[#E9E9E9]">
        <Root>
          <ToastClientContainer />
          <Navbar />
          {children}
        </Root>
      </body>
    </html>
  );
}
