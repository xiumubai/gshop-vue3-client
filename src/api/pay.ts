import request from "../utils/request";

// 获取订单信息
export const reqGetTrade = (): any => {
	return request({
		method: "GET",
		url: `/order/auth/trade`,
	});
};
