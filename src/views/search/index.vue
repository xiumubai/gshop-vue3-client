<template>
	<div>
		<TypeNav />
		<div class="main">
			<div class="py-container">
				<!-- 搜索条件 -->
				<div class="bread">
					<ul class="fl sui-breadcrumb">
						<li>
							<a href="#">全部结果</a>
						</li>
					</ul>
					<ul class="fl sui-tag">
						<li v-if="route.query.categoryName" class="with-x">
							{{ route.query.categoryName }}
							<i @click="removeCategory">×</i>
						</li>

						<li v-if="route.params.keyword" class="with-x">
							{{ route.params.keyword }}
							<i @click="removeKeyword">×</i>
						</li>

						<li v-if="searchOption.trademark" class="with-x">
							{{ searchOption.trademark.split(":")[1] }}
							<i @click="removeTrademark">×</i>
						</li>

						<li v-for="(prop, index) in searchOption.props" class="with-x">
							{{ `${prop.split(":")[2]}: ${prop.split(":")[1]}` }}
							<i @click="removeAttr(index)">×</i>
						</li>
					</ul>
				</div>

				<!-- 品牌和平台属性 -->
				<SearchSelector
					:trademarkList="trademarkList"
					:attrsList="attrsList"
					@searchTrademark="searchTrademark"
					@searchAttr="searchAttr"
				/>

				<!--details-->
				<div class="details clearfix">
					<!-- 排序 -->
					<div class="sui-navbar">
						<div class="navbar-inner filter">
							<ul class="sui-nav">
								<!--
									order: 1:asc
										orderName: 1 综合 2 价格
										orderType: asc 升序 desc 降序  
									1. active 高亮
										1 综合高亮
										2 价格高亮
										:class="{
											active: order[0] === '1',
										}"
										注意：类型是string

									2. 图标显示&隐藏
										1 综合图标显示，价格图标隐藏
										2 价格图标显示，综合图标隐藏
										v-show="order[0] === '1'"
									
									3. 切换图标
										asc 升序 向上 icon-rising
										desc 降序 向下 icon-falling
										:class="[
											'iconfont',
											order[1] === 'asc' ? 'icon-rising' : 'icon-falling',
										]"
									
									4. 绑定点击事件，切换排序方式
										- 点击综合orderName设置为1，点击价格orderName设置为2
										- 点击相同的取反，点击不同用desc
								-->
								<li
									:class="{
										active: order[0] === '1',
									}"
									@click="setOrder('1')"
								>
									<a>
										综合
										<!-- <i
											v-show="searchOption.order.split(':')[1] === 'asc'"
											class="iconfont icon-rising"
										></i>
										<i
											v-show="searchOption.order.split(':')[1] === 'desc'"
											class="iconfont icon-falling"
										></i> -->
										<i
											v-show="order[0] === '1'"
											:class="[
												'iconfont',
												order[1] === 'asc' ? 'icon-rising' : 'icon-falling',
											]"
										></i>
									</a>
								</li>
								<li>
									<a>销量</a>
								</li>
								<li>
									<a>新品</a>
								</li>
								<li>
									<a>评价</a>
								</li>
								<li
									:class="{
										active: order[0] === '2',
									}"
									@click="setOrder('2')"
								>
									<a>
										价格
										<i
											v-show="order[0] === '2'"
											:class="[
												'iconfont',
												order[1] === 'asc' ? 'icon-rising' : 'icon-falling',
											]"
										></i>
									</a>
								</li>
							</ul>
						</div>
					</div>
					<!-- 商品列表 -->
					<div class="goods-list">
						<ul class="yui3-g">
							<template v-for="goods in goodsList" :key="goods.id">
							<li  class="yui3-u-1-5">
								<div class="list-wrap" >
									<div class="p-img">
										<router-link
											:to="{
												name: 'Detail',
												params: {
													id: goods.id,
												},
											}"
										>
											<img :src="goods.defaultImg" class="goods-img" />
										</router-link>
									</div>
									<div class="price">
										<strong>
											<em>¥</em>
											<i>{{ goods.price }}</i>
										</strong>
									</div>
									<div class="attr">
										<a v-html="goods.title"></a>
									</div>
									<div class="commit">
										<i class="command">已有<span>2000</span>人评价</i>
									</div>
									<div class="operate">
										<a class="sui-btn btn-bordered btn-danger">加入购物车</a>
										<a class="sui-btn btn-bordered">收藏</a>
									</div>
								</div>
							</li>
						</template>
						</ul>
					</div>
					<!-- 分页器 -->
					<div class="fr page">
						<!-- 
							v-model双向数据绑定
								传递props数据：currentPage
								传递更新数据的事件：update:currentPage

							防抖函数：在单位时间内，函数最后一次调用生效
							节流函数：在单位时间内，函数第一次调用生效
								都是对函数的性能优化，让指定函数在单位时间内只触发一次
						-->
						<Pagination
							v-model:currentPage="searchOption.pageNo"
							v-model:pageSize="searchOption.pageSize"
							:total="total"
							@size-change="searchGoodsList"
							@current-change="searchGoodsList"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
