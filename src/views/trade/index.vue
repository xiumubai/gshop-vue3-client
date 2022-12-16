<template>
	<div class="trade-container">
		<h3 class="title">填写并核对订单信息</h3>
		<div class="content">
			<Address @change-address="changeAddress"/>	
			<div class="line"></div>
			<Pay />
			<div class="line"></div>
			<h5 class="pay">送货清单</h5>
			<div class="way">
				<h5>配送方式</h5>
				<div class="info clearFix">
					<span class="s1">天天快递</span>
					<p>配送时间：预计8月10日（周三）09:00-15:00送达</p>
				</div>
			</div>
			<div class="detail">
				<h5>商品清单</h5>
				<ul
					v-for="goods in tradeInfo.detailArrayList"
					:key="goods.id"
					class="list clearFix"
				>
					<li>
						<img
							:src="goods.imgUrl"
							:alt="goods.skuName"
							style="width: 100px; height: 100px"
						/>
					</li>
					<li>
						<p>
							{{ goods.skuNum }}
						</p>
						<h4>7天无理由退货</h4>
					</li>
					<li>
						<h3>￥{{ goods.orderPrice }}</h3>
					</li>
					<li>X{{ goods.skuNum }}</li>
					<li>有货</li>
				</ul>
			</div>
			<div class="bbs">
				<h5>买家留言：</h5>
				<textarea
					v-model="orderComment"
					placeholder="建议留言前先与商家沟通确认"
					class="remarks-cont"
				></textarea>
			</div>
			<div class="line"></div>
			<div class="bill">
				<h5>发票信息：</h5>
				<div>普通发票（电子） 个人 明细</div>
				<h5>使用优惠/抵用</h5>
			</div>
		</div>
		<div class="money clearFix">
			<ul>
				<li>
					<b
						><i>{{ tradeInfo.totalNum }}</i
						>件商品，总商品金额</b
					>
					<span>¥{{ tradeInfo.originalTotalAmount }}</span>
				</li>
				<li>
					<b>返现：</b>
					<span>{{ tradeInfo.activityReduceAmount }}</span>
				</li>
				<li>
					<b>运费：</b>
					<span>0.00</span>
				</li>
			</ul>
		</div>
		<div class="trade">
			<div class="price">
				应付金额:　<span>¥{{ tradeInfo.totalAmount }}</span>
			</div>
			<div class="receiveInfo">
				寄送至:
				<span>{{ selectedUser.fullAddress }}</span>
				收货人：<span>{{ selectedUser.consignee }}</span>
				<span>{{ selectedUser.phoneNum }}</span>
			</div>
		</div>
		<div class="sub clearFix">
			<a class="subBtn" @click="submitOrder">提交订单</a>
		</div>
	</div>
</template>

<script lang="ts">
export default {
	name: "Trade",
};
</script>

<script lang="ts" setup>
import { onMounted, ref, computed } from "vue";
import { useRouter } from "vue-router";
import { reqGetTrade, reqSubmitOrder } from "@/api/pay";

import type { TradeInfo, UserAddressItem } from "./types";
import Address from './address/index.vue'
import Pay from './pay/index.vue'
/*
	activityReduceAmount: 0 满减
	detailArrayList: (2) [{…}, {…}] 商品详情
	originalTotalAmount: 12385 原来价格
	totalAmount: 12385 满减后价格
	totalNum: 2 数量
	tradeNo: "b06297e263d54f21a5fd4d70cdfdaf10" 订单号
	userAddressList: null 用户地址（没有数据，需要开发者自己定义）
*/
const tradeInfo = ref<TradeInfo>({
	userAddressList: [], // 因为一上来就要使用数组的方法
	activityReduceAmount: 0,
	detailArrayList: [], // 商品详情
	originalTotalAmount: 0, // 原来价格
	totalAmount: 0, // 满减后价格
	totalNum: 0, // 数量
	tradeNo: "", // 订单号
});
interface IUserSelect {
	phoneNum: number;
	consignee: string;
	fullAddress: string;	
}

