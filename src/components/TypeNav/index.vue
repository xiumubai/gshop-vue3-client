<template>
	<!-- 商品分类导航 -->
	<div class="type">
		<div class="container" @mouseleave="isShow = false">
			<h2 class="all" @mouseenter="isShow = true">全部商品分类</h2>
			<nav class="nav" @mouseenter="isShow = false">
				<a href="###">服装城</a>
				<a href="###">美妆馆</a>
				<a href="###">尚品汇超市</a>
				<a href="###">全球购</a>
				<a href="###">闪购</a>
				<a href="###">团购</a>
				<a href="###">有趣</a>
				<a href="###">秒杀</a>
			</nav>
			<!-- 
				三级分类导航: 显示&隐藏 v-show
					1. 默认是隐藏的，移入显示、移出隐藏
					2. 首页永远都是显示，不会隐藏
						其他页面才会有显示&隐藏的效果（search）

						想办法让首页 v-show得值恒为true
			-->
			<div v-show="route.path === '/' || isShow" class="sort">
				<div class="all-sort-list2" @click="goSearch">
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
								问题：生成太多组件了
							
							2. 编程式导航

								<a @click="goSearch(c1.categoryName, c1.categoryId, 1)">
									{{ c1.categoryName }}
								</a>
								问题：绑定事件太多了
							
							3. 事件委托 + 自定义属性
								给他们父级元素绑定事件（只要绑定一个就好）
								自定义属性：给元素绑定相应的属性，方便使用
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
							<!-- <router-link
								:to="{
									// 因为将来如果携带params参数就只能使用name形式
									name: 'Search',
									// path: '/search',
									query: {
										categoryName: c1.categoryName,
										category1Id: c1.categoryId,
									},
								}"
							>
								{{ c1.categoryName }}
							</router-link> -->

							<!-- <a @click="goSearch(c1.categoryName, c1.categoryId, 1)">
								{{ c1.categoryName }}
							</a> -->

							<a
								:data-name="c1.categoryName"
								:data-id="c1.categoryId"
								:data-level="1"
							>
								{{ c1.categoryName }}
							</a>
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
										<a
											:data-name="c2.categoryName"
											:data-id="c2.categoryId"
											:data-level="2"
										>
											{{ c2.categoryName }}
										</a>
									</dt>
									<!-- 三级分类 -->
									<dd>
										<em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
											<a
												:data-name="c3.categoryName"
												:data-id="c3.categoryId"
												:data-level="3"
											>
												{{ c3.categoryName }}
											</a>
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
import { useRouter, useRoute } from "vue-router";
import { reqGetCategoryList } from "../../api/home";
// 引入类型定义
import type { CategoryList } from "./types";

// 三级分类的显示隐藏
const isShow = ref(false);
const route = useRoute();

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

// 只触发一次, 性能更好
const router = useRouter();
// 三级分类跳转函数
// const goSearch = (categoryName: string, categoryId: number, level: number) => {
// 	// 编程式导航 --> router
// 	router.push({
// 		name: "Search",
// 		query: {
// 			categoryName,
// 			// 当对象的属性是动态值，可以用[]赋值
// 			[`category${level}Id`]: categoryId,
// 		},
// 	});
// };

// 自己数据自己定义类型
// 别人的数据由别人定义类型
// 第三方库：就要下载第三方库类型定义
// DOM相关的，VSCODE全部定义好了，直接使用
const goSearch = (e: MouseEvent) => {
	// 触发事件目标元素 e.target
	// 如何获取自定义属性（data-xxx）: e.target.dataset
	// 联合类型只能读取公共的属性和方法，
	// 想要读取某个类型的属性和方法，要使用类型断言
	// HTMLAnchorElement就是a标签的类型定义
	const { name, id, level } = (e.target as HTMLAnchorElement).dataset;

	// 解决：点击空白区域跳转问题
	// 因为点击空白区域不是a标签，就没有自定义属性
	if (!name) return;

	router.push({
		name: "Search",
		query: {
			categoryName: name,
			[`category${level}Id`]: id,
		},
		params: route.params,
	});
};
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
			height: 480px;
			position: absolute;
			background: #fafafa;
			z-index: 999;
			a {
				cursor: pointer;
			}

			.all-sort-list2 {
				overflow: hidden;
				height: 480px;
				.item {
					h3 {
						line-height: 30px;
						font-size: 14px;
						font-weight: 400;
						overflow: hidden;
						margin: 0;

						a {
							display: block;
							padding: 0 20px;
							color: #333;
						}

						&:hover {
							background-color: pink;
						}
					}

					.item-list {
						display: none;
						position: absolute;
						width: 734px;
						min-height: 480px;
						height: 200px;
						background: #f7f7f7;
						left: 210px;
						border: 1px solid #ddd;
						top: 0;
						z-index: 9999 !important;
						overflow: hidden;

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
