<template>
	<!-- 
    autoplay 自动轮播
      delay 自动轮播的时间
      disableOnInteraction:
        设置为false和用户交互（滑动）后不会禁用自动播放，每次交互后都会重新启动
      pauseOnMouseEnter 鼠标移入暂停轮播图
    pagination 小圆点
      clickable: true, 可以点击小圆点跳转
    navigation 左右箭头
    loop 无限轮播
    modules 要加载的组件
      默认情况下Swiper没办法使用 pagination、autoplay、navigation等功能
      所有功能都需要加载相应的组件才能使用
  -->
	<Swiper
		:autoplay="{
			delay: 2500,
			disableOnInteraction: false,
			pauseOnMouseEnter: true,
		}"
		:pagination="{
			clickable: true,
		}"
		:navigation="true"
		:loop="true"
		:modules="modules"
	>
		<SwiperSlide>
			<img src="./images/banner1.jpg" alt="1" />
		</SwiperSlide>
		<SwiperSlide>
			<img src="./images/banner2.jpg" alt="2" />
		</SwiperSlide>
		<SwiperSlide>
			<img src="./images/banner3.jpg" alt="3" />
		</SwiperSlide>
		<SwiperSlide>
			<img src="./images/banner4.jpg" alt="4" />
		</SwiperSlide>
	</Swiper>
</template>

<script lang="ts">
export default {
	name: "Carousel",
};
</script>

<script lang="ts" setup>
/*
  swiper：https://swiperjs.com/vue
  1. 下载
    npm i swiper
  2. 使用
    - 引入swiper的vue组件
    - 引入样式
    - 注册swiper组件
    - 在模板页面中使用

  3. 
    自动轮播：https://codesandbox.io/s/z1tzu?file=/src/App.vue
    无线轮播：https://codesandbox.io/s/11oys?file=/src/App.vue:71-83
*/
import { defineProps } from "vue";
// 引入Swiper基本组件
import { Swiper, SwiperSlide } from "swiper/vue";
// 想要具备其他功能，还需要引入其他组件
import { Autoplay, Pagination, Navigation } from "swiper";

// 引入组件的样式
import "swiper/css";
// 引入其他组件样式
import "swiper/css/pagination";
import "swiper/css/navigation";

// 声明接受props数据
defineProps<{
	imageList: any[];
}>();

// 定义好将来不会发生变化，就不需要定义成响应
const modules = [Autoplay, Pagination, Navigation];
</script>

<style></style>
