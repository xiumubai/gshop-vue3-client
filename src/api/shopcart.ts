import request from "../utils/request";

// 加入购物车功能（更新商品数量）
// 正数代表要增加的数量
// 负数代表要减少的数量
export const reqAddToCart = (skuId: number, skuNum: number): any => {
	return request({
		method: "POST",
		url: `/cart/addToCart/${skuId}/${skuNum}`,
	});
};

// 获取购物车列表
export const reqGetCartList = (): any => {
	return request({
		method: "GET",
		url: `/cart/cartList`,
	});
};

// 切换商品的选中状态
export const reqUpdateIsChecked = (skuId: number, isChecked: number): any => {
	return request({
		method: "GET",
		url: `/cart/checkCart/${skuId}/${isChecked}`,
	});
};

// 删除商品
export const reqDeleteCart = (skuId: number): any => {
	return request({
		method: "DELETE",
		url: `/cart/deleteCart/${skuId}`,
	});
};
