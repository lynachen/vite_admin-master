import { createApp } from "vue";
import "./assets/css/reset.css";
import { WeToolbar, WeEditable, WeEditor } from 'wangeditor5-for-vue3'
import '@wangeditor/editor/dist/css/style.css'
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
// 自定义icon组件
import Icons from "@/components/Icons.vue";

import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "./utils/axios";
import qs from "qs";
import oss from "./utils/oss"; /* 上传文件 */

const app = createApp(App);

app.config.globalProperties.$axios = axios;
app.config.globalProperties.$qs = qs;
app.config.globalProperties.$oss = oss;
app.component(WeToolbar.name, WeToolbar)
app.component(WeEditable.name, WeEditable)
app.component(WeEditor.name, WeEditor)
// 全部加载
app.use(ElementPlus);
// 引入自定义Icons
app.component("Icons", Icons);

app.use(router).use(store).mount("#app");
