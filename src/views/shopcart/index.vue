<template>
	<div class="cart">
		<h4>全部商品</h4>
		<div class="cart-main">
			<div class="cart-th">
				<div class="cart-th1">全部</div>
				<div class="cart-th2">商品</div>
				<div class="cart-th3">单价（元）</div>
				<div class="cart-th4">数量</div>
				<div class="cart-th5">小计（元）</div>
				<div class="cart-th6">操作</div>
			</div>
			<div class="cart-body">
				<ul v-for="goods in goodsList" :key="goods.id" class="cart-list">
					<li class="cart-list-con1">
						<!-- <input
							type="checkbox"
							name="chk_list"
							:checked="Boolean(goods.isChecked)"
						/> -->
						<!-- 
							!! 取反取反
						-->
						<input
							type="checkbox"
							name="chk_list"
							:checked="!!goods.isChecked"
							@change="updateIsChecked(goods, 1 - goods.isChecked)"
						/>
					</li>
					<li class="cart-list-con2">
						<img :src="goods.imgUrl" />
						<div class="item-msg">
							{{ goods.skuName }}
						</div>
					</li>
					<!-- <li class="cart-list-con3">
						<div class="item-txt">语音升级款</div>
					</li> -->
					<li class="cart-list-con4">
						<span class="price">{{ goods.skuPrice }}</span>
					</li>
					<li class="cart-list-con5">
						<!-- 
							万一将来有100个商品
							1. 计算属性：不知道该计算哪个商品 
							2. 监视属性：不知道该监视哪个商品 
						-->
						<!-- <InputNumber :min="1" :max="100" v-model:value="goods.skuNum" /> -->
						<!-- 
							v-model:value="goods.skuNum"做了两件事
								value 属性
								update:value 事件
						-->
						<InputNumber
							:min="1"
							:max="100"
							:value="goods.skuNum"
							@update:value="updateGoodsSkuNum(goods, $event)"
						/>
					</li>
					<li class="cart-list-con6">
						<span class="sum">{{ goods.skuPrice * goods.skuNum }}</span>
					</li>
					<li class="cart-list-con7">
						<a class="sindelet" @click="delGoods(goods.skuId)">删除</a>
						<br />
						<a>移到收藏</a>
					</li>
				</ul>
			</div>
		</div>
		<div class="cart-tool">
			<div class="select-all">
				<input class="chooseAll" type="checkbox" v-model="isCheckAll" />
				<span>全选</span>
			</div>
			<div class="option">
				<a @click="patchDelGoods">删除选中的商品</a>
				<a>移到我的关注</a>
				<a>清除下柜商品</a>
			</div>
			<div class="money-box">
				<div class="chosed">
					已选择 <span> {{ allCheckedNum }} </span>件商品
				</div>
				<div class="sumprice">
					<em>总价（不含运费） ：</em>
					<i class="summoney">{{ totalPrice }} </i>
				</div>
				<div class="sumbtn">
					<a class="sum-btn" @click="goTrade">结算</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
export default {
	name: "ShopCart",
};
</script>

<script lang="ts" setup>
import { onMounted, ref, computed } from "vue";
import debounce from "lodash/debounce";
import { useRouter } from "vue-router";
import {
	reqGetCartList,
	reqAddToCart,
	reqUpdateIsChecked,
	reqDeleteCart,
} from "@/api/shopcart";
import InputNumber from "@/components/InputNumber/index.vue";
import type { GoodsList, GoodsItem } from "./types";

const router = useRouter();

// 去订单信息页
const goTrade = () => {
	if (allCheckedNum.value === 0) {
		alert("请至少选择一个商品下单");
		return;
	}

	router.push("/trade");
};

const goodsList = ref<GoodsList>([]);

onMounted(async () => {
	const data = await reqGetCartList();
	/*
		当没有购物车数据的时候，是空数组
		有购物车数据的时候 [{ cartInfoList: [] }]
	*/
	goodsList.value = data[0] ? data[0].cartInfoList : [];
});

// 更新商品数量
const updateGoodsSkuNum = debounce(
	async (goods: GoodsItem, newSkuNum: number) => {
		// skuId: 更新商品的id
		// console.log(skuId, newSkuNum);
		// 发送请求，更新服务器数据
		await reqAddToCart(goods.skuId, newSkuNum - goods.skuNum);
		// 更新客户端数据，计算总价才会发生变化
		goods.skuNum = newSkuNum;
	},
	200
);

// 单选
const updateIsChecked = async (goods: GoodsItem, isChecked: number) => {
	// reqUpdateIsChecked(goods.skuId, goods.isChecked ? 0 : 1);
	// const isChecked = 1 - goods.isChecked;
	await reqUpdateIsChecked(goods.skuId, isChecked);
	// 更新客户端
	goods.isChecked = isChecked;
};

