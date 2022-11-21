import request from "../utils/request";

// 获取用户地址列表
export const findUserAddressList = (): any => {
	return request({
		method: "GET",
		url: `/user/userAddress/auth/findUserAddressList`,
	});
};

// 获取地址大区列表
export const findBaseRegion = (): any => {
	return request({
		method: "GET",
		url: `/user/userAddress/auth/findBaseRegion`,
	});
};

// 根据地址大区获取省份
export const findBaseProvinceByRegionId = (regionId:number | string): any => {
	return request({
		method: "GET",
		url: `/user/userAddress/auth/findBaseProvinceByRegionId/${regionId}`,
	});
};

// 新增用户地址
export const saveAddress = (userAddressInfo: any): any => {
	return request({
		method: "POST",
		url: `/user/userAddress/auth/save`,
    data: {
      ...userAddressInfo
    }
	});
};

// 删除用户地址
export const delAddress = (userAddressId: number): any => {
	return request({
		method: "GET",
		url: `/user/userAddress/auth/delete/${userAddressId}`,
	});
};

// 更新用户地址
export const updateAddress = (userAddressInfo: any): any => {
	return request({
		method: "POST",
		url: `/user/userAddress/auth/update`,
    data: {
      ...userAddressInfo
    }
	});
};
