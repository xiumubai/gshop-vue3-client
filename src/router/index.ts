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
			// meta: {
			// 	isShowFooter: true,
			// },
		},
		{
			path: "/search/:keyword?",
			name: "Search",
			component: () => import("../views/search/index.vue"),
			// meta: {
			// 	isShowFooter: true,
			// },
		},
		{
			path: "/detail/:id",
			name: "Detail",
			component: () => import("../views/detail/index.vue"),
		},
		{
			path: "/addcartsuccess",
			name: "AddCartSuccess",
			component: () => import("../views/addCartSuccess/index.vue"),
		},
		{
			path: "/login",
			name: "Login",
			component: () => import("../views/login/index.vue"),
			// meta: {
			// 	isShowFooter: false,
			// },
			meta: {
				isHideFooter: true,
			},
		},
		{
			path: "/register",
			name: "Register",
			component: () => import("../views/register/index.vue"),
			// meta: {
			// 	isShowFooter: false,
			// },
			meta: {
				isHideFooter: true,
			},
		},
		{
			// vue-router@4版本移除*通配符，需要使用下面这个规则来匹配任意路径
			path: "/:pathMatch(.*)*",
			redirect: "/",
		},
	],
	// 滚动行为
	// 当路由跳转时触发，返回值决定滚动条的位置
	scrollBehavior() {
		// 始终滚动到顶部
		return { top: 0 };
	},
});
