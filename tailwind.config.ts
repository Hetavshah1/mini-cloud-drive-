import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#059669", // ocean green
          light: "#34d399",
          dark: "#047857",
        },
        textC: "#3a3d3c",
        bgc: "#F8FAF9",
        darkC2: "#E7F7F4",
        darkC: "#D3EFE9",
      },
    },
    screens: {
      tablet: "840px",
    },
  },
  plugins: [],
} satisfies Config;
