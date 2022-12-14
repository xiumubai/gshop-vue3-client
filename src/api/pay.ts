import request from "../utils/request";
import type { DetailArrayList } from "@/views/trade/types";

// 获取订单信息
export const reqGetTrade = (): any => {
	return request({
		method: "GET",
		url: `/order/auth/trade`,
	});
};

interface reqSubmitOrderParams {
	tradeNo: string;
	consignee: string;
	consigneeTel: string;
	deliveryAddress: string;
	paymentWay: string;
	orderComment: string;
	orderDetailList: DetailArrayList;
}

// 提交订单
export const reqSubmitOrder = ({
	tradeNo,
	...data
}: any): any => {
	return request({
		method: "POST",
		url: `/order/auth/submitOrder`,
		params: {
			tradeNo,
		},
		data,
	});
};

// 获取支付二维码
export const reqGetQRCode = (orderId: number): any => {
	return request({
		method: "GET",
		url: `/payment/weixin/createNative/${orderId}`,
	});
};

// 查询订单支付状态
export const reqQueryPayStatus = (orderId: number): any => {
	return request({
		method: "GET",
		url: `/payment/weixin/queryPayStatus/${orderId}`,
	});
};
