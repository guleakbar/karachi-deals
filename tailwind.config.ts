// tailwind.config.ts
import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#06b6d4",
          soft: "#0f172a",
        },
      },
      borderRadius: {
        "2xl": "1.25rem",
      },
    },
  },
  plugins: [],
}

export default config
