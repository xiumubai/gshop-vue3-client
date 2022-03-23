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
	{
		// 请求前缀不能是/api, 会被代理服务器转发走，不会走mock服务器
		url: "/mockApi/getFloorList",
		method: "get",
		response: () => {
			// 保证响应数据结构符合开发要求
			return {
				code: 200,
				message: null,
				ok: true,
				data: [
					{
						id: 1,
						name: "家用电器",
						navList: [
							{ url: "#", text: "热门" },
							{ url: "#", text: "大家电" },
							{ url: "#", text: "生活电器" },
							{ url: "#", text: "厨房电器" },
							{ url: "#", text: "应季电器" },
							{ url: "#", text: "空气/净水" },
							{ url: "#", text: "高端电器" },
						],
						keywords: [
							"节能补贴",
							"4K电视",
							"空气净化器",
							"IH电饭煲",
							"滚筒洗衣机",
							"电热水器",
						],
						imgUrl: "/images/floor-1-1.png",
						carouselList: [
							{
								id: 1,
								imgUrl: "/images/floor-1-b01.png",
								imgName: "floor1",
							},
							{
								id: 2,
								imgUrl: "/images/floor-1-b02.png",
								imgName: "floor2",
							},
							{ id: 3, imgUrl: "/images/floor-1-b03.png", imgName: "floor3" },
						],
						recommendList: [
							"/images/floor-1-2.png",
							"/images/floor-1-3.png",
							"/images/floor-1-5.png",
							"/images/floor-1-6.png",
						],
						bigImg: "/images/floor-1-4.png",
					},
					{
						id: 2,
						name: "手机通讯",
						keywords: [
							"节能补贴2",
							"4K电视2",
							"空气净化器2",
							"IH电饭煲2",
							"滚筒洗衣机2",
							"电热水器2",
						],
						imgUrl: "/images/floor-1-1.png",
						navList: [
							{ url: "#", text: "热门2" },
							{ url: "#", text: "大家电2" },
							{ url: "#", text: "生活电器2" },
							{ url: "#", text: "厨房电器2" },
							{ url: "#", text: "应季电器2" },
							{ url: "#", text: "空气/净水2" },
							{ url: "#", text: "高端电器2" },
						],
						carouselList: [
							{ id: 1, imgUrl: "/images/floor-1-b01.png" },
							{ id: 2, imgUrl: "/images/floor-1-b02.png" },
							{ id: 3, imgUrl: "/images/floor-1-b03.png" },
						],
						recommendList: [
							"/images/floor-1-2.png",
							"/images/floor-1-3.png",
							"/images/floor-1-5.png",
							"/images/floor-1-6.png",
						],
						bigImg: "/images/floor-1-4.png",
					},
				],
			};
		},
	},
];
