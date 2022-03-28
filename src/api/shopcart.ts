import request from "../utils/request";

// 加入购物车功能
export const reqAddToCart = (skuId: number, skuNum: number): any => {
	return request({
		method: "POST",
		url: `/cart/addToCart/${skuId}/${skuNum}`,
	});
};
