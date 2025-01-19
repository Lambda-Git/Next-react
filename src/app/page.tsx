"use client";

import Image from "next/image";
import Link from "next/link";
import copyPng from "@/app/_assets/icons/copy-green.png";
import { shareStory } from "@telegram-apps/sdk";
import homeBanner from "@/app/_assets/images/home-banner.png";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import fetcher from "@/utils/fetch/client/fetcher";
import { useSession } from "@/hooks/useSession";
import Countdown from "react-countdown";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import {
  Accordion,
  AccordionItem,
  Autocomplete,
  AutocompleteItem,
  Button,
  Checkbox,
  Card,
  Skeleton,
  CircularProgress,
} from "@nextui-org/react";
import { TonConnectButton, useTonAddress } from "@tonconnect/ui-react";

export default function Page() {
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState(false);
  const session = useSession();
  const userFriendlyAddress = useTonAddress();
  const rawAddress = useTonAddress(false);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const token = localStorage.getItem("token") as string;
    const refreshTokenExpireAt = localStorage.getItem(
      "refreshTokenExpireAt"
    ) as string;
    const tgId = localStorage.getItem("tgId") as string;
    if (
      token == null ||
      refreshTokenExpireAt == null ||
      new Date(Number(refreshTokenExpireAt) * 1000) < new Date() ||
      tgId == null ||
      tgId != session.tgId.toString()
    ) {
      const res = await fetcher.post(
        "user_login",
        { refTgUserId: Number(session.startParam) },
        session?.initDataRaw
      );
      if (res.status == 200) {
        let data = res.json.result;
        if (data.success) {
          localStorage.setItem("token", data.data.token);
          localStorage.setItem("refreshToken", data.data.refreshToken);
          localStorage.setItem(
            "refreshTokenExpireAt",
            data.data.refreshTokenExpireAt
          );
          localStorage.setItem("tgId", session.tgId.toString());
        } else {
          if (data.code == 401) {
            toast.error("Login timed out, please re-enter.");
            // setPageLoading(false);
            return;
          }
          toast.error(data.msg);
          // setPageLoading(false);
          return;
        }
      }
    }
  };

  const shareMiniApp = () => {
    const urlToShare =
      process.env.NEXT_PUBLIC_TMA_URL + "?startapp=ref_" + session?.tgId;
    const message = encodeURIComponent(
      process.env.NEXT_PUBLIC_SHARE_MSG as string
    );
    const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(
      urlToShare
    )}&text=${message}`;
    window.open(shareUrl, "_blank");
  };

  const shareToStory = async () => {
    shareStory(window.location.origin + "/images/story.png");
  };

  const subscribeToChannel = async () => {
    const channelUsername = "trust_announcements";
    const channelUrl = `https://t.me/${channelUsername}`;
    window.open(channelUrl, "_blank");
  };

  const copy = (text: string) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(
        function () {
          toast.success("Copied to clipboard");
        },
        function (err) {
          console.error("Failed to copy text to clipboard", err);
          fallbackCopyTextToClipboard(text);
        }
      );
    } else {
      fallbackCopyTextToClipboard(text);
    }
  };

  function fallbackCopyTextToClipboard(text: string) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand("copy");
      toast.success("Copied to clipboard");
    } catch (err) {
      toast.error(text);
    }
    document.body.removeChild(textArea);
  }

  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  const animals = [
    {
      label: "Cat",
      value: "cat",
      description: "The second most popular pet in the world",
    },
    {
      label: "Dog",
      value: "dog",
      description: "The most popular pet in the world",
    },
    {
      label: "Elephant",
      value: "elephant",
      description: "The largest land animal",
    },
    { label: "Lion", value: "lion", description: "The king of the jungle" },
    { label: "Tiger", value: "tiger", description: "The largest cat species" },
    {
      label: "Giraffe",
      value: "giraffe",
      description: "The tallest land animal",
    },
    {
      label: "Dolphin",
      value: "dolphin",
      description: "A widely distributed and diverse group of aquatic mammals",
    },
  ];

  return pageLoading ? (
    <Loading />
  ) : (
    <main
      className={
        "max-w-md min-h-screen mx-auto bg-bg bg-cover bg-top text-black"
      }
    >
      <section className="flex flex-col justify-start min-h-screen text-black bg-[#EFEFEF]/30 pl-8 pr-8">
        <Card className="w-[200px] space-y-5 p-4" radius="lg">
          <Skeleton className="rounded-lg">
            <div className="h-24 rounded-lg bg-default-300"></div>
          </Skeleton>
          <div className="space-y-3">
            <Skeleton className="w-3/5 rounded-lg">
              <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
            </Skeleton>
            <Skeleton className="w-4/5 rounded-lg">
              <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
            </Skeleton>
            <Skeleton className="w-2/5 rounded-lg">
              <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
            </Skeleton>
          </div>
        </Card>
        <TonConnectButton />
        <div>
          {userFriendlyAddress && (
            <div>
              <span>User-friendly address: {userFriendlyAddress}</span>
              <span>Raw address: {rawAddress}</span>
            </div>
          )}
        </div>
        <CircularProgress value={70} strokeWidth={4} showValueLabel={true} />
        <div className="flex gap-4 animate__animated animate__fadeInDown">
          <Checkbox defaultSelected radius="full">
            Full
          </Checkbox>
          <Checkbox defaultSelected radius="sm">
            Small
          </Checkbox>
          <Checkbox defaultSelected radius="none">
            None
          </Checkbox>
        </div>
        <div className="flex flex-wrap gap-4 items-center">
          <Button
            color="primary"
            variant="solid"
            className="testbtn mt-2 bg-[#5B61F5] w-full"
          >
            Solid
          </Button>
          <Button
            disableRipple
            className="relative overflow-visible rounded-full hover:-translate-y-1 px-12 shadow-xl bg-background/30 after:content-[''] after:absolute after:rounded-full after:inset-0 after:bg-background/40 after:z-[-1] after:transition after:!duration-500 hover:after:scale-150 hover:after:opacity-0"
            size="lg"
          >
            Press me
          </Button>
          <Button color="primary" variant="bordered">
            Bordered
          </Button>
          <Button color="primary" variant="light">
            Light
          </Button>
          <Button color="primary" variant="flat">
            Flat
          </Button>
          <Button color="primary" variant="ghost">
            Ghost
          </Button>
          <Button color="primary" variant="shadow">
            Shadow
          </Button>
          <Button color="primary" isLoading>
            Loading
          </Button>
        </div>
        <div>
          <Autocomplete
            color={"primary"}
            defaultItems={animals}
            label="Favorite Animal"
            placeholder="Search an animal"
            defaultSelectedKey={"cat"}
            className="max-w-xs"
          >
            {(item: { value: any; label: any }) => (
              <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>
            )}
          </Autocomplete>
        </div>
        <div>
          <Accordion selectionMode="multiple">
            <AccordionItem key="1" aria-label="Accordion 1" title="Accordion 1">
              {defaultContent}
            </AccordionItem>
            <AccordionItem key="2" aria-label="Accordion 2" title="Accordion 2">
              {defaultContent}
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </main>
  );
}
