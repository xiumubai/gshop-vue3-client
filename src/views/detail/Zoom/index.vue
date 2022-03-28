<template>
	<div class="spec-preview">
		<!-- 小图 -->
		<img src="../images/s1.png" />
		<!-- 小图区域 -->
		<div class="event" @mousemove="move"></div>
		<!-- 大图 -->
		<div class="big">
			<!-- 
        负：因为大图运动和小绿是相反的，所以要取负数
        2倍：大图是小图大小的2倍
      -->
			<img
				src="../images/s1.png"
				:style="{ left: -2 * left + 'px', top: -2 * top + 'px' }"
			/>
		</div>
		<!-- 小绿 -->
		<div class="mask" :style="{ left: left + 'px', top: top + 'px' }"></div>
	</div>
</template>

<script lang="ts">
export default {
	name: "Zoom",
};
</script>

<script lang="ts" setup>
import { ref } from "vue";
import throttle from "lodash/throttle";

const left = ref(0);
const top = ref(0);

/*
  debounce防抖：分页器
  throttle节流：mousemove\scroll\发送验证码的按钮（功能按钮）
*/
// mousemove触发次数太多了
// 优化：使用节流优化
const move = throttle((e: MouseEvent) => {
	/*
    计算小绿的位置：left top

      e.offsetX 鼠标距离定位元素左侧的距离
      e.offsetY 鼠标距离定位元素上策的距离

      图片大小都是固定的：
        小图大小：400x400
        大图大小：800x800
        小绿大小：200x200

      let x = e.offsetX - 小绿自身宽度的一半
  */
	// console.log(e);
	let x = e.offsetX - 100;
	let y = e.offsetY - 100;

	// left和top都有最小值 0 和最大值 200
	if (x < 0) x = 0;
	if (x > 200) x = 200;
	if (y < 0) y = 0;
	if (y > 200) y = 200;

	left.value = x;
	top.value = y;
}, 1000 / 60);
</script>

<style lang="less">
.spec-preview {
	position: relative;
	width: 400px;
	height: 400px;
	border: 1px solid #ccc;

	img {
		width: 100%;
		height: 100%;
	}

	.event {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 998;
	}

	.mask {
		width: 50%;
		height: 50%;
		background-color: rgba(0, 255, 0, 0.3);
		position: absolute;
		left: 0;
		top: 0;
		display: none;
	}

	.big {
		width: 100%;
		height: 100%;
		position: absolute;
		top: -1px;
		left: 100%;
		border: 1px solid #aaa;
		overflow: hidden;
		z-index: 998;
		display: none;
		background: white;

		img {
			width: 200%;
			max-width: 200%;
			height: 200%;
			position: absolute;
			left: 0;
			top: 0;
		}
	}

	.event:hover ~ .mask,
	.event:hover ~ .big {
		display: block;
	}
}
</style>
