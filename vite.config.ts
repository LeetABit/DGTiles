import { defineConfig } from 'vitest/config'
import path from 'path'
import { readdirSync } from 'fs'
import react from '@vitejs/plugin-react'

const absolutePathAliases: { [key: string]: string } = {};
// Root resources folder
const srcPath = path.resolve('./');
// Ajust the regex here to include .vue, .js, .jsx, etc.. files from the resources/ folder
const srcRootContent = readdirSync(srcPath, { withFileTypes: true }).map((dirent) => dirent.name.replace(/(\.(t|j)s){1}(x?)/, ''));

srcRootContent.forEach((directory) => {
  absolutePathAliases[directory] = path.join(srcPath, directory);
});

// https://vitejs.dev/config/
export default defineConfig({
    root: '/',
    resolve: {
        alias: {
          ...absolutePathAliases
        }
      },

  build: {
    rollupOptions: {
      input: '/main.ts'
    }
  },
  server: {
    port: 5002,
  },
  base: '/',
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    css: true,
    reporters: ['verbose'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*'],
      exclude: [],
    }
  },
})
