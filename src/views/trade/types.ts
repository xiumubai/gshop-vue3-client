interface DetailArrayItem {
	id: number;
	skuName: string;
	imgUrl: string;
	skuNum: number;
	orderPrice: number;
}

type DetailArrayList = DetailArrayItem[];

export interface UserAddressItem {
	id: number;
	consignee: string; // 收件人姓名
	consigneeTel: string; // 收件人电话
	deliveryAddress: string; // 收件人地址
	isDefault: number;
}

type UserAddressList = UserAddressItem[];

export interface TradeInfo {
	userAddressList: UserAddressList;
	activityReduceAmount: number;
	detailArrayList: DetailArrayList; // 商品详情
	originalTotalAmount: number; // 原来价格
	totalAmount: number; // 满减后价格
	totalNum: number; // 数量
	tradeNo: string; // 订单号
}
