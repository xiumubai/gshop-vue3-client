import request from "../utils/request";

// 获取订单列表
export const reqGetOrderList = (page: number, limit: number): any => {
	return request({
		method: "GET",
		url: `/order/auth/${page}/${limit}`,
	});
};
