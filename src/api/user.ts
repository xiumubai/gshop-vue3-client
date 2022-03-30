import request from "../utils/request";
import type { User } from "@/views/register/types";

// 发送验证码
export const reqSendCode = (phone: string): any => {
	return request({
		method: "GET",
		url: `/user/passport/sendCode/${phone}`,
	});
};

// 注册
export const reqRegister = (data: User): any => {
	return request({
		method: "POST",
		url: `/user/passport/register`,
		data,
	});
};

// 登录
export const reqLogin = (phone: string, password: string): any => {
	return request({
		method: "POST",
		url: `/user/passport/login`,
		data: {
			phone,
			password,
		},
	});
};

// 退出登录
// 需要携带token参数
export const reqLogout = (): any => {
	return request({
		method: "GET",
		url: `/user/passport/logout`,
	});
};
