<template>
	<div>
		<TypeNav />
		<div class="main">
			<div class="py-container">
				<!--bread-->
				<div class="bread">
					<ul class="fl sui-breadcrumb">
						<li>
							<a href="#">全部结果</a>
						</li>
					</ul>
					<ul class="fl sui-tag">
						<li class="with-x">手机</li>
						<li class="with-x">iphone<i>×</i></li>
						<li class="with-x">华为<i>×</i></li>
						<li class="with-x">OPPO<i>×</i></li>
					</ul>
				</div>

				<!-- 品牌和平台属性 -->
				<SearchSelector :trademarkList="trademarkList" :attrsList="attrsList" />

				<!--details-->
				<div class="details clearfix">
					<!-- 排序 -->
					<div class="sui-navbar">
						<div class="navbar-inner filter">
							<ul class="sui-nav">
								<li class="active">
									<a href="#">综合</a>
								</li>
								<li>
									<a href="#">销量</a>
								</li>
								<li>
									<a href="#">新品</a>
								</li>
								<li>
									<a href="#">评价</a>
								</li>
								<li>
									<a href="#">价格⬆</a>
								</li>
								<li>
									<a href="#">价格⬇</a>
								</li>
							</ul>
						</div>
					</div>
					<!-- 商品列表 -->
					<div class="goods-list">
						<ul class="yui3-g">
							<li v-for="goods in goodsList" :key="goods.id" class="yui3-u-1-5">
								<div class="list-wrap">
									<div class="p-img">
										<a><img :src="goods.defaultImg" /></a>
									</div>
									<div class="price">
										<strong>
											<em>¥</em>
											<i>{{ goods.price }}</i>
										</strong>
									</div>
									<div class="attr">
										<a>{{ goods.title }}</a>
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
						</ul>
					</div>
					<!-- 分页器 -->
					<div class="fr page">
						<div class="sui-pagination clearfix">
							<ul>
								<li class="prev disabled">
									<a href="#">«上一页</a>
								</li>
								<li class="active">
									<a href="#">1</a>
								</li>
								<li>
									<a href="#">2</a>
								</li>
								<li>
									<a href="#">3</a>
								</li>
								<li>
									<a href="#">4</a>
								</li>
								<li>
									<a href="#">5</a>
								</li>
								<li class="dotted"><span>...</span></li>
								<li class="next">
									<a href="#">下一页»</a>
								</li>
							</ul>
							<div><span>共10页&nbsp;</span></div>
						</div>
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
import { onMounted, ref, reactive, watch } from "vue";
import { useRoute } from "vue-router";
import SearchSelector from "./SearchSelector/SearchSelector.vue";
import { reqSearchGoodList } from "@/api/search";
import type { TrademarkList, AttrsList, GoodsList } from "./types";

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
const searchOption = reactive({
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

const searchGoodsList = async () => {
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
};

// 监视route，当route发生变化，说明query或params发生了变化
// 说明用户更新了搜索参数，那么我们就要重新搜索
watch(route, () => {
	searchGoodsList();
});

onMounted(() => {
	searchGoodsList();
});
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
										max-width: 100%;
										height: auto;
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

									i {
										margin-left: -5px;
									}
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
				width: 733px;
				height: 66px;
				overflow: hidden;
				float: right;

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
</style>
