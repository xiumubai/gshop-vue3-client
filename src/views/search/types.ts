interface TrademarkItem {
	tmId: number;
	tmName: string;
}

export type TrademarkList = TrademarkItem[];

interface AttrsItem {
	attrId: number;
	attrName: string;
	attrValueList: string[];
}

export type AttrsList = AttrsItem[];

// 定义数据类型，用什么定义什么就好
interface GoodsItem {
	// attrs: null;
	// category1Id: null;
	// category1Name: null;
	// category2Id: null;
	// category2Name: null;
	// category3Id: null;
	// category3Name: null;
	// createTime: null;
	// tmId: null;
	// tmName: null;
	// hotScore: 0;
	defaultImg: string;
	id: number;
	price: number;
	title: string;
}

export type GoodsList = GoodsItem[];