const selectedUser = ref<IUserSelect>({
	phoneNum: 0,
	fullAddress: "",
	consignee: ""
}); 
const orderComment = ref("");
const changeAddress = (item: any) => {
	selectedUser.value = {
		...item
	}	
}
onMounted(async () => {
	const data = await reqGetTrade();
	tradeInfo.value = {
		...data,
		userAddressList: [
			{
				id: 1,
				consignee: "静哥", // 收件人姓名
				consigneeTel: "13814389438", // 收件人电话
				deliveryAddress: "深圳宝安后瑞洗脚城", // 收件人地址
				isDefault: 1,
			},
			{
				id: 2,
				consignee: "陶哥", // 收件人姓名
				consigneeTel: "13022222222", // 收件人电话
				deliveryAddress: "深圳宝安后瑞王者峡谷", // 收件人地址
				isDefault: 0,
			},
			{
				id: 3,
				consignee: "罗哥", // 收件人姓名
				consigneeTel: "13033333333", // 收件人电话
				deliveryAddress: "深圳宝安龙华区大保健", // 收件人地址
				isDefault: 0,
			},
		],
	};
});

const router = useRouter();

// 提交订单
const submitOrder = async () => {
	const { tradeNo, detailArrayList, totalAmount } = tradeInfo.value;
	const { consignee, phoneNum, fullAddress } = selectedUser.value;

	const orderId = await reqSubmitOrder({
		tradeNo,
		consignee,
		phoneNum,
		fullAddress,
		paymentWay: "ONLINE", // 支付方式
		orderComment: orderComment.value, // 订单备注
		orderDetailList: detailArrayList, // 商品列表
	});

	router.push({
		name: "Pay",
		query: {
			orderId,
			totalAmount,
		},
	});
};
</script>

<style lang="less" scoped>
.trade-container {
	.title {
		width: 1200px;
		margin: 0 auto;
		font-size: 14px;
		line-height: 21px;
	}

	.content {
		width: 1200px;
		margin: 10px auto 0;
		border: 1px solid rgb(221, 221, 221);
		padding: 25px;
		box-sizing: border-box;

		.line {
			height: 1px;
			background-color: #ddd;
		}

		h5 {
				line-height: 50px;
			}

		.way {
			width: 1080px;
			height: 110px;
			background: #f4f4f4;
			padding: 15px;
			margin: 0 auto;

			

			.info {
				margin-top: 20px;

				.s1 {
					float: left;
					border: 1px solid #ddd;
					width: 120px;
					height: 30px;
					line-height: 30px;
					text-align: center;
					margin-right: 10px;
				}

				p {
					line-height: 30px;
				}
			}
		}

		.detail {
			width: 1080px;

			background: #feedef;
			padding: 15px;
			margin: 2px auto 0;

			h5 {
				line-height: 50px;
			}

			.list {
				display: flex;
				justify-content: space-between;

				li {
					line-height: 30px;

					p {
						margin-bottom: 20px;
					}

					h4 {
						color: #c81623;
						font-weight: 400;
					}

					h3 {
						color: #e12228;
					}
				}
			}
		}

		.bbs {
			margin-bottom: 15px;

			h5 {
				line-height: 50px;
			}

			textarea {
				width: 100%;
				border-color: #e4e2e2;
				line-height: 1.8;
				outline: none;
				resize: none;
				padding: 8px;
			}
		}

		.bill {
			h5 {
				line-height: 50px;
			}

			div {
				padding-left: 15px;
			}
		}
	}

	.money {
		width: 1200px;
		margin: 20px auto;

		ul {
			width: 220px;
			float: right;

			li {
				line-height: 30px;
				display: flex;
				justify-content: space-between;

				i {
					color: red;
				}
			}
		}
	}

	.trade {
		box-sizing: border-box;
		width: 1200px;
		padding: 10px;
		margin: 10px auto;
		text-align: right;
		background-color: #f4f4f4;
		border: 1px solid #ddd;

		div {
			line-height: 30px;
		}

		.price span {
			color: #e12228;
			font-weight: 700;
			font-size: 14px;
		}

		.receiveInfo {
			color: #999;
		}
	}

	.sub {
		width: 1200px;
		margin: 0 auto 10px;

		.subBtn {
			float: right;
			width: 164px;
			height: 56px;
			font: 700 18px "微软雅黑";
			line-height: 56px;
			text-align: center;
			color: #fff;
			background-color: #e1251b;
			cursor: pointer;
		}
	}
}
</style>
