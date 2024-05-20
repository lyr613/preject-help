import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import legacy from '@vitejs/plugin-legacy'
// https://vitejs.dev/config/
export default defineConfig((env) => {
    const port = 6013

    return {
        plugins: [
            react(),
            legacy({
                polyfills: ['es/map'],
            }),
        ],
        base: './',
        server: {
            port,
            // open: `http://localhost:${port}/#/`,
            // host: true,
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src'),
                '@gu-zhi': path.resolve(__dirname, '..'),
            },
        },
        preview: {
            port,
        },
        build: {
            outDir: '../elec/distpage',
            emptyOutDir: true,
        },
    }
})
