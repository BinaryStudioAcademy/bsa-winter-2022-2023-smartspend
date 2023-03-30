import path from 'node:path';

import reactPlugin from '@vitejs/plugin-react';
import { type ConfigEnv, defineConfig, loadEnv } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import tsconfigPathsPlugin from 'vite-tsconfig-paths';

const config = ({ mode }: ConfigEnv): ReturnType<typeof defineConfig> => {
    const {
        VITE_APP_PROXY_SERVER_URL,
        VITE_APP_API_ORIGIN_URL,
        VITE_APP_DEVELOPMENT_PORT,
    } = loadEnv(mode, process.cwd());

    return defineConfig({
        build: {
            outDir: 'build',
        },
        plugins: [
            tsconfigPathsPlugin(),
            reactPlugin(),
            VitePWA({
                registerType: 'autoUpdate',
                injectRegister: 'auto',
                includeAssets: [
                    'favicon.ico',
                    'apple-touch-icon.png',
                    'masked-icon.svg',
                ],
                devOptions: {
                    enabled: true,
                },
                manifest: {
                    name: 'Smart Spend',
                    short_name: 'Smart Spend',
                    theme_color: '#ffffff',
                    start_url: '/',
                    icons: [
                        {
                            src: '/android-chrome-192x192.png',
                            sizes: '192x192',
                            type: 'image/png',
                            purpose: 'any maskable',
                        },
                        {
                            src: '/android-chrome-512x512.png',
                            sizes: '512x512',
                            type: 'image/png',
                            purpose: 'any maskable',
                        },
                    ],
                },
                workbox: {
                    globPatterns: [
                        '**/*.{js,jsx,ts,tsx,css,scss,html,ico,png,svg}',
                    ],
                    runtimeCaching: [
                        {
                            urlPattern: ({ url }) =>
                                url.pathname.startsWith('/api'),
                            handler: 'CacheFirst',
                            options: {
                                cacheName: 'api-cache',
                                cacheableResponse: {
                                    statuses: [0, 200],
                                },
                            },
                        },
                    ],
                },
                injectManifest: {
                    swSrc: './src/service-worker.js',
                    swDest: 'sw.js',
                },
            }),
        ],
        server: {
            port: Number(VITE_APP_DEVELOPMENT_PORT),
            proxy: {
                [VITE_APP_API_ORIGIN_URL]: {
                    target: VITE_APP_PROXY_SERVER_URL,
                    changeOrigin: true,
                },
            },
        },
        resolve: {
            alias: {
                // eslint-disable-next-line unicorn/prefer-module
                '@assets': path.resolve(__dirname, './src/assets/css'),
            },
        },
    });
};

export default config;
