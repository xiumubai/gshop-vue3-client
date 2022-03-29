<template>
	<div class="controls">
		<input
			autocomplete="off"
			class="itxt"
			:value="currentValue"
			@blur="setCurrentValue"
			@keyup.enter="setCurrentValue"
		/>
		<button :disabled="currentValue >= max" class="plus" @click="add">+</button>
		<button :disabled="currentValue <= min" class="mins" @click="count">
			-
		</button>
	</div>
</template>

<script lang="ts">
export default {
	name: "InputNumber",
};
</script>

<script lang="ts" setup>
/*
  1. 有最大值和最小值
    由外界传入使用
  2. 输入小于最小值的数，等于最小值
  3. 输入大于最大值的数，等于最大值
  4. 输入不是数字，等于上一次的结果
  5. 输入是小数，取整
*/
import { ref, watch } from "vue";

const props = defineProps<{
	min: number;
	max: number;
	value: number;
}>();

const emit = defineEmits(["update:value"]);

// 收集的数据
const currentValue = ref(props.value || props.min);

const add = () => {
	currentValue.value++;
};

const count = () => {
	currentValue.value--;
};

const setCurrentValue = (e: Event) => {
	// 默认读取的数是字符串
	// 转化number
	// 如果输入的不是数值，使用+转化number，变成NaN
	const value = +(e.target as HTMLInputElement).value;
	// 第一次修改 此时会触发watch
	currentValue.value = value;

	// 输入大于最大值的数，等于最大值
	// if (value > props.max) {
	// 	currentValue.value = props.max;
	// }
	// // 输入小于最小值的数，等于最小值
	// if (value < props.min) {
	// 	currentValue.value = props.min;
	// }

	// 输入不是数字，等于上一次的结果
	// if (Number.isNaN(value)) {
	// value 是最新值
	// currentValue 是上一次的值
	// console.log(value, currentValue.value);
	// currentValue.value = currentValue.value;
	// 页面没有更新
	// }
};

watch(currentValue, (newVal, oldValue) => {
	let value = newVal;
	// 输入大于最大值的数，等于最大值
	if (newVal > props.max) {
		// currentValue.value = props.max;
		// return;
		value = props.max;
	}
	// 输入小于最小值的数，等于最小值
	if (newVal < props.min) {
		// currentValue.value = props.min;
		// return;
		value = props.min;
	}
	// 输入不是数字，等于上一次的结果
	if (Number.isNaN(newVal)) {
		// currentValue.value = oldValue;
		// return;
		value = oldValue;
	}
	// 输入是小数，取整
	value = Math.floor(value);

	// 统一赋值
	currentValue.value = value; // 更新当前组件的值
	emit("update:value", value); // 更新父组件的值
});
</script>

<style lang="less" scoped>
.controls {
	width: 60px;
	position: relative;
	float: left;
	margin-right: 15px;

	.itxt {
		width: 50px;
		height: 37px;
		border: 1px solid #ddd;
		color: #555;
		float: left;
		border-right: 0;
		text-align: center;
		outline: none;
	}

	.plus,
	.mins {
		width: 15px;
		text-align: center;
		height: 17px;
		line-height: 17px;
		background: #f1f1f1;
		color: #666;
		position: absolute;
		right: -8px;
		border: 1px solid #ccc;
		&:disabled {
			color: #ccc;
			cursor: not-allowed;
		}
	}

	.mins {
		right: -8px;
		top: 19px;
		border-top: 0;
	}

	.plus {
		right: -8px;
	}
}
</style>
