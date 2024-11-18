import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import viteTsconfigPaths from 'vite-tsconfig-paths'
import svgr from 'vite-plugin-svgr'
import eslint from 'vite-plugin-eslint'
import { chunkSplitPlugin } from 'vite-plugin-chunk-split';

export default defineConfig({
    // depending on your application, base can also be "/"
    base: '/',
    plugins: [
        react({ jsxImportSource: '@emotion/react', }),
        viteTsconfigPaths(),
        svgr({
            svgrOptions: {
              // svgr options
            },
          }),
        eslint(),
        chunkSplitPlugin(),
    ],
    server: {
        // this ensures that the browser opens upon server start
        open: true,
        // this sets a default port to 3000
        port: 5000,
    },
})
