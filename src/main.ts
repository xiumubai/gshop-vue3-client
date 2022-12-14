import { createApp } from "vue";
import App from "./App.vue";
import TypeNav from "./components/TypeNav/index.vue";
import Carousel from "./components/Carousel/index.vue";
import Pagination from "./components/Pagination/index.vue";
import InputNumber from "./components/InputNumber/index.vue";
import Dialog from "./components/Dialog/index.vue";

import router from "./router";
import store, { key } from "./store";

// 重置样式
import "./styles/reset.css";
import "./styles/iconfont.css";

const app = createApp(App);

// 安装router
app.use(router);
// 安装store
app.use(store, key);

// 注册全局组件
app.component("TypeNav", TypeNav);
app.component("Carousel", Carousel);
app.component("Pagination", Pagination);
app.component("InputNumber", InputNumber);
app.component("Dialog", Dialog);

app.mount("#app");
