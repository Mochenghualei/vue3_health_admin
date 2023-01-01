import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import path from "path"
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"

export default defineConfig({
    plugins: [
        vue(),
        AutoImport({
            imports: ["vue", "pinia", "vue-router"],
            // 指定配置文件生成的位置与文件名
            dts: "./src/automatic/auto-imports.d.ts",
            // 指定引入utils目录下所有文件
            dirs: [
                "./src/utils/**",
                "./src/api/**",
                "./src/hooks/**",
                "./src/store/**",
            ],
            // resolvers: [],
        }),
        Components({
            // 指定组件位置，默认为 src/components
            dirs: ["src/components", "src/pages/HomePage/components"],
            // 指定配置文件生成的位置与文件名
            dts: "./src/automatic/components.d.ts",
            extensions: ["vue", "md"],
            include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
            resolvers: [],
        }),
    ],
    server: {
        open: true,
        host: "0.0.0.0",
        port: "5147",
        hmr: true,
        hotUpdate: true,
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
