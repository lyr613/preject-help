import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
    plugins: [],
    base: './',
    build: {
        target: 'esnext',
        minify: 'esbuild',
        lib: {
            entry: './src/main.ts',
            name: 'Counter',
            fileName: 'main',
        },
        rollupOptions: {
            external: ['electron', 'path', 'fs', 'node:fs', 'node:path', 'util', 'assert', 'stream', 'constants'],
            output: {
                globals: {
                    electron: 'electron',
                    path: 'path',
                    fs: 'fs',
                    util: 'util',
                    assert: 'assert',
                    stream: 'stream',
                    constants: 'constants',
                    'node:fs': 'node:fs',
                    'node:path': 'node:path',
                },
            },
        },
        outDir: 'distjs',
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@yitouzi': path.resolve(__dirname, '..'),
        },
        extensions: ['.ts', '.js'],
    },
})
