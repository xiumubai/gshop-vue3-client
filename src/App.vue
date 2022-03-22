<template>
	<!-- 
		整个项目渲染的是APP组件
		APP组件内部渲染	
			Header
			router-view -> 其他路由组件 Home\Search...
			Footer
	-->
	<Header />
	<router-view />
	<!-- 
		其他组件都需要Footer
		只有Login、Register不需要：
			判断当前路由路径看是否是Login、Register，如果是就隐藏
				如何获取当前路由路径？
					this.$route.path
					但是在setup语法中，没有this（undefined）
	-->
	<!-- <Footer v-if="route.path !== '/login' && route.path !== '/register'" /> -->
	<Footer v-if="!route.meta.isHideFooter" />
</template>

<script setup lang="ts">
// import { computed } from "vue";
import { useRoute } from "vue-router";
import Header from "./components/Header/index.vue";
import Footer from "./components/Footer/index.vue";

const route = useRoute();
// 只要定义就可直接使用
// 不是响应式
// const isShowFooter = route.path !== "/login" && route.path !== "/register";

// 使用计算属性，才会是响应式
// const isShowFooter = computed(() => {
// 	// return route.path !== "/login" && route.path !== "/register";
// 	// return route.meta.isShowFooter;
// 	return !route.meta.isHideFooter;
// });
</script>

<style></style>
