<template>
	<div class="pagination">
		<button class="btn-prev"><i class="iconfont icon-arrow-left"></i></button>
		<ul class="pager">
			<li>1</li>
			<li>2</li>
			<li>3</li>
			<li>4</li>
			<li>5</li>
		</ul>
		<button class="btn-next"><i class="iconfont icon-arrow-right"></i></button>
		<select class="sizes">
			<option value="5">每页 5 条</option>
			<option value="10">每页 10 条</option>
			<option value="15">每页 15 条</option>
			<option value="20">每页 20 条</option>
		</select>
		<span>总数：xxx</span>
	</div>
</template>

<script lang="ts">
export default {
	name: "Pagination",
};
</script>

<script lang="ts" setup></script>

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
</style>
