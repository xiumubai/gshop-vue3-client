import axios from "axios";

// 获取首页三级分类接口
export const reqGetCategoryList = () => {
	return axios({
		method: "GET",
		url: "/api/product/getBaseCategoryList",
	});
};
