import { reqLogin } from "@/api/user";

const initState = JSON.parse(localStorage.getItem("user") || "{}");

export default {
	namespaced: true,
	state: initState,
	actions: {
		async login({ commit }, { phone, password }) {
			const user = await reqLogin(phone, password);
			commit("LOGIN", user);
		},
	},
	mutations: {
		LOGIN(state, user) {
			// 持久化存储
			localStorage.setItem("user", JSON.stringify(user));
			// 存储在vuex中
			state.nickName = user.nickName;
			state.token = user.token;
		},
	},
};
