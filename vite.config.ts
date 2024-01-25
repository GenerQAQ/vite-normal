import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import compressionPlugin from 'vite-plugin-compression';
import { viteMockServe } from 'vite-plugin-mock';
import { chunkSplitPlugin } from 'vite-plugin-chunk-split';
import legacy from '@vitejs/plugin-legacy';
import path, { resolve } from 'path';
import autoImport from 'unplugin-auto-import/vite';
import components from 'unplugin-vue-components/vite';
import { visualizer } from 'rollup-plugin-visualizer';
import { ElementPlusResolver as elementPlusResolver } from 'unplugin-vue-components/resolvers';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

const DIRNAME = resolve('./').split(path.normalize('/')).pop(); // 根目录文件夹名称
const HOST = '0.0.0.0';
const PORT = 5173;
const MOCKIP = '0.0.0.0';
const MOCKPORT = 8222;

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    // 根据当前工作目录中的 `mode` 加载 .env 文件
    // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
    const env = loadEnv(mode, process.cwd(), '');

    return {
        base: './', // 开发或生产环境服务的公共基础路径
        resolve: {
            alias: {
                '@': resolve(__dirname, './src') // 把 @ 指向到 src 目录去
            }
        },
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `
                        @use '@/styles/element/light.scss';
                        @use '@/styles/element/dark.scss';
                    `
                }
            },
            postcss: {
                plugins: [tailwindcss, autoprefixer]
            }
        },
        plugins: [
            vue(),
            viteMockServe({
                enable: mode === 'development' // 在开发环境开启mock
            }),
            autoImport({
                imports: ['vue', 'pinia', 'vue-router', '@vueuse/core', 'vitest'],
                eslintrc: {
                    enabled: true
                },
                resolvers: [
                    elementPlusResolver({
                        importStyle: 'sass'
                    })
                ]
            }),
            components({
                resolvers: [
                    elementPlusResolver({
                        importStyle: 'sass'
                    })
                ]
            }),
            chunkSplitPlugin({
                strategy: 'default',
                customSplitting: {
                    __commonjsHelpers__: [/some unreachable check/], // override
                    vendor: [/node_modules/],
                    vue: [/vue/, /vue-router/],
                    common: [/src\/utils/, /src\/components/]
                }
            }),
            legacy({
                targets: ['defaults', 'not IE 11']
            }),
            compressionPlugin({
                verbose: true, // 输出压缩成功
                disable: false, // 是否禁用
                threshold: 10240, // 体积大于阈值会被压缩，单位是b
                algorithm: 'gzip', // 压缩算法
                ext: '.gz' // 生成的压缩包后缀
            }),
            visualizer() // 构建分析
        ],
        server: {
            // 在开发服务器启动时自动在浏览器中打开应用程序
            open: true,
            // 服务器监听地址
            host: HOST,
            // 服务器端口
            port: PORT,
            // 服务器自定义代理规则
            proxy: {
                [env.VITE_APP_BASE_API]: {
                    target: `http://${MOCKIP}:${MOCKPORT}`,
                    changeOrigin: true, // 将host header的源更改为target URL
                    ws: true, // 用于代理 WS(S) 请求
                    rewrite: (path) => path.replace(env.VITE_APP_BASE_API, '')
                }
            }
        },
        test: {
            globals: true,
            environment: 'jsdom',
            deps: {
                inline: ['element-plus']
            }
        },
        build: {
            outDir: path.normalize(`./dist/${DIRNAME}`) // 指定输出路径（相对于项目根目录)
        },
        esbuild: {
            drop: mode === 'production' ? ['console', 'debugger'] : [] // 删除 console.* debugger; 函数的调用
        }
    };
});
