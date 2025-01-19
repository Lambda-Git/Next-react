import crypto from "crypto";
import CryptoJS from "crypto-js";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number | string) {
  const parts = num?.toString().split(".");
  const integerPart = parts[0]?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.length > 1 ? `${integerPart}.${parts[1]}` : integerPart;
}

export function convertTimestampToLocal(timestamp: number) {
  const date = new Date(timestamp * 1000);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const hoursStr = hours < 10 ? `0${hours}` : hours;
  const minutesStr = minutes < 10 ? `0${minutes}` : minutes;

  return `${day} ${getMonthName(month)} ${year} ${hoursStr}:${minutesStr}`;
}

export function convertTimestampToUTC(timestamp: number) {
  const date = new Date(timestamp * 1000);
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();

  const hoursStr = hours < 10 ? `0${hours}` : hours;
  const minutesStr = minutes < 10 ? `0${minutes}` : minutes;

  return `${day} ${getMonthName(month)} ${year} ${hoursStr}:${minutesStr}`;
}

export function convertTimestampToLocal2(timestamp: number) {
  const date = new Date(timestamp * 1000);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const hoursStr = hours < 10 ? `0${hours}` : hours;
  const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
  const monthStr = month < 10 ? `0${month}` : month;
  const dayStr = day < 10 ? `0${day}` : day;

  return `${year}-${monthStr}-${dayStr} ${hoursStr}:${minutesStr}`;
}

export function convertTimestampToUTC2(timestamp: number) {
  const date = new Date(timestamp * 1000);
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();

  const hoursStr = hours < 10 ? `0${hours}` : hours;
  const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
  const monthStr = month < 10 ? `0${month}` : month;
  const dayStr = day < 10 ? `0${day}` : day;

  return `${year}-${monthStr}-${dayStr} ${hoursStr}:${minutesStr}`;
}
function getMonthName(month: number) {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return monthNames[month - 1];
}

export function encrypt(text: string) {
  try {
    const secret = process.env.NEXT_PUBLIC_AES_KEY as string;
    const key = CryptoJS.enc.Hex.parse(secret);
    const iv = CryptoJS.lib.WordArray.random(16);

    const encrypted = CryptoJS.AES.encrypt(text, key, {
      iv: iv,
    });

    const encryptedData =
      iv.toString(CryptoJS.enc.Hex) +
      ":" +
      encrypted.ciphertext.toString(CryptoJS.enc.Hex);

    return encryptedData;
  } catch (e) {
    console.log(e);
  }
}

export function signParams(params: { [x: string]: any }) {
  const secret = process.env.NEXT_PUBLIC_SIG_KEY as string;
  const filter = "baz";
  const newKeys = Object.keys(params).filter((k) => k !== filter);

  newKeys.sort();

  let signStr = "";
  for (const key of newKeys) {
    signStr += `${key}=${params[key]}&`;
  }

  signStr += secret;

  const hash = crypto.createHash("sha256");
  hash.update(signStr);

  return hash.digest("hex");
}

// ipad、mobile
export function isIPad() {
  return (
    /iPad/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  );
}


// portrait screen
export function portraitScreen() {

}
