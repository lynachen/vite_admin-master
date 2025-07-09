//import { defineConfig } from "vite";
//import vue from "@vitejs/plugin-vue";
//const { resolve } = require("path");
//
//export default defineConfig({
//  plugins: [vue()],
//  resolve: {
//      alias: [
//          {
//              find: "@",
//              replacement: resolve(__dirname, "src")
//          }
//      ]
//  },
//  server: {
//      open: true,
//      cors: true
//      // proxy: {
//      //     "/api": {
//      //         target: "https://www.baidu.com",
//      //         changeOrigin: true,
//      //         rewrite: path => path.replace(/^\/api/, "")
//      //     }
//      // }
//  },
//  /* 打包配置 */
//  base: "./",
//  build: {
//      brotliSize: false,
//      emptyOutDir: false,
//      outDir: "dist",
//      assetsDir: "static"
//  }
//});

import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
const { resolve } = require("path");
export default defineConfig(({command, mode }) => {
	console.log(command)
	const env = loadEnv(mode, process.cwd())
  	console.log('运行环境：',env.VITE_API_ENV)
	return {
		plugins: [vue()],
	    envPrefix:  ['VITE', 'VUE'], // 环境变量前缀,默认只会暴露VITE开头变量，定义后可暴露VUE开头变量
	    define: {
	      	'process.env.VITE_APP_BASE_API':JSON.stringify(env.VITE_APP_BASE_API),
            'process.env.VITE_APP_OUTSIDE_API':JSON.stringify(env.VITE_APP_OUTSIDE_API),
            'process.env.VITE_APP_GUIDE_URL':JSON.stringify(env.VITE_APP_GUIDE_URL),
			'process.env.VITE_APP_FILE_URL':JSON.stringify(env.VITE_APP_FILE_URL),
	    },
	    // 目录别名
		resolve: {
			alias: [
				{
					find: "@",
					replacement: resolve(__dirname, "src")
				}
			]
		},
		optimizeDeps: {
			include: ['axios'],
		},
		css: {
			// css预处理器
			preprocessorOptions: {
				scss: {
					// 引入 var.scss 这样就可以在全局中使用 var.scss中预定义的变量了
					// 给导入的路径最后加上 ; 
					additionalData: `
						@import "@/assets/css/config.scss";  // scss文件地址
						@import "@/assets/css/variables.scss";     // scss文件地址
					`
				}
			}
		},
		server: {
			host: '0.0.0.0',
			open: true,
			cors: true,
			proxy: {
				"/ensyapi": {
					target: env.VITE_APP_BASE_API,
					changeOrigin: true,
					rewrite: path => path.replace(/^\/ensyapi/, "")
				},
			}
		},
		/* 打包配置 */
		base: "./",
		build: {
			target: 'modules',
			outDir: env.VITE_API_ENV,
			assetsDir: 'assets',
			minify: 'terser', // 混淆器
			terserOptions: { 
				compress: { 
				  	drop_console: command === "build" && env.VITE_API_ENV === "prod", 
				 	drop_debugger: command === "build" && env.VITE_API_ENV === "prod" 
				} 
		  	},
			chunkSizeWarningLimit: 1000,
			rollupOptions: {
				output: {
					// 分包
					manualChunks(id) {
					if (id.includes("node_modules")) {
						return id
						.toString()
						.split("node_modules/")[1]
						.split("/")[0]
						.toString();
					}
					},
				},
			},
		}
	}
})

