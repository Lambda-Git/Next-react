import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        bg: "url('https://nubit-cdn.com/trust/images/bg.png')",
        homebg: "url('https://nubit-cdn.com/trust/images/homebg.png')",
        gamebg: "url('https://nubit-cdn.com/trust/images/gameNewBg.png')",
        dailybg: "url('https://nubit-cdn.com/trust/images/dailybg.png')",
      },
    },
  },
  darkMode: "class",
  plugins: [require("tailwindcss-animate"),nextui()],
};
export default config;
