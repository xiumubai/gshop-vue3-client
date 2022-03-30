import type { Module } from "vuex";
import { reqLogin, reqLogout } from "@/api/user";
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
		async logout({ commit }) {
			await reqLogout();
			commit("LOGOUT");
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
		LOGOUT(state) {
			localStorage.removeItem("user");
			// 清空vuex数据
			state.nickName = "";
			state.token = "";
		},
	},
};

export default user;
