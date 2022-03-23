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
		<!-- 
			1. 过去直接使用图片 
				<img src="./images/banner1.jpg" alt="1" />
				vite脚手架在编译代码时，会识别img标签，会打包图片
				所以最终能显示，可以使用

			2. 现在一上来没有img
				项目渲染完成了，再去请求图片，在渲染到页面上

				vite脚手架在编译代码时，没有识别到img需要打包图片
				所以没有打包（没有引入的资源就不会打包）
				没有打包，就不能访问该资源

				解决：想办法vite脚手架打包图片资源
					将图片放入public中
					因为public下面的资源不管使用不使用，都会被打包
		-->
		<SwiperSlide v-for="img in imageList" :key="img.id">
			<img :src="img.imgUrl" :alt="img.imgName" />
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

import type { ImageList } from "./types";

// 引入组件的样式
import "swiper/css";
// 引入其他组件样式
import "swiper/css/pagination";
import "swiper/css/navigation";

// 声明接受props数据
defineProps<{
	imageList: ImageList;
}>();

// 定义好将来不会发生变化，就不需要定义成响应
const modules = [Autoplay, Pagination, Navigation];
</script>

<style></style>
