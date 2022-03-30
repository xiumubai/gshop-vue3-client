// vuex整体管理的state数据类型
export interface AllState {
	user: User;
}

// 每个module管理的state数据类型
export interface User {
	nickName: string;
	token: string;
}
