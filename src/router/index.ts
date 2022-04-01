import { createRouter, createWebHashHistory } from "vue-router";
import store from "@/store";

// 定义router
const router = createRouter({
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
			path: "/shopcart",
			name: "ShopCart",
			component: () => import("../views/shopcart/index.vue"),
		},
		{
			path: "/trade",
			name: "Trade",
			component: () => import("../views/trade/index.vue"),
		},
		{
			path: "/pay",
			name: "Pay",
			component: () => import("../views/pay/index.vue"),
		},
		{
			path: "/paysuccess",
			name: "PaySuccess",
			component: () => import("../views/paySuccess/index.vue"),
		},
		{
			path: "/center",
			name: "Center",
			component: () => import("../views/center/index.vue"),
		},
		{
			path: "/test",
			name: "Test",
			component: () => import("../views/test/index.vue"),
			// meta: {
			// 	isShowFooter: false,
			// },
			meta: {
				isHideFooter: true,
			},
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
			path: "/404",
			name: "404",
			component: () => import("../views/404/index.vue"),
			meta: {
				isHideFooter: true,
			},
		},
		{
			path: "/test1",
			name: "Test1",
			component: () => import("../views/test/index.vue"),
			meta: {
				isHideFooter: true,
			},
		},
		{
			path: "/test2",
			name: "test2",
			component: () => import("../views/404/index.vue"),
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

// 必须登录才能访问的路由表
const permissionRoutes = ["/trade", "/pay", "/paysuccess", "/center"];

// 配置路由全局导航守卫
router.beforeEach((to, from, next) => {
	// // 判断要去的路由地址是否在权限路由表中
	// if (permissionRoutes.includes(to.path)) {
	// 	// 判断是否登录
	// 	if (store.state.user.token) {
	// 		// 登录过，放行
	// 		next();
	// 	} else {
	// 		// 没有登录，先进行登录
	// 		next("/login");
	// 	}
	// } else {
	// 	// 访问的不是权限路由表，直接访问吧
	// 	next();
	// }

	// 判断要去的路由地址是否在权限路由表中
	if (permissionRoutes.includes(to.path) && !store.state.user.token) {
		next("/login");
		return;
	}

	next();
});

export default router;
