import type { GoodsList } from "@/views/shopcart/types";

interface OrderItem {
	id: number;
	consignee: string;
	totalAmount: number;
	outTradeNo: string;
	createTime: string;
	orderStatusName: string;
	orderDetailList: GoodsList;
}

export type OrderList = OrderItem[];
