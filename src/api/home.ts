import request from "../utils/request";
import requestMock from "../utils/requestMock";

// 获取首页三级分类接口
export const reqGetCategoryList = (): any => {
	return request({
		method: "GET",
		// url: "/api/product/getBaseCategoryList",
		url: "/product/getBaseCategoryList", // 会自动添加/api
	});
};

// 获取首页轮播图列表
export const reqGetBannerList = (): any => {
	// 未来：后端开发好接口后，需要修改使用request发送请求
	return requestMock({
		method: "GET",
		url: "/getBannerList", // 会自动添加/mockApi
	});
};
