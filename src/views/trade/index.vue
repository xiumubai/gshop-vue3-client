<template>
	<div class="trade-container">
		<h3 class="title">填写并核对订单信息</h3>
		<div class="content">
			<h5 class="receive">收件人信息</h5>
			<div
				v-for="user in tradeInfo.userAddressList"
				:key="user.id"
				class="address clearFix"
			>
				<span :class="{ username: true, selected: user.isDefault }">
					{{ user.consignee }}
				</span>
				<p>
					<span class="s1">{{ user.deliveryAddress }}</span>
					<span class="s2">{{ user.consigneeTel }}</span>
					<span v-if="user.isDefault" class="s3">默认地址</span>
				</p>
			</div>
			<div class="line"></div>
			<h5 class="pay">支付方式</h5>
			<div class="address clearFix">
				<span class="username selected">在线支付</span>
				<span class="username" style="margin-left: 5px">货到付款</span>
			</div>
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
				<span>{{ selectedUser.deliveryAddress }}</span>
				收货人：<span>{{ selectedUser.consignee }}</span>
				<span>{{ selectedUser.consigneeTel }}</span>
			</div>
		</div>
		<div class="sub clearFix">
			<router-link class="subBtn" to="/pay">提交订单</router-link>
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
import { reqGetTrade } from "@/api/pay";
import type { TradeInfo, UserAddressItem } from "./types";
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

// Pick<UserAddressItem, "consignee" | "consigneeTel" | "deliveryAddress">
const selectedUser = computed(() => {
	// 一开始是空数组，找不到内容，返回值是undefined。undefined读取属性就会报错
	// 解决：
	return (
		tradeInfo.value.userAddressList.find((user) => user.isDefault) || {
			consignee: "",
			consigneeTel: "",
			deliveryAddress: "",
		}
	);
});
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

		.receive,
		.pay {
			line-height: 36px;
			margin: 18px 0;
		}

		.address {
			padding-left: 20px;
			margin-bottom: 15px;

			.username {
				float: left;
				width: 100px;
				height: 30px;
				line-height: 30px;
				text-align: center;
				border: 1px solid #ddd;
				position: relative;
			}

			.username::after {
				content: "";
				display: none;
				width: 13px;
				height: 13px;
				position: absolute;
				right: 0;
				bottom: 0;
				background: url(./images/choosed.png) no-repeat;
			}

			.username.selected {
				border-color: #e1251b;
			}

			.username.selected::after {
				display: block;
			}

			p {
				width: 610px;
				float: left;
				line-height: 30px;
				margin-left: 10px;
				padding-left: 5px;
				cursor: pointer;

				.s1 {
					float: left;
				}

				.s2 {
					float: left;
					margin: 0 5px;
				}

				.s3 {
					float: left;
					width: 56px;
					height: 24px;
					line-height: 24px;
					margin-left: 10px;
					background-color: #878787;
					color: #fff;
					margin-top: 3px;
					text-align: center;
				}
			}

			p:hover {
				background-color: #ddd;
			}
		}

		.line {
			height: 1px;
			background-color: #ddd;
		}

		.way {
			width: 1080px;
			height: 110px;
			background: #f4f4f4;
			padding: 15px;
			margin: 0 auto;

			h5 {
				line-height: 50px;
			}

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
		}
	}
}
</style>
