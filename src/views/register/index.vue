<template>
	<div class="register-container">
		<!-- 注册内容 -->
		<div class="register">
			<h3>
				注册新用户
				<span class="go">
					我有账号，去
					<router-link to="/login">登陆</router-link>
				</span>
			</h3>
			<!-- 
				submit 表单提交事件
			-->
			<Form @submit="register" v-slot="{ errors }">
				<div class="content">
					<label>手机号:</label>
					<!-- <input
						type="text"
						placeholder="请输入你的手机号"
						v-model="user.phone"
					/> -->
					<!-- 
						name 表单项名称
						rules 表单校验规则
					-->
					<Field name="phone" :rules="validatePhone" v-model="phone" />
					<span class="error-msg">{{ errors.phone }}</span>
					<!-- <ErrorMessage name="phone" /> -->
				</div>
				<div class="content">
					<label>验证码:</label>
					<Field name="code" :rules="validateCode" />
					<button
						:disabled="!phoneReg.test(phone) || isSendCode"
						type="button"
						@click="sendCode"
					>
						{{ isSendCode ? `还剩${time}s` : "发送验证码" }}
					</button>

					<span class="error-msg">{{ errors.code }}</span>
				</div>
				<div class="content">
					<label>登录密码:</label>
					<Field name="password" :rules="validatePassword" />
					<span class="error-msg">{{ errors.password }}</span>
				</div>
				<div class="content">
					<label>确认密码:</label>
					<Field name="rePassword" :rules="validateRePassword" />
					<span class="error-msg">{{ errors.rePassword }}</span>
				</div>
				<div class="controls">
					<Field
						name="isAgress"
						type="checkbox"
						:value="true"
						:rules="validateIsAgree"
					/>
					<!-- <input name="m1"  type="checkbox" v-model="user.isAgree" /> -->
					<span>同意协议并注册《尚品汇用户协议》</span>
					<span class="error-msg">{{ errors.isAgress }}</span>
				</div>
				<div class="btn">
					<button>完成注册</button>
				</div>
			</Form>
		</div>

		<!-- 底部 -->
		<div class="copyright">
			<ul>
				<li>关于我们</li>
				<li>联系我们</li>
				<li>联系客服</li>
				<li>商家入驻</li>
				<li>营销中心</li>
				<li>手机尚品汇</li>
				<li>销售联盟</li>
				<li>尚品汇社区</li>
			</ul>
			<div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
			<div class="beian">京ICP备19006430号</div>
		</div>
	</div>
</template>

<script lang="ts">
export default {
	name: "Register",
};
</script>

<script lang="ts" setup>
import { ref } from "vue";
// https://vee-validate.logaretm.com/v4/tutorials/basics#displaying-error-messages
import {
	Field,
	Form,
	// ErrorMessage
} from "vee-validate";
import { reqSendCode } from "@/api/user";

// 表单数据
const phone = ref("");
const time = ref(60);
const isSendCode = ref(false);

// 发送验证码
const sendCode = async () => {
	// 发送验证码
	isSendCode.value = true;
	// 倒计时效果
	const timer = setInterval(() => {
		// 每隔一秒time--
		time.value--;
		if (time.value <= 0) {
			// 倒计时结束了
			clearInterval(timer);
			time.value = 60;
			isSendCode.value = false;
		}
	}, 1000);

	// 正常情况下：验证码不会返回到客户端，只会发到手机上
	const code = await reqSendCode(phone.value);
	console.log(code);
};

/*
	去npm搜vue validate关键字 --> vee-validate
		1. 下载
			npm i vee-validate
		2. 引入组件
			import { Field, Form } from "vee-validate";
		3. 使用
			所有表单项包裹在Form中
				@submit 表单提交的事件（先进行表单校验，表单校验通过才会触发回调）
				v-slot="{ errors }" 得到表单校验失败的错误信息
				<Form @submit="register" v-slot="{ errors }">

			每个表单项使用Field组件：
				name是表单项名称
				rules是表单校验规则（验证规则函数可以获取整个表单的数据）
				<Field name="phone" :rules="validatePhone" />

				checkbox需要指定value
				<Field name="isAgress" :rules="validatePhone" type="checkbox" :value="true"/>
*/

