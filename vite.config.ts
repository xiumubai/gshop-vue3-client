import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
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
});
