import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { viteMockServe } from 'vite-plugin-mock'

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd())
  const { VITE_APP_ENV, VITE_APP_BASE_URL, VITE_APP_BASE_API } = env
  return {
    base: './',
    outDir: `docs`,
    plugins: [
      vue(),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons/svg')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]',
      }),
      viteMockServe({
        mockPath: 'mock', // mock文件所在文件夹
        localEnabled: false, // 是否应用于本地
        prodEnabled: true, // 是否应用于生产
        injectCode: `import { setupProdMockServer } from '/mock/mockProdServer'; setupProdMockServer();`,
        logger: true
      }),
      VueSetupExtend(),
    ],
    resolve: {
      // https://cn.vitejs.dev/config/#resolve-alias
      alias: {
        // 设置路径
        '~': path.resolve(__dirname, './'),
        // 设置别名
        '@': path.resolve(__dirname, './src'),
      },
      // https://cn.vitejs.dev/config/#resolve-extensions
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
      // https://github.com/vuejs/core/issues/4344
      dedupe: ['vue'],
    },
    server: {
      port: 80,
      host: true,
      hmr: true,
      https:false
      // open: true,
      // proxy: {
      //   [VITE_APP_BASE_API]: {
      //     target: VITE_APP_BASE_URL,
      //     changeOrigin: true,
      //     rewrite: p => p.replace(RegExp(`^${VITE_APP_BASE_API}`), ''),
      //   },
      // },
    },
    build: {
      emptyOutDir: true,
      outDir: 'docs',
      assetsInlineLimit: 4096,
    },
  }
})
