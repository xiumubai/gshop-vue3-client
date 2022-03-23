import { UserConfigExport, ConfigEnv } from "vite";
import { viteMockServe } from "vite-plugin-mock";
import vue from "@vitejs/plugin-vue";
// nodejs核心模块，专门用来处理路径问题
import path from "path"; // 报错：解决 tsconfig.node.json 写 "allowSyntheticDefaultImports": true

/*
	搭建mock：https://github.com/vbenjs/vite-plugin-mock/blob/main/README.zh_CN.md
	1. 下载
		npm i mockjs -S
		npm i vite-plugin-mock -D
	
	2. 进行配置
	3. 在项目根目录创建一个目录，用来写mock
*/

// https://vitejs.dev/config/
export default ({ command }: ConfigEnv): UserConfigExport => {
	return {
		plugins: [
			vue(),
			viteMockServe({
				// mock文件夹的目录
				mockPath: "mock",
				localEnabled: command === "serve",
			}),
		],
		// https://cn.vitejs.dev/config/#server-proxy
		server: {
			proxy: {
				"/api": {
					// 目标服务器地址
					target: "http://39.98.123.211",
					// 允许跨域
					changeOrigin: true,
					// 路径重写：
					// rewrite: (path) => path.replace(/^\/api/, ""),
				},
			},
		},
		// 路径别名, 组件就可以使用，但是没有提示
		// 需要提示，要配置tsconfig.json https://code.visualstudio.com/docs/languages/jsconfig#_using-webpack-aliases
		resolve: {
			alias: {
				// key是路径的简写
				// value是路径实际地址：绝对路径

				// path.resolve：返回一个绝对路径
				// __dirname: 当前文件夹目录
				"@": path.resolve(__dirname, "src"),
				"@comps": path.resolve(__dirname, "src/components"),
			},
		},
	};
};
