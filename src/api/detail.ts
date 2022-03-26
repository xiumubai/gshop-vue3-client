import request from "../utils/request";

// 获取商品详情数据
export const reqGetGoodsDetail = (id: number): any => {
	return request({
		method: "GET",
		url: `/item/${id}`,
	});
};
