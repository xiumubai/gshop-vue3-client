import { UserConfigExport, ConfigEnv } from "vite";
import { viteMockServe } from "vite-plugin-mock";
import vue from "@vitejs/plugin-vue";

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
	};
};
