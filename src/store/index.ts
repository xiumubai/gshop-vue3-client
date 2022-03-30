import { InjectionKey } from "vue";
import { createStore, Store, useStore } from "vuex";
import type { AllState } from "./types";

import user from "./modules/user";
// https://vuex.vuejs.org/zh/api/#usestore
export const key: InjectionKey<Store<AllState>> = Symbol();

export const useTypeStore = () => {
	return useStore(key);
};

export default createStore<AllState>({
	modules: {
		user,
	},
});
