# 动态展示轮播图数据

## mock

开发中两种场景：

1. 后端接口开发好了 --> 看接口文档
2. 后端接口没有开发好 --> 使用 mock

搭建服务器，写路由配置，返回模拟数据

## 搭建 mock 服务

1. 下载
   npm i mockjs
   npm i vite-plugin-mock -D

2. 配置 mock（搭建 mock 服务器）

- vite.config.ts

看文档搭建：https://github.com/vbenjs/vite-plugin-mock/blob/main/README.zh_CN.md

```js
import { UserConfigExport, ConfigEnv } from "vite";
import { viteMockServe } from "vite-plugin-mock";
import vue from "@vitejs/plugin-vue";

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
```

3. 配置路由

- 项目根目录新建文件夹 mock
- mock/home.ts

```js
// 这个数组中的每个对象，将来都会在服务器搭建一个相应的路由
// 对外就能提供相应的接口服务了
export default [
	{
		// 请求前缀不能是/api, 会被代理服务器转发走，不会走mock服务器
		url: "/mockApi/getBannerList",
		method: "get",
		response: () => {
			// 保证响应数据结构符合开发要求
			return {
				code: 200,
				message: null,
				ok: true,
				data: [
					// 正常情况下，要和后端程序员沟通
					{
						id: 1,
						imgName: "banner1",
						imgUrl: "./images/banner1.jpg",
					},
					{
						id: 2,
						imgName: "banner2",
						imgUrl: "./images/banner2.jpg",
					},
					{
						id: 3,
						imgName: "banner3",
						imgUrl: "./images/banner3.jpg",
					},
					{
						id: 4,
						imgName: "banner4",
						imgUrl: "./images/banner4.jpg",
					},
				],
			};
		},
	},
];
```

4. 在浏览器测试 mock 服务

输入地址访问：http://localhost:3000/mockApi/getBannerList

## 请求轮播图数据

- 定义 api 接口函数

注意：不能使用 request 发送 mock 请求，因为 request 请求前缀是/api，而 mock 服务器需要/mockApi

```js
import requestMock from "../utils/requestMock";

export const reqGetBannerList = (): any => {
	// 未来：后端开发好接口后，需要修改使用request发送请求
	return requestMock({
		method: "GET",
		url: "/getBannerList", // 会自动添加/mockApi
	});
};
```

- 新建 requestMock.ts

将 baseURL 的 /api 改为 /mockApi

- 来到 Carousel 的父组件：ListContainer 发送请求

- 将请求成功的数据以 props 传递给 Carousel 组件

## Carousel 组件数据动态展示

- 声明接受 props 数据
- 遍历展示数据

问题：图片没法显示，因为 vite 脚手架没法打包异步加载的图片
解决：将 images 图片放入 public 目录下，public 目录默认会被打包，才能访问

- 定义数据类型
