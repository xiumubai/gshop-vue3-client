<template>
	<footer class="footer">
		<div class="footer-top">
			<div class="footer-nav">
				<span class="footer-nav-title">购物指南</span>
				<span>购物流程</span>
				<span>会员介绍</span>
				<span>生活旅行/团购</span>
				<span>常见问题</span>
				<span>购物指南</span>
			</div>

			<div class="footer-nav">
				<span class="footer-nav-title">配送方式</span>
				<span>上门自提</span>
				<span>211限时达</span>
				<span>配送服务查询</span>
				<span>配送费收取标准</span>
				<span>海外配送</span>
			</div>

			<div class="footer-nav">
				<span class="footer-nav-title">支付方式</span>
				<span>货到付款</span>
				<span>在线支付</span>
				<span>分期付款</span>
				<span>邮局汇款</span>
				<span>公司转账</span>
			</div>

			<div class="footer-nav">
				<span class="footer-nav-title">售后服务</span>
				<span>售后政策</span>
				<span>价格保护</span>
				<span>退款说明</span>
				<span>返修/退换货</span>
				<span>取消订单</span>
			</div>

			<div class="footer-nav">
				<span class="footer-nav-title">特色服务</span>
				<span>夺宝岛</span>
				<span>DIY装机</span>
				<span>延保服务</span>
				<span>尚品汇E卡</span>
				<span>尚品汇通信</span>
			</div>

			<div class="footer-nav">
				<span class="footer-nav-title">帮助中心</span>
				<img src="./images/wx_cz.jpg" alt="wx" />
			</div>
		</div>

		<div class="footer-bottom">
			<p class="footer-about">
				<span>关于我们</span>
				<span>联系我们</span>
				<span>商家入驻</span>
				<span>营销中心</span>
				<span>友情链接</span>
				<span>关于我们</span>
				<span>联系我们</span>
				<span>商家入驻</span>
				<span>营销中心</span>
				<span>友情链接</span>
			</p>
			<p class="footer-address">地址: 北京市昌平区宏福科技园2号楼3层</p>
			<p>京ICP备19006430号</p>
		</div>
	</footer>
</template>

<script lang="ts">
export default {
	name: "Footer",
};
</script>

<script lang="ts" setup></script>

<style lang="less">
.footer {
	background-color: #eaeaea;
}
.footer-top {
	display: flex;
	justify-content: space-around;
	border-bottom: 1px solid #e4e1e1;
	border-top: 1px solid #e4e1e1;
	padding: 20px 0;
}

.footer-nav {
	display: flex;
	flex-direction: column;
}

.footer-nav-title {
	font-size: 14px;
	font-weight: 700;
}

.footer-bottom {
	display: flex;
	align-items: center;
	flex-direction: column;
	padding: 20px 0;
}

.footer-about {
	margin-bottom: 15px;
	span {
		border-right: 1px solid #000;
		padding-right: 10px;
		margin-right: 10px;
		&:last-child {
			border-right: none;
			padding-right: 0;
			margin-right: 0;
		}
	}
}

.footer-address {
	margin-bottom: 10px;
}
</style>
