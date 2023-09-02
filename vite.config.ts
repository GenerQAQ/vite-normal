import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import eslintPlugin from 'vite-plugin-eslint';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@': resolve(__dirname, './src') // 把 @ 指向到 src 目录去
        }
    },
    plugins: [
        vue(),
        eslintPlugin({
            lintOnStart: true, // 在项目启动时检查所有匹配的文件
            cache: false // 禁用 eslint 缓存
        })
    ]
});
