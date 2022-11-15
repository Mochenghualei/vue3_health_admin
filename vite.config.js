import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import path from "path"

export default defineConfig({
    plugins: [vue()],
    server: {
        open: true,
        host: "0.0.0.0",
        port: "5147",
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
            store: path.resolve(__dirname, "src/store"),
            // "plugins": path.resolve(__dirname, "src/plugins"),
            // "layouts": path.resolve(__dirname, "src/layouts"),
            // "dirs": path.resolve(__dirname, "src/directives"),
        },
    },
})
