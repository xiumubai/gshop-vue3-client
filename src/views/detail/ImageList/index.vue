<template>
	<!-- 
		slidesPerView 一页显示几张轮播图
		slidesPerGroup 每次轮播时，轮播几张图片
	-->
	<div class="detail-carousel">
		<Swiper
			:slidesPerView="5"
			:slidesPerGroup="5"
			:navigation="true"
			:modules="modules"
		>
			<SwiperSlide v-for="(img, index) in imageList" :key="img.id">
				<img
					:class="{ active: currentIndex === index }"
					:src="img.imgUrl"
					:alt="img.imgName"
					@click="emit('update:currentIndex', index)"
				/>
			</SwiperSlide>
		</Swiper>
	</div>
</template>

<script lang="ts">
export default {
	name: "ImageList",
};
</script>

<script lang="ts" setup>
// 引入Swiper基本组件
import { Swiper, SwiperSlide } from "swiper/vue";
// 想要具备其他功能，还需要引入其他组件
import { Navigation } from "swiper";
import type { ImageList } from "@/components/Carousel/types";

// 引入组件的样式
import "swiper/css";
// 引入其他组件样式
import "swiper/css/navigation";

// 声明接受props数据
defineProps<{
	imageList: ImageList;
	currentIndex: number;
}>();

const emit = defineEmits(["update:currentIndex"]);

const modules = [Navigation];
</script>

<style>
/* 
	当写lang="less"会做css的tree shaking：自动去除当前组件没有引用的样式代码
*/
.detail-carousel .swiper {
	height: 56px;
	width: 412px;
	box-sizing: border-box;
	padding: 0 12px;
}

.detail-carousel .swiper-slide {
	width: 56px;
	height: 56px;
}

.detail-carousel .swiper-slide img {
	border: 1px solid #ccc;
	padding: 2px;
	width: 50px;
	height: 50px;
	display: block;
}

.detail-carousel .swiper-slide img.active {
	border: 2px solid #f60;
	padding: 1px;
}

.detail-carousel .swiper-slide img:hover {
	border: 2px solid #f60;
	padding: 1px;
}

.detail-carousel .swiper-button-next {
	left: auto;
	right: 0;
}

.detail-carousel .swiper-button-prev {
	left: 0;
	right: auto;
}

.detail-carousel .swiper-button-next,
.detail-carousel .swiper-button-prev {
	box-sizing: border-box;
	width: 12px;
	height: 56px;
	background: rgb(235, 235, 235);
	border: 1px solid rgb(204, 204, 204);
	top: 0;
	margin-top: 0;
}

.detail-carousel .swiper-button-next::after,
.detail-carousel .swiper-button-prev::after {
	font-size: 12px;
	line-height: 56px;
	text-align: center;
}

.detail-carousel .swiper-button-lock {
	display: block;
}
</style>
