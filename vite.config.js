import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // alias
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "components": path.resolve(__dirname, "src/components"),
      "styles": path.resolve(__dirname, "src/styles"),
      "api": path.resolve(__dirname, "src/api"),
      "hooks": path.resolve(__dirname, "src/hooks"),
      "pages": path.resolve(__dirname, "src/pages"),
      // "plugins": path.resolve(__dirname, "src/plugins"),
      // "layouts": path.resolve(__dirname, "src/layouts"),
      // "utils": path.resolve(__dirname, "src/utils"),
      // "dirs": path.resolve(__dirname, "src/directives"),
    }
  },
})
