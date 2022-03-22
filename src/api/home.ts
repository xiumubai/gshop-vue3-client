
import request from "../utils/request";

// 获取首页三级分类接口
export const reqGetCategoryList = (): any => {
	return request({
		method: "GET",
		// url: "/api/product/getBaseCategoryList",
		url: "/product/getBaseCategoryList", // 会自动添加/api
	});
};
