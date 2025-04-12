import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss({
      config: {
        content: ["main.html", "./src/**/*.{js,jsx,ts,tsx}"],
        theme: {
          extend: {
            fontFamily: {
              inter: ["Inter", "sans-serif"],
              roboto: ["Roboto Mono", "monospace"],
              ibm: ["IBM Plex Mono", "monospace"],
            },
          },
        },
      },
    }),
  ],
});
