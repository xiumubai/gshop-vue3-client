import request from "../utils/request";

// 发送验证码
export const reqSendCode = (phone: string): any => {
	return request({
		method: "GET",
		url: `/user/passport/sendCode/${phone}`,
	});
};
