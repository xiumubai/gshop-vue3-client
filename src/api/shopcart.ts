import request from "../utils/request";

// 加入购物车功能
export const reqAddToCart = (skuId: number, skuNum: number): any => {
	return request({
		method: "POST",
		url: `/cart/addToCart/${skuId}/${skuNum}`,
	});
};

// 获取购物车列表
export const reqGetCartList = () => {
	return request({
		method: "GET",
		url: `/cart/cartList`,
	});
};
