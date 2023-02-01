import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import Unocss from "unocss/vite"

import { resolve } from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [Unocss({}), vue()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
})
