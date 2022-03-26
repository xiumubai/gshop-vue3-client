<template>
	<div class="pagination">
		<button
			:disabled="currentPage <= 1"
			class="btn-prev"
			@click="goPage(currentPage - 1)"
		>
			<i class="iconfont icon-arrow-left"></i>
		</button>
		<ul class="pager">
			<li
				:class="{
					active: currentPage === 1,
				}"
				@click="goPage(1)"
			>
				1
			</li>
			<li v-show="startEnd.start > 2">
				<i class="iconfont icon-ellipsis"></i>
			</li>
			<!-- 
				遍历展示中间按钮：
					1. 正常情况下：5个
						start: 2
						end: 6
						显示5个按钮
					2. 特殊情况下：0-4个
						start: 2
						end: 3
						要显示2个按钮

					所以要遍历的按钮数量：end - start + 1
					显示的值：
						item + start - 1
						start + index
			-->
			<li
				v-for="(item, index) in startEnd.end - startEnd.start + 1"
				:key="item"
				:class="{
					active: currentPage === startEnd.start + index,
				}"
				@click="goPage(startEnd.start + index)"
			>
				{{ startEnd.start + index }}
			</li>
			<li v-show="startEnd.end < totalPages - 1">
				<i class="iconfont icon-ellipsis"></i>
			</li>
			<li
				v-if="totalPages > 1"
				:class="{
					active: currentPage === totalPages,
				}"
				@click="goPage(totalPages)"
			>
				{{ totalPages }}
			</li>
		</ul>
		<button
			:disabled="currentPage >= totalPages"
			class="btn-next"
			@click="goPage(currentPage + 1)"
		>
			<i class="iconfont icon-arrow-right"></i>
		</button>
		<select class="sizes">
			<option value="5">每页 5 条</option>
			<option value="10">每页 10 条</option>
			<option value="15">每页 15 条</option>
			<option value="20">每页 20 条</option>
		</select>
		<span>总数：{{ total }}</span>
	</div>
</template>

<script lang="ts">
export default {
	name: "Pagination",
};
</script>

<script lang="ts" setup>
import { computed } from "vue";
// defineProps可以不用引入，直接使用（只有它可以）
// 如果在模板页面使用，直接用
// 如果在setup中使用props，要先得到props才能使用
const props = defineProps<{
	currentPage: number;
	pageSize: number;
	total: number;
}>();

const emit = defineEmits(["update:currentPage", "update:pageSize"]);

// 总页数
const totalPages = computed(() => {
	return Math.ceil(props.total / props.pageSize);
});

/*
	要显示的数字按钮一共有7个
		1 ... 3 4 [5] 6 7 ... 10
		- 开头一定 1
		- 结尾一定 totalPages
		- 计算中间按钮显示
			- 中间按钮开头 start
			- 中间按钮的结尾 end

	1. 计算中间按钮显示 start\end

		- 理想情况下： 1 ... 3 4 [5] 6 7 ... 10
		start = currentPage - 2
		end = currentPage + 2
		end = start + 4

		- 特殊情况：1 [2] 3 4 5 6 ... 10
		此时，按照上面方式计算：
			start = 2 - 2 = 0
			end = 0 + 4 = 4
			但是实际需求：start = 2 end = 6
			怎么办？ start有最小值，
			  start = 2
				end = 2 + 4 = 6

		- 特殊情况：1 ... 5 6 7 8 [9] 10
		此时，按照上面方式计算：
			start = 9 - 2 = 7
			end = 7 + 4 = 11
			但是实际需求：start = 5 end = 9
			怎么办？end有最大值，
				start = 7
				end = 11 > 9 = 9
				start = 9 - 4 = 5

		- 特殊情况：1 2 [3] 4 5
		此时，按照上面方式计算：
			start = 3 - 2 = 1 < 2 = 2
			end = 2 + 4 = 6 > 4 = 4
			start = 4 - 4 = 0
			但是实际需求：start = 2 end = 4
			怎么办？
				小于等于7个按钮以下，就直接赋值
				start = 2
				end = totalPages - 1

		- 特殊情况：1 [2]
		此时，按照上面方式计算：
			start = 2
			end = 1
		但是实际需求：中间按钮不需要显示
		怎么办？
			end - start + 1 === 0 这样不会遍历生成中间按钮
*/
// 计算中间按钮（不包含1和不包含结尾）
const startEnd = computed(() => {
	// 最大值
	const max = totalPages.value - 1;

	if (totalPages.value <= 2) {
		// 说明不需要展示中间按钮
		return {
			start: 2,
			end: 1,
		};
	}

	// 总页数小于7，不用计算start和end
	// start一定是2
	// end一定是总页数-1
	if (totalPages.value <= 7) {
		return {
			start: 2,
			end: max,
		};
	}

	let start = props.currentPage - 2;
	// start有最小值
	if (start < 2) start = 2;

	let end = start + 4;
	// end有最大值
	if (end > max) {
		end = max;
		start = end - 4;
	}

	return {
		start,
		end,
	};
});

// const prev = () => {
// 	// props数据是只读的，不能直接修改
// 	// 修改父组件props数据
// 	const currentPage = props.currentPage - 1;
// 	// if (currentPage < 1) return;
// 	emit("update:currentPage", currentPage);
// };

// const next = () => {
// 	const currentPage = props.currentPage + 1;
// 	// if (currentPage > totalPages.value) return;
// 	emit("update:currentPage", currentPage);
// };

const goPage = (currentPage: number) => {
	emit("update:currentPage", currentPage);
};
</script>

<style lang="less">
.pagination {
	display: flex;
	align-items: center;
	font-size: 14px;
	color: #303133;
}
.btn-prev,
.btn-next {
	cursor: pointer;
	border: none;
	padding: 0 6px;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 32px;
	width: 32px;
	background-color: #fff;
	&:hover {
		color: #409eff;
	}
	&:disabled {
		color: #a8abb2;
		opacity: 0.5;
		cursor: not-allowed;
	}
}

.pager {
	display: flex;
	align-items: center;
	li {
		padding: 0 4px;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 32px;
		height: 32px;
		cursor: pointer;
		&:hover {
			color: #409eff;
		}
	}
}

.sizes {
	margin: 0 20px;
	cursor: pointer;
}

.active {
	color: #409eff;
}
</style>
