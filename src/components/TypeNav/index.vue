<template>
	<!-- 商品分类导航 -->
	<div class="type">
		<div class="container">
			<h2 class="all">全部商品分类</h2>
			<nav class="nav">
				<a href="###">服装城</a>
				<a href="###">美妆馆</a>
				<a href="###">尚品汇超市</a>
				<a href="###">全球购</a>
				<a href="###">闪购</a>
				<a href="###">团购</a>
				<a href="###">有趣</a>
				<a href="###">秒杀</a>
			</nav>
			<!-- 三级分类导航 -->
			<div class="sort">
				<div class="all-sort-list2">
					<!-- 
						需求：点击三级分类，跳转到search路由，同时携带两个query参数
							categoryName
							category1Id/category2Id/category3Id

						解决：
							1. 路由链接跳转
								router-link

									<router-link
										:to="{
											name: 'Search',
											query: {
												categoryName: c2.categoryName,
												category2Id: c2.categoryId,
											},
										}"
									>
										{{ c2.categoryName }}
									</router-link>

					 -->
					<!-- 每一个item都是一个完整三级分类 -->
					<div v-for="c1 in categoryList" :key="c1.categoryId" class="item bo">
						<!-- 一级分类 -->
						<h3>
							<!-- <a href="">{{ c1.categoryName }}</a> -->
							<!-- <router-link
								:to="`/search?categoryName=${c1.categoryName}&category1Id=${c1.categoryId}`"
							>
								{{ c1.categoryName }}
							</router-link> -->
							<router-link
								:to="{
									name: 'Search',
									query: {
										categoryName: c1.categoryName,
										category1Id: c1.categoryId,
									},
								}"
							>
								{{ c1.categoryName }}
							</router-link>
						</h3>
						<div class="item-list clearfix">
							<div class="subitem">
								<dl
									v-for="c2 in c1.categoryChild"
									:key="c2.categoryId"
									class="fore"
								>
									<!-- 二级分类 -->
									<dt>
										<router-link
											:to="{
												name: 'Search',
												query: {
													categoryName: c2.categoryName,
													category2Id: c2.categoryId,
												},
											}"
										>
											{{ c2.categoryName }}
										</router-link>
									</dt>
									<!-- 三级分类 -->
									<dd>
										<em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
											<router-link
												:to="{
													name: 'Search',
													query: {
														categoryName: c3.categoryName,
														category3Id: c3.categoryId,
													},
												}"
											>
												{{ c3.categoryName }}
											</router-link>
										</em>
									</dd>
								</dl>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
export default {
	name: "TypeNav",
};
</script>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { reqGetCategoryList } from "../../api/home";
// 引入类型定义
import type { CategoryList } from "./types";

// mounted生命周期函数
// onMounted(async () => {
// 	const res = await reqGetCategoryList();
// 	console.log(res);

// 	// 请求成功，并不能代表功能成功，也有可能功能失败
// 	// 返回值promise对象变成成功状态，只代表请求成功
// 	// 还需要判断code的值才能知道，功能是否成功
// 	if (res.data.code === 200) {
// 		console.log("功能成功", res.data.data);
// 	} else {
// 		console.log("功能失败", res.data.message);
// 	}
// });

// 定义响应式数据：三级分类数据
const categoryList = ref<CategoryList>([]);

onMounted(async () => {
	// try {
	const data = await reqGetCategoryList();
	// 功能成功
	categoryList.value = data;
	// } catch (error) {
	// 	// 请求失败、功能失败
	// 	console.log(error);
	// }
});
</script>

<style lang="less">
.type {
	border-bottom: 2px solid #e1251b;

	.container {
		width: 1200px;
		margin: 0 auto;
		display: flex;
		position: relative;

		.all {
			width: 210px;
			height: 45px;
			background-color: #e1251b;
			line-height: 45px;
			text-align: center;
			color: #fff;
			font-size: 14px;
			font-weight: bold;
		}

		.nav {
			a {
				height: 45px;
				margin: 0 22px;
				line-height: 45px;
				font-size: 16px;
				color: #333;
			}
		}

		.sort {
			position: absolute;
			left: 0;
			top: 45px;
			width: 210px;
			height: 461px;
			position: absolute;
			background: #fafafa;
			z-index: 999;

			.all-sort-list2 {
				.item {
					h3 {
						line-height: 30px;
						font-size: 14px;
						font-weight: 400;
						overflow: hidden;
						padding: 0 20px;
						margin: 0;

						a {
							color: #333;
						}
					}

					.item-list {
						display: none;
						position: absolute;
						width: 734px;
						min-height: 460px;
						height: 200px;
						background: #f7f7f7;
						left: 210px;
						border: 1px solid #ddd;
						top: 0;
						z-index: 9999 !important;

						.subitem {
							float: left;
							width: 650px;
							padding: 0 4px 0 8px;

							dl {
								border-top: 1px solid #eee;
								padding: 6px 0;
								overflow: hidden;
								zoom: 1;

								&.fore {
									border-top: 0;
								}

								dt {
									float: left;
									width: 54px;
									line-height: 22px;
									text-align: right;
									padding: 3px 6px 0 0;
									font-weight: 700;
								}

								dd {
									float: left;
									width: 415px;
									padding: 3px 0 0;
									overflow: hidden;

									em {
										float: left;
										height: 14px;
										line-height: 14px;
										padding: 0 8px;
										margin-top: 5px;
										border-left: 1px solid #ccc;
									}
								}
							}
						}
					}

					&:hover {
						.item-list {
							display: block;
						}
					}
				}
			}
		}
	}
}
</style>
