export const phoneReg = /^1[3-9][0-9]{9}$/;
// 定义表单校验规则
export const validatePhone: any = (value: string) => {
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

export const passwordReg = /^[a-zA-Z0-9_]{6,18}$/;
export const validatePassword: any = (value: string) => {
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
