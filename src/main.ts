import { createApp } from "vue";
import App from "./App.vue";
import TypeNav from "./components/TypeNav/index.vue";

import router from "./router";

// 重置样式
import "./styles/reset.css";

const app = createApp(App);

// 安装router
app.use(router);

// 注册全局组件
app.component("TypeNav", TypeNav);

app.mount("#app");
