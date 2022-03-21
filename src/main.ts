import { createApp } from "vue";
import App from "./App.vue";

import router from "./router";

// 重置样式
import "./styles/reset.css";

const app = createApp(App);

// 安装router
app.use(router);

app.mount("#app");
