<template>
	<div class="pay-main">
		<div class="pay-container">
			<div class="checkout-tit">
				<h4 class="tit-txt">
					<span class="success-icon"></span>
					<span class="success-info"
						>订单提交成功，请您及时付款，以便尽快为您发货~~</span
					>
				</h4>
				<div class="paymark">
					<span class="fl"
						>请您在提交订单<em class="orange time">4小时</em
						>之内完成支付，超时订单会自动取消。订单号：<em>{{
							route.query.orderId
						}}</em></span
					>
					<span class="fr"
						><em class="lead">应付金额：</em
						><em class="orange money">￥{{ route.query.totalAmount }}</em></span
					>
				</div>
			</div>
			<div class="checkout-info">
				<h4>重要说明：</h4>
				<ol>
					<li>
						尚品汇商城支付平台目前支持<span class="zfb">支付宝</span>支付方式。
					</li>
					<li>其它支付渠道正在调试中，敬请期待。</li>
					<li>为了保证您的购物支付流程顺利完成，请保存以下支付宝信息。</li>
				</ol>
				<h4>
					支付宝账户信息：（很重要，<span class="save">请保存！！！</span>）
				</h4>
				<ul>
					<li>支付帐号：11111111</li>
					<li>密码：111111</li>
					<li>支付密码：111111</li>
				</ul>
			</div>
			<div class="checkout-steps">
				<div class="step-tit">
					<h5>支付平台</h5>
				</div>
				<div class="step-cont">
					<ul class="payType">
						<li 
							:class="['item', {checked: item.checked}]"
							v-for="item in payTypeList"
							:key="item.id"
							@click="handleChangeType(item.id)"
						>
							<img :src="item.url" />
						</li>
					</ul>
				</div>
				<div class="hr"></div>

				<div class="payshipInfo">
					<div class="step-tit">
						<h5>支付网银</h5>
					</div>
					<div class="step-cont">
						<ul class="payType">
							<li 
								:class="['item', {checked: item.checked}]"
								v-for="item in payTypeList2" 
								:key="item.id" 
								@click="handleChangeType(item.id)"
							>
									<img :src="item.url" />
							</li>
						</ul>
					</div>
				</div>
				<div class="hr"></div>

				<div class="submit">
					<a class="btn" @click="showPayDialog">立即支付</a>
				</div>
				<div class="otherpay">
					<div class="step-tit">
						<h5>其他支付方式</h5>
					</div>
					<div class="step-cont">
						<span><a href="weixinpay.html" target="_blank">微信支付</a></span>
						<span>中国银联</span>
					</div>
				</div>
			</div>
		</div>
	</div>

	<Dialog title="微信支付" v-model:visible="visible">
		<img :src="codeUrl" alt="支付二维码" />
		<template #footer>
			<button class="dialog-btn" @click="goPaySuccess">支付成功</button>
			<button class="dialog-btn">支付遇到问题</button>
		</template>
	</Dialog>
</template>

<script lang="ts">
export default {
	name: "Pay",
};
</script>

<script lang="ts" setup>
import { ref, onBeforeUnmount } from "vue";
import { useRoute, useRouter } from "vue-router";
import QRCode from "qrcode";
import { reqGetQRCode, reqQueryPayStatus } from "@/api/pay";
import { PAYTYPELIST, PAYTYPELIST2 } from './constant';
const route = useRoute();
const router = useRouter();

const payTypeList = ref(PAYTYPELIST)
const payTypeList2 = ref(PAYTYPELIST2)

const visible = ref(false);
const codeUrl = ref("");
let timer: NodeJS.Timer;

const showPayDialog = async () => {
	visible.value = true;
	const orderId = +(route.query.orderId as string);
	// 发送请求，得到支付地址
	const data = await reqGetQRCode(orderId);
	// 将支付地址转换成二维码图片
	const url = await QRCode.toDataURL(data.codeUrl);

	codeUrl.value = url;

	// ajax轮询
	// 客户端不知道用户啥时候进行支付，是否支付成功
	// 只有服务器才知道是否支付成功
	// 所以：客户端只能不断询问服务器看是否支付成功
	timer = setInterval(async () => {
		await reqQueryPayStatus(orderId);
		goPaySuccess();
	}, 10000);
};

