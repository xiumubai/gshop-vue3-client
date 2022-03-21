import { createRouter, createWebHashHistory } from "vue-router";

// 定义router
export default createRouter({
	history: createWebHashHistory(), // hash模式
	// 路由配置
	routes: [
		{
			path: "/",
			name: "Home",
			// 注意：路径必须写全（使用vite脚手架）
			// 路由懒加载：实现路由组件的按需加载
			component: () => import("../views/home/index.vue"),
		},
		{
			path: "/search",
			name: "Search",
			component: () => import("../views/search/index.vue"),
		},
		{
			path: "/login",
			name: "Login",
			component: () => import("../views/login/index.vue"),
		},
		{
			path: "/register",
			name: "Register",
			component: () => import("../views/register/index.vue"),
		},
		{
			// vue-router@4版本移除*通配符，需要使用下面这个规则来匹配任意路径
			path: "/:pathMatch(.*)*",
			redirect: "/",
		},
	],
});
