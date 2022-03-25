import { createApp } from "vue";
import App from "./App.vue";
import TypeNav from "./components/TypeNav/index.vue";
import Carousel from "./components/Carousel/index.vue";
import Pagination from "./components/Pagination/index.vue";

import router from "./router";

// 重置样式
import "./styles/reset.css";
import "./styles/iconfont.css";

const app = createApp(App);

// 安装router
app.use(router);

// 注册全局组件
app.component("TypeNav", TypeNav);
app.component("Carousel", Carousel);
app.component("Pagination", Pagination);

app.mount("#app");