// 注册
const register = (values) => {
	// values 整个表单收集的数据
	console.log(values);
};

const phoneReg = /1[3-9][0-9]{9}/;
// 定义表单校验规则
const validatePhone = (value: string) => {
	if (!value) {
		return "请输入手机号";
	}
	// 表单校验失败，返回值就是失败原因
	if (!phoneReg.test(value)) {
		return "手机号不符合规范";
	}
	// return 'xxxx'
	// 表单校验通过
	return true;
};

const codeReg = /[0-9]{6}/;
const validateCode = (value: string) => {
	if (!value) {
		return "请输入验证码";
	}
	// 表单校验失败，返回值就是失败原因
	if (!codeReg.test(value)) {
		return "验证码不符合规范";
	}
	// 表单校验通过
	return true;
};

const passwordReg = /[a-zA-Z0-9_]{6,18}/;
const validatePassword = (value: string) => {
	if (!value) {
		return "请输入密码";
	}
	// 表单校验失败，返回值就是失败原因
	if (!passwordReg.test(value)) {
		return "密码不符合规范";
	}
	// 表单校验通过
	return true;
};

const validateRePassword = (value: string, { form }) => {
	if (!value) {
		return "请输入确认密码";
	}
	// 表单校验失败，返回值就是失败原因
	if (form.password !== value) {
		return "两次密码输入不一致";
	}
	// 表单校验通过
	return true;
};

const validateIsAgree = (value: boolean) => {
	if (!value) {
		return "请同意用户协议";
	}

	return true;
};
</script>

<style lang="less" scoped>
.register-container {
	.register {
		width: 1200px;
		height: 445px;
		border: 1px solid rgb(223, 223, 223);
		margin: 0 auto;

		h3 {
			background: #ececec;
			margin: 0;
			padding: 6px 15px;
			color: #333;
			border-bottom: 1px solid #dfdfdf;
			font-size: 20.04px;
			line-height: 30.06px;

			span {
				font-size: 14px;
				float: right;

				a {
					color: #e1251b;
				}
			}
		}

		div:nth-of-type(1) {
			margin-top: 40px;
		}

		.content {
			padding-left: 390px;
			margin-bottom: 18px;
			position: relative;

			label {
				font-size: 14px;
				width: 96px;
				text-align: right;
				display: inline-block;
			}

			input {
				width: 270px;
				height: 38px;
				padding-left: 8px;
				box-sizing: border-box;
				margin-left: 5px;
				outline: none;
				border: 1px solid #999;
			}

			img {
				vertical-align: sub;
			}

			.error-msg {
				position: absolute;
				top: 100%;
				left: 495px;
				color: red;
			}
		}

		.controls {
			text-align: center;
			position: relative;

			input {
				vertical-align: middle;
			}

			.error-msg {
				position: absolute;
				top: 100%;
				left: 495px;
				color: red;
			}
		}

		.btn {
			text-align: center;
			line-height: 36px;
			margin: 17px 0 0 55px;

			button {
				outline: none;
				width: 270px;
				height: 36px;
				background: #e1251b;
				color: #fff !important;
				display: inline-block;
				font-size: 16px;
			}
		}
	}

	.copyright {
		width: 1200px;
		margin: 0 auto;
		text-align: center;
		line-height: 24px;

		ul {
			li {
				display: inline-block;
				border-right: 1px solid #e4e4e4;
				padding: 0 20px;
				margin: 15px 0;
			}
		}
	}

	button:disabled {
		color: #ccc;
		cursor: not-allowed;
	}
}
</style>
