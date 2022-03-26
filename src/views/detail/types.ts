export interface CategoryView {
	category1Name: string;
	category2Name: string;
	category3Name: string;
}

export interface SkuInfo {
	skuName: string;
	skuDesc: string;
	price: number;
}

interface SpuSaleAttrValueItem {
	id: number;
	saleAttrValueName: string;
}

type SpuSaleAttrValueList = SpuSaleAttrValueItem[];

interface SpuSaleAttrItem {
	id: number;
	saleAttrName: string;
	spuSaleAttrValueList: SpuSaleAttrValueList;
}

export type SpuSaleAttrList = SpuSaleAttrItem[];
