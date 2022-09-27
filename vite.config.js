import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import path from "path"

export default defineConfig({
    plugins: [vue()],
    server: {
        open: true,
        hmr: true,
        usePolling: true,
    },
    // alias
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
            components: path.resolve(__dirname, "src/components"),
            styles: path.resolve(__dirname, "src/styles"),
            api: path.resolve(__dirname, "src/api"),
            hooks: path.resolve(__dirname, "src/hooks"),
            pages: path.resolve(__dirname, "src/pages"),
            utils: path.resolve(__dirname, "src/utils"),
            // "plugins": path.resolve(__dirname, "src/plugins"),
            // "layouts": path.resolve(__dirname, "src/layouts"),
            // "dirs": path.resolve(__dirname, "src/directives"),
        },
    },
})
