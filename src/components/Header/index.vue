<template>
	<header class="header">
		<div class="header-top">
			<span>
				尚品汇欢迎您！ 请 <router-link to="/login">登录</router-link> |
				<router-link to="/register">免费注册</router-link>
			</span>

			<ul class="header-nav">
				<li>我的订单</li>
				<li>我的购物车</li>
				<li>我的尚品汇</li>
				<li>尚品汇会员</li>
				<li>企业采购</li>
				<li>关注尚品汇</li>
				<li>合作招商</li>
				<li class="header-nav-last">商家后台</li>
			</ul>
		</div>

		<div class="header-bottom">
			<router-link to="/">
				<img src="./images/logo.png" alt="logo" />
			</router-link>

			<form class="header-form">
				<input type="text" />
				<button>搜索</button>
			</form>
		</div>
	</header>
</template>

<script>
export default {
	name: "Header",
};
</script>

<script lang="ts" setup></script>

<style lang="less">
// vite脚手架默认是支持css预处理器，但是必须安装相关的依赖才能使用
// https://cn.vitejs.dev/guide/features.html#css-pre-processors

// 嵌套写样式：1. 体积更大 2. 解析速度更慢
// .header {
// 	.header-top {
// 		display: flex;
// 		justify-content: space-between;
// 		padding: 10px 20px;
// 		background-color: #eee;

// 		.header-nav {
// 			display: flex;
// 			li {
// 				border-right: 1px solid #000;
// 				padding-right: 10px;
// 				margin-right: 10px;
// 				&:last-child {
// 					border: none;
// 					padding-right: 0;
// 					margin-right: 0;
// 				}
// 			}
// 		}
// 	}

// 	.header-bottom {
// 		display: flex;
// 		justify-content: space-between;
// 		padding: 0 20px;

// 		.header-form {
// 			display: flex;
// 			align-items: center;

// 			input {
// 				box-sizing: border-box;
// 				border: 1px solid red;
// 				width: 500px;
// 				height: 30px;
// 				outline: none;
// 				padding: 0 10px;
// 				font-size: 16px;
// 			}
// 			button {
// 				background-color: red;
// 				color: #fff;
// 				width: 100px;
// 				height: 30px;
// 				border: none;
// 				cursor: pointer;
// 			}
// 		}
// 	}
// }

/*
	选择器不要嵌套太深，最多3-4层

	选择器从右往左解析

	选择器性能开销：
		1. id选择器
		2. 类选择器
		其他
	
	因为 类选择器 和 id选择器的性能开销基本一致，所以开发中尽可能使用类选择器
	提升样式解析的性能
*/
.header-top {
	display: flex;
	justify-content: space-between;
	padding: 10px 20px;
	background-color: #eee;
}

.header-nav {
	display: flex;
	li {
		border-right: 1px solid #000;
		padding-right: 10px;
		margin-right: 10px;
		// &:last-child {
		// 	border: none;
		// 	padding-right: 0;
		// 	margin-right: 0;
		// }
	}
	.header-nav-last {
		border: none;
		padding-right: 0;
		margin-right: 0;
	}
}

.header-bottom {
	display: flex;
	justify-content: space-between;
	padding: 0 20px;
}

.header-form {
	display: flex;
	align-items: center;

	input {
		box-sizing: border-box;
		border: 1px solid red;
		width: 500px;
		height: 30px;
		outline: none;
		padding: 0 10px;
		font-size: 16px;
	}

	button {
		background-color: red;
		color: #fff;
		width: 100px;
		height: 30px;
		border: none;
		cursor: pointer;
	}
}
</style>
