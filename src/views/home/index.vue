<template>
	<TypeNav />
	<!-- 列表 -->
	<ListContainer />
	<!-- 今日推荐 -->
	<TodayRecommend />
	<!-- 商品排行 -->
	<Rank />
	<!-- 猜你喜欢 -->
	<Like />
	<!-- 楼层 -->
	<Floor />
	<!-- 商标 -->
	<Brand />
</template>

<script lang="ts">
export default {
	name: "Home",
};
</script>

<script lang="ts" setup>
import Brand from "./Brand/Brand.vue";
import Floor from "./Floor/Floor.vue";
import Like from "./Like/Like.vue";
import ListContainer from "./ListContainer/ListContainer.vue";
import Rank from "./Rank/Rank.vue";
import TodayRecommend from "./TodayRecommend/TodayRecommend.vue";
</script>

<style lang="less" scoped></style>