export default {
	name: "Search",
};
</script>

<script lang="ts" setup>
import { onMounted, ref, reactive, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import debounce from "lodash/debounce";
import SearchSelector from "./SearchSelector/SearchSelector.vue";
import { reqSearchGoodList } from "@/api/search";
import type { TrademarkList, AttrsList, GoodsList } from "./types";
import type { searchGoodsListParams } from "@/api/search";

// 品牌列表
const trademarkList = ref<TrademarkList>([]);
// 平台属性列表
const attrsList = ref<AttrsList>([]);
// 商品列表
const goodsList = ref<GoodsList>([]);
// 总数
const total = ref(0);

/*
	使用reactive定义数据，将来操作数据可以 searchOption.xxx 直接操作
	如果使用ref定义数据，将来操作数据需要 searchOption.value.xxx 操作，太麻烦了
*/
// 初始化所有搜索条件
const searchOption = reactive<searchGoodsListParams>({
	// 分类id
	// category1Id: undefined,
	// category2Id: undefined,
	// category3Id: undefined,
	// 分类名称
	// categoryName: "",
	// 搜索关键字
	// keyword: "",
	// 以上条件可以不用存储，因为在query和params中携带了，直接从query和params中读取即可
	// 平台属性列表
	props: [],
	// 品牌
	trademark: "",
	// 默认情况下：是需要综合排序 1: 综合,2: 价格 asc: 升序,desc: 降序
	// 排序
	order: "1:desc",
	// 当前页码
	pageNo: 1,
	// 每页条数
	pageSize: 5,
});

/*
	完成搜索功能：
		1. 分类搜索
		2. 关键字搜索
		3. 品牌搜索
		4. 平台属性搜索
		5. 排序搜索
		6. 分页搜索

	分析：搜索时要保留上次的搜索条件 + 当前的搜索条件一起搜索
	解决：定义一个对象数据来存储搜索条件，将来搜索时，将存储搜索条件 + 当前的搜索条件一起搜索
*/

const route = useRoute();

// 使用防抖对函数性能进行优化
// 减少函数调用的次数
const searchGoodsList = debounce(async () => {
	// 解决搜索条件
	const option = {
		...searchOption, // 品牌\平台属性\排序\分页
		...route.query, // 分类
		...route.params, // 关键字
	};
	const data = await reqSearchGoodList(option);
	trademarkList.value = data.trademarkList;
	attrsList.value = data.attrsList;
	goodsList.value = data.goodsList;
	total.value = data.total;
}, 200);

// 监视route，当route发生变化，说明query或params发生了变化
// 说明用户更新了搜索参数，那么我们就要重新搜索
watch(route, () => {
	searchGoodsList();
});

onMounted(() => {
	searchGoodsList();
});

// 搜索品牌
const searchTrademark = (tm: string) => {
	// 判断上次的品牌条件 和 最新点击的品牌条件 是否相等
	if (searchOption.trademark === tm) {
		// 如果相等，说明点击同一个
		return;
	}
	// 更新搜索条件
	searchOption.trademark = tm;
	// 搜索
	searchGoodsList();
};

// 搜索属性
const searchAttr = (attr: string) => {
	// 判断props中是否已存在attr属性
	if (searchOption.props.includes(attr)) {
		return;
	}
	// 更新搜索条件
	searchOption.props.push(attr);
	// 搜索
	searchGoodsList();
};

// 删除品牌搜索条件
const removeTrademark = () => {
	searchOption.trademark = "";
	// 搜索
	searchGoodsList();
};
// 删除属性
const removeAttr = (index: number) => {
	searchOption.props.splice(index, 1);
	// 搜索
	searchGoodsList();
};

const router = useRouter();

// 删除分类
const removeCategory = () => {
	router.push({
		name: "Search",
		params: route.params,
	});
};
// 删除关键字
const removeKeyword = () => {
	// 当地址发生变化，会触发watch，重新搜索
	router.push({
		name: "Search",
		query: route.query,
	});
};

// 用来缓存order值
const order = computed(() => {
	return searchOption.order.split(":");
});
// 设置排序
const setOrder = (orderName: string) => {
	// 计算属性返回的是ref数据，需要用value取值
	// orderName 1 或 2
	// orderType asc 或 desc
	let orderType;
	const [oldOrderName, oldOrderType] = order.value;
	/*
		点击相同的取反，点击不同的用默认值降序
	*/
	if (oldOrderName === orderName) {
		// 点击相同的取反
		orderType = oldOrderType === "asc" ? "desc" : "asc";
	} else {
		// 点击不同的用默认值降序
		orderType = "desc";
	}

	// 更新搜索条件
	searchOption.order = `${orderName}:${orderType}`;
	// 搜索
	searchGoodsList();
};
</script>

<style lang="less" scoped>
.main {
	margin: 10px 0;

	.py-container {
		width: 1200px;
		margin: 0 auto;

		.bread {
			margin-bottom: 5px;
			overflow: hidden;

			.sui-breadcrumb {
				padding: 3px 15px;
				margin: 0;
				font-weight: 400;
				border-radius: 3px;
				float: left;

				li {
					display: inline-block;
					line-height: 18px;

					a {
						color: #666;
						text-decoration: none;

						&:hover {
							color: #4cb9fc;
						}
					}
				}
			}

			.sui-tag {
				margin-top: -5px;
				list-style: none;
				font-size: 0;
				line-height: 0;
				padding: 5px 0 0;
				margin-bottom: 18px;
				float: left;

				.with-x {
					font-size: 12px;
					margin: 0 5px 5px 0;
					display: inline-block;
					overflow: hidden;
					color: #000;
					background: #f7f7f7;
					padding: 0 7px;
					height: 20px;
					line-height: 20px;
					border: 1px solid #dedede;
					white-space: nowrap;
					transition: color 400ms;
					cursor: pointer;

					i {
						margin-left: 10px;
						cursor: pointer;
						font: 400 14px tahoma;
						display: inline-block;
						height: 100%;
						vertical-align: middle;
					}

					&:hover {
						color: #28a3ef;
					}
				}
			}
		}

		.details {
			margin-bottom: 5px;

			.sui-navbar {
				overflow: visible;
				margin-bottom: 0;

				.filter {
					min-height: 40px;
					padding-right: 20px;
					background: #fbfbfb;
					border: 1px solid #e2e2e2;
					padding-left: 0;
					border-radius: 0;
					box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

					.sui-nav {
						position: relative;
						left: 0;
						display: block;
						float: left;
						margin: 0 10px 0 0;

						li {
							float: left;
							line-height: 18px;

							a {
								display: block;
								cursor: pointer;
								padding: 11px 15px;
								color: #777;
								text-decoration: none;
							}

							&.active {
								a {
									background: #e1251b;
									color: #fff;
								}
							}
						}
					}
				}
			}

			.goods-list {
				margin: 20px 0;

				ul {
					display: flex;
					flex-wrap: wrap;

					li {
						height: 100%;
						width: 20%;
						margin-top: 10px;
						line-height: 28px;

						.list-wrap {
							.p-img {
								padding-left: 15px;
								width: 215px;
								height: 255px;

								a {
									color: #666;

									img {
										// max-width: 100%;
										// height: auto;
										vertical-align: middle;
									}
								}
							}

							.price {
								padding-left: 15px;
								font-size: 18px;
								color: #c81623;

								strong {
									font-weight: 700;

									// i {
									// 	margin-left: -5px;
									// }
								}
							}

							.attr {
								padding-left: 15px;
								width: 85%;
								overflow: hidden;
								margin-bottom: 8px;
								min-height: 38px;
								cursor: pointer;
								line-height: 1.8;
								display: -webkit-box;
								-webkit-box-orient: vertical;
								-webkit-line-clamp: 2;

								a {
									color: #333;
									text-decoration: none;
								}
							}

							.commit {
								padding-left: 15px;
								height: 22px;
								font-size: 13px;
								color: #a7a7a7;

								span {
									font-weight: 700;
									color: #646fb0;
								}
							}

							.operate {
								padding: 12px 15px;

								.sui-btn {
									display: inline-block;
									padding: 2px 14px;
									box-sizing: border-box;
									margin-bottom: 0;
									font-size: 12px;
									line-height: 18px;
									text-align: center;
									vertical-align: middle;
									cursor: pointer;
									border-radius: 0;
									background-color: transparent;
									margin-right: 15px;
								}

								.btn-bordered {
									min-width: 85px;
									background-color: transparent;
									border: 1px solid #8c8c8c;
									color: #8c8c8c;

									&:hover {
										border: 1px solid #666;
										color: #fff !important;
										background-color: #666;
										text-decoration: none;
									}
								}

								.btn-danger {
									border: 1px solid #e1251b;
									color: #e1251b;

									&:hover {
										border: 1px solid #e1251b;
										background-color: #e1251b;
										color: white !important;
										text-decoration: none;
									}
								}
							}
						}
					}
				}
			}

			.page {
				display: flex;
				justify-content: center;
				// width: 733px;
				// height: 66px;
				// overflow: hidden;
				// float: right;

				.sui-pagination {
					margin: 18px 0;

					ul {
						margin-left: 0;
						margin-bottom: 0;
						vertical-align: middle;
						width: 490px;
						float: left;

						li {
							line-height: 18px;
							display: inline-block;

							a {
								position: relative;
								float: left;
								line-height: 18px;
								text-decoration: none;
								background-color: #fff;
								border: 1px solid #e0e9ee;
								margin-left: -1px;
								font-size: 14px;
								padding: 9px 18px;
								color: #333;
							}

							&.active {
								a {
									background-color: #fff;
									color: #e1251b;
									border-color: #fff;
									cursor: default;
								}
							}

							&.prev {
								a {
									background-color: #fafafa;
								}
							}

							&.disabled {
								a {
									color: #999;
									cursor: default;
								}
							}

							&.dotted {
								span {
									margin-left: -1px;
									position: relative;
									float: left;
									line-height: 18px;
									text-decoration: none;
									background-color: #fff;
									font-size: 14px;
									border: 0;
									padding: 9px 18px;
									color: #333;
								}
							}

							&.next {
								a {
									background-color: #fafafa;
								}
							}
						}
					}

					div {
						color: #333;
						font-size: 14px;
						float: right;
						width: 241px;
					}
				}
			}
		}
	}
}

.goods-img {
	width: 230px;
	height: 250px;
}
</style>
