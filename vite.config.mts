import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import basicSsl from "@vitejs/plugin-basic-ssl";
import { resolve } from "path";

export default defineConfig({
    plugins: [react(), basicSsl()],
    server: {
        port: 5000,
    },
    preview: {
        port: 5000,
    },
    build: {
        rollupOptions: {
            treeshake: {
                preset: "smallest",
            },
        },
        minify: false,
        terserOptions: {
            compress: false,
            mangle: false,
        },
    },
    resolve: {
        alias: {
            "@": resolve(__dirname, "src"),
            "#root": resolve(__dirname),
        },
    },
});