const isCheckAll = computed({
	get() {
		return (
			goodsList.value.every((goods) => goods.isChecked) &&
			goodsList.value.length > 0
		);
	},
	set(val: boolean) {
		const isChecked = val ? 1 : 0;
		goodsList.value.forEach((goods) => {
			// 相等的，就没必要发送请求更新数据
			if (goods.isChecked === isChecked) return;
			updateIsChecked(goods, isChecked);
		});
	},
});

// 删除
const delGoods = async (skuId: number) => {
	await reqDeleteCart(skuId);
	// 下标删除，有问题
	// goodsList.value.splice(index, 1);
	goodsList.value = goodsList.value.filter((goods) => goods.skuId !== skuId);
};

// 批量删除
const patchDelGoods = async () => {
	goodsList.value.forEach((goods) => {
		if (goods.isChecked) {
			delGoods(goods.skuId);
		}
	});
};

// 已选择商品数量
const allCheckedNum = computed(() => {
	// return goodsList.value.reduce((p, c) => {
	// 	return p + c.isChecked;
	// }, 0);
	return goodsList.value.reduce((p, c) => p + c.isChecked, 0);
});
// 总价
const totalPrice = computed(() => {
	return goodsList.value.reduce((p, c) => {
		return p + (c.isChecked ? c.skuNum * c.skuPrice : 0);
	}, 0);
});
</script>

<style lang="less" scoped>
.cart {
	width: 1200px;
	margin: 0 auto;

	h4 {
		margin: 9px 0;
		font-size: 14px;
		line-height: 21px;
	}

	.cart-main {
		.cart-th {
			background: #f5f5f5;
			border: 1px solid #ddd;
			padding: 10px;
			overflow: hidden;

			& > div {
				float: left;
			}

			.cart-th1 {
				width: 25%;

				input {
					vertical-align: middle;
				}

				span {
					vertical-align: middle;
				}
			}

			.cart-th2 {
				width: 25%;
			}

			.cart-th3,
			.cart-th4,
			.cart-th5,
			.cart-th6 {
				width: 12.5%;
			}
		}

		.cart-body {
			margin: 15px 0;
			border: 1px solid #ddd;

			.cart-list {
				padding: 10px;
				border-bottom: 1px solid #ddd;
				overflow: hidden;
				display: flex;
				align-items: center;

				& > li {
					float: left;
				}

				.cart-list-con1 {
					width: 4.1667%;
				}

				.cart-list-con2 {
					width: 45%;

					img {
						width: 82px;
						height: 82px;
						float: left;
					}

					.item-msg {
						float: left;
						width: 350px;
						margin: 0 10px;
						line-height: 18px;
					}
				}

				.cart-list-con3 {
					width: 20.8333%;

					.item-txt {
						text-align: center;
					}
				}

				.cart-list-con4 {
					width: 12.5%;
				}

				.cart-list-con5 {
					width: 12.5%;

					.mins {
						border: 1px solid #ddd;
						border-right: 0;
						float: left;
						color: #666;
						width: 6px;
						text-align: center;
						padding: 8px;
					}

					input {
						border: 1px solid #ddd;
						width: 40px;
						height: 33px;
						float: left;
						text-align: center;
						font-size: 14px;
					}

					.plus {
						border: 1px solid #ddd;
						border-left: 0;
						float: left;
						color: #666;
						width: 6px;
						text-align: center;
						padding: 8px;
					}
				}

				.cart-list-con6 {
					width: 12.5%;

					.sum {
						font-size: 16px;
					}
				}

				.cart-list-con7 {
					width: 12.5%;

					a {
						color: #666;
					}
				}
			}
		}
	}

	.cart-tool {
		overflow: hidden;
		border: 1px solid #ddd;

		.select-all {
			padding: 10px;
			overflow: hidden;
			float: left;

			span {
				vertical-align: middle;
			}

			input {
				vertical-align: middle;
			}
		}

		.option {
			padding: 10px;
			overflow: hidden;
			float: left;

			a {
				float: left;
				padding: 0 10px;
				color: #666;
			}
		}

		.money-box {
			float: right;

			.chosed {
				line-height: 26px;
				float: left;
				padding: 0 10px;
			}

			.sumprice {
				width: 200px;
				line-height: 22px;
				float: left;
				padding: 0 10px;

				.summoney {
					color: #c81623;
					font-size: 16px;
				}
			}

			.sumbtn {
				float: right;

				a {
					display: block;
					position: relative;
					width: 96px;
					height: 52px;
					line-height: 52px;
					color: #fff;
					text-align: center;
					font-size: 18px;
					font-family: "Microsoft YaHei";
					background: #e1251b;
					overflow: hidden;
				}
			}
		}
	}
}
</style>
