<template>
	<transition name="dialog">
		<div class="dialog" v-show="visible" @click.self="close">
			<!-- 
        将标题、内容区、底部由外界控制
          标题: props
          内容区: 默认插槽
          底部: 具名插槽 footer
      -->
			<div class="dialog-container">
				<div class="dialog-header">
					<span>{{ title }}</span>
					<span class="iconfont icon-close" @click="close"></span>
				</div>
				<div class="dialog-body"><slot /></div>
				<div class="dialog-footer"><slot name="footer" /></div>
			</div>
		</div>
	</transition>
</template>

<script lang="ts">
export default {
	name: "Dialog",
};
</script>

<script lang="ts" setup>
defineProps<{
	title: string;
	visible: boolean;
}>();

const emit = defineEmits(["update:visible"]);

const close = () => {
	emit("update:visible", false);
};
</script>

<style>
.dialog {
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
}

.dialog-container {
	width: 30%;
	padding: 20px;
	background-color: #fff;
	font-size: 16px;
	border-radius: 4px;
}

.dialog-header {
	font-size: 20px;
	display: flex;
	justify-content: space-between;
}

.dialog-body {
	padding: 20px 0;
}

.icon-close {
	cursor: pointer;
}

.dialog-leave-to,
.dialog-enter-from {
	opacity: 0;
}

.dialog-leave-to .dialog-container,
.dialog-enter-from .dialog-container {
	transform: translateY(-50px);
}

.dialog-leave-active,
.dialog-enter-active,
.dialog-leave-active .dialog-container,
.dialog-enter-active .dialog-container {
	transition: 0.3s all;
}

.dialog-leave-from,
.dialog-enter-to {
	opacity: 1;
}

.dialog-leave-from .dialog-container,
.dialog-enter-to .dialog-container {
	transform: translateY(0);
}
</style>
