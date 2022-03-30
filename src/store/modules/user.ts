import type { Module } from "vuex";
import { reqLogin } from "@/api/user";
import type { AllState, User } from "../types";
import type { UserParams } from "@/views/register/types";

const initState = JSON.parse(localStorage.getItem("user") || "{}");

// Module<当前模块state数据类型, 整个vuex的state数据类型>
const user: Module<User, AllState> = {
	namespaced: true,
	state: initState,
	actions: {
		async login({ commit }, { phone, password }: UserParams) {
			const user = await reqLogin(phone, password);
			commit("LOGIN", user);
		},
	},
	mutations: {
		LOGIN(state, user: User) {
			// 持久化存储
			localStorage.setItem("user", JSON.stringify(user));
			// 存储在vuex中
			state.nickName = user.nickName;
			state.token = user.token;
		},
	},
};

export default user;
