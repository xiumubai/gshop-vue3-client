import request from "../utils/request";

export interface searchGoodsListParams {
	// 分类id
	category1Id?: number;
	category2Id?: number;
	category3Id?: number;
	// 分类名称
	categoryName?: string;
	// 搜索关键字
	keyword?: string;
	// 平台属性列表
	props: string[];
	// 品牌
	trademark: string;
	// 排序
	order: string;
	// 当前页码
	pageNo: number;
	// 每页条数
	pageSize: number;
}

// 搜索商品列表
export const reqSearchGoodList = (data: searchGoodsListParams): any => {
	return request({
		method: "POST",
		url: "/list",
		data,
	});
};
