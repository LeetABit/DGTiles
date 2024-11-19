import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    basicSsl()
],
    server: {
        port: 5000,
    },
    preview: {
        port: 5000,
    },
    build: {    
        rollupOptions: {
            treeshake: {
                preset: 'smallest',
                //annotations: true,
                //propertyReadSideEffects: false,
                //unknownGlobalSideEffects: false,
                //correctVarValueBeforeDeclaration: false,
                //tryCatchDeoptimization: false,
                //manualPureFunctions: [],
                // moduleSideEffects: (id, external) => {
                //     if (id.includes('/node_modules/@axe-core/react/')) {
                //         return false;
                //     }

                //     return !external;
                // },
            }
          },

          minify: false,
          terserOptions: {
          compress: false,
          mangle: false,
          },
    }

    // resolve: {
    //     alias: [
    //       { find: '@', replacement: path.resolve(import.meta.dirname, 'src') },
    //     ],
    //   },
})