onBeforeUnmount(() => {
	clearInterval(timer);
});

const goPaySuccess = () => {
	router.push("/paysuccess");
};

const handleChangeType = (id: number) => {
	payTypeList.value.map(item => {
		item.checked = false
		if (item.id === id) {
			item.checked = true
		}
	})

	payTypeList2.value.map(item => {
		item.checked = false
		if (item.id === id) {
			item.checked = true
		}
	})
}

</script>

<style lang="less" scoped>
.pay-main {
	margin-bottom: 20px;

	.pay-container {
		margin: 0 auto;
		width: 1200px;

		a:hover {
			color: #4cb9fc;
		}

		.orange {
			color: #e1251b;
		}

		.money {
			font-size: 18px;
		}

		.zfb {
			color: #e1251b;
			font-weight: 700;
		}

		.checkout-tit {
			padding: 10px;

			.tit-txt {
				font-size: 14px;
				line-height: 21px;

				.success-icon {
					width: 30px;
					height: 30px;
					display: inline-block;
					background: url(./images/icon.png) no-repeat 0 0;
				}

				.success-info {
					padding: 0 8px;
					line-height: 30px;
					vertical-align: top;
				}
			}

			.paymark {
				overflow: hidden;
				line-height: 26px;
				text-indent: 38px;

				.fl {
					float: left;
				}

				.fr {
					float: right;

					.lead {
						margin-bottom: 18px;
						font-size: 15px;
						font-weight: 400;
						line-height: 22.5px;
					}
				}
			}
		}

		.checkout-info {
			padding-left: 25px;
			padding-bottom: 15px;
			margin-bottom: 10px;
			border: 2px solid #e1251b;

			h4 {
				margin: 9px 0;
				font-size: 14px;
				line-height: 21px;
				color: #e1251b;
			}

			ol {
				padding-left: 25px;
				list-style-type: decimal;
				line-height: 24px;
				font-size: 14px;
			}

			ul {
				padding-left: 25px;
				list-style-type: disc;
				line-height: 24px;
				font-size: 14px;
			}
		}

		.checkout-steps {
			border: 1px solid #ddd;
			padding: 25px;

			.hr {
				height: 1px;
				background-color: #ddd;
			}

			.step-tit {
				line-height: 36px;
				margin: 15px 0;
			}

			.step-cont {
				margin: 0 10px 12px 20px;

				ul {
					font-size: 0;

					li {
						margin: 2px;
						display: inline-block;
						// padding: 5px 20px;
						padding: 4px;
						border: 1px solid #ddd;
						cursor: pointer;
						position: relative;
						// line-height: 18px;
					}
					li:hover {
						border-color: #e1251b;
					}

					li.checked {
						border-color: #e1251b;
					}
					li.checked::after {
						content: '';
						display: block;
						position: absolute;
						right: -2px;
						bottom: -2px;
						width: 14px;
						height: 14px;
						overflow: hidden;
						background: url(https://misc.360buyimg.com/user/purchase/2.0.0/css/i/selected-icon.png) no-repeat;
					}
				}
			}
		}

		.submit {
			text-align: center;

			.btn {
				display: inline-block;
				padding: 15px 45px;
				margin: 15px 0 10px;
				font: 18px "微软雅黑";
				font-weight: 700;
				border-radius: 0;
				background-color: #e1251b;
				border: 1px solid #e1251b;
				color: #fff;
				text-align: center;
				vertical-align: middle;
				cursor: pointer;
				user-select: none;
				text-decoration: none;
			}
		}
	}
}

.dialog-btn {
	font-size: 14px;
	padding: 8px 15px;
	border-radius: 4px;
	color: #fff;
	background-color: #409eff;
	border: none;
	margin-right: 15px;
	cursor: pointer;
	&:hover {
		background-color: #79bbff;
	}
}
</style>
