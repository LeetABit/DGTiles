import basicSsl from "@vitejs/plugin-basic-ssl";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";

export default defineConfig({
    build: {
        minify: false,
        rollupOptions: {
            treeshake: {
                preset: "smallest",
            },
        },
        terserOptions: {
            compress: false,
            mangle: false,
        },
    },
    plugins: [react(), basicSsl()],
    preview: {
        port: 5000,
    },
    resolve: {
        alias: {
            "#root": resolve(__dirname),
            "@": resolve(__dirname, "src"),
        },
    },
    server: {
        port: 5000,
    },
});
