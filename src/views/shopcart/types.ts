export interface GoodsItem {
	id: number;
	skuName: string;
	imgUrl: string;
	skuNum: number;
	skuPrice: number;
	isChecked: number;
	skuId: number;
}

export type GoodsList = GoodsItem[];
