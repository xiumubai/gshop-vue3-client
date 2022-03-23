// 这个数组中的每个对象，将来都会在服务器搭建一个相应的路由
// 对外就能提供相应的接口服务了
export default [
	{
		// 请求前缀不能是/api, 会被代理服务器转发走，不会走mock服务器
		url: "/mockApi/getBannerList",
		method: "get",
		response: () => {
			// 保证响应数据结构符合开发要求
			return {
				code: 200,
				message: null,
				ok: true,
				data: [
					// 正常情况下，要和后端程序员沟通
					{
						id: 1,
						imgName: "banner1",
						imgUrl: "./images/banner1.jpg",
					},
					{
						id: 2,
						imgName: "banner2",
						imgUrl: "./images/banner2.jpg",
					},
					{
						id: 3,
						imgName: "banner3",
						imgUrl: "./images/banner3.jpg",
					},
					{
						id: 4,
						imgName: "banner4",
						imgUrl: "./images/banner4.jpg",
					},
				],
			};
		},
	},
];
