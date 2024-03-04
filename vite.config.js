import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { viteMockServe } from "vite-plugin-mock";

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd())
  const { VITE_APP_ENV, VITE_APP_BASE_URL, VITE_APP_BASE_API } = env
  return {
    /**
     * 部署生产环境和开发环境下的URL。
     * 默认情况下，vite 会假设你的应用是被部署在一个域名的根路径上
     * 如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在 https://xxx/admin/，则设置 baseUrl 为 /admin/。
    */
    base: VITE_APP_ENV === 'production' ? '/' : '/',
    plugins: [
      vue(),
      AutoImport({
        includes: [
          /\.vue$/,
          /\.vue\?vue/,
          /\.md$/,
        ],
        imports: [
          'vue',
          'vue-router',
          'pinia'
        ],
      }),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons/svg')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]'
      }),
      viteMockServe({
        mockPath: './mock', // mock文件所在文件夹
        localEnabled: true, // 是否应用于本地
        prodEnabled: false, // 是否应用于生产
        watchFiles: true, // 监视文件更改 这样更改mock的时候，不需要重新启动编译
      }
      ),
      VueSetupExtend()
    ],
    resolve: {
      // https://cn.vitejs.dev/config/#resolve-alias
      alias: {
        // 设置路径
        '~': path.resolve(__dirname, './'),
        // 设置别名
        '@': path.resolve(__dirname, './src')
      },
      // https://cn.vitejs.dev/config/#resolve-extensions
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
      // https://github.com/vuejs/core/issues/4344
      dedupe: [
        'vue'
      ]
    },
    server: {
      port: 80,
      host: true,
      hmr: true,
      // open: true,
      proxy: {
        [VITE_APP_BASE_API]: {
          target: VITE_APP_BASE_URL,
          changeOrigin: true,
          rewrite: (p) => p.replace(RegExp(`^${VITE_APP_BASE_API}`), "")
        }
      }
    },

  }
})
