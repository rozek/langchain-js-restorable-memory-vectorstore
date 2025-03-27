import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { externalizeDeps } from 'vite-plugin-externalize-deps';


export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/RestorableMemoryVectorStore.ts'),
      name: 'langchain-js-restorable-memory-vectorstore',
      fileName: 'RestorableMemoryVectorStore',
      formats: ['es'],
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: false, // inline all dynamic imports
        preserveModules: false, // don't preserve module structure
      },
      treeshake: {
        moduleSideEffects: false, // enable aggressive tree shaking
        propertyReadSideEffects: false
      }
    },
    sourcemap: true,
    emptyOutDir: true,
    outDir: 'dist',
    target: 'esnext', // modern browser target
    minify: 'esbuild', // minify the output
    commonjsOptions: {
      transformMixedEsModules: true,
      include: [/node_modules/],
      extensions: ['.js', '.cjs', '.mjs'],
      esmExternals: false, // treat ESM as non-external
      requireReturnsDefault: 'auto', // better CommonJS compatibility
    }
  },
  plugins: [
    dts({
      insertTypesEntry: true,
      skipDiagnostics: false,
      logDiagnostics: true,
    }),
    externalizeDeps({
      deps: true,
      devDeps: true,
    }),
    nodePolyfills({ // enable all polyfills for maximum compatibility
      protocolImports: true,
      globals: {
        Buffer: true,
        global: true,
        process: true,
      },
    }),
    // custom plugin to handle AsyncLocalStorage and other Node.js-specific modules
    {
      name: 'node-module-shims',
      resolveId(id) {
        if (id === 'node:async_hooks' || id === 'async_hooks') {
          return 'virtual:async_hooks';
        }
        return null;
      },
      load(id) {
        if (id === 'virtual:async_hooks') {
          return ` // simple shim for AsyncLocalStorage
            export class AsyncLocalStorage {
              constructor() {
                this.store = new Map();
              }
              getStore() {
                return this.store;
              }
              run(store, callback) {
                this.store = store;
                try {
                  return callback();
                } finally {
                  this.store = null;
                }
              }
              exit(callback) {
                const prev = this.store;
                this.store = null;
                try {
                  return callback();
                } finally {
                  this.store = prev;
                }
              }
            }
          `;
        }
        return null;
      }
    }
  ],
  resolve: {
    preserveSymlinks: true,
    browserField: true,
    mainFields: ['browser', 'module', 'main'],
    alias: {
      'node:async_hooks': 'virtual:async_hooks',
      'async_hooks': 'virtual:async_hooks',
    }
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'esnext', // modern browser target
      define: {
        global: 'globalThis',
      },
      platform: 'browser',
    },
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
    'process.env.BROWSER': JSON.stringify(true),
    'process.versions': JSON.stringify({
      node: '16.0.0'
    })
  },
});