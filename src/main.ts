import { createApp } from "vue";
import App from "@/app/view/App.vue";
import router from "@/app/core/router";
import store, { injectionKey } from "@/app/core/store";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/display.css";

/**
 *  清远舞萌比赛BP机制抽歌器 - SPA入口文件
 * 
 *  @generator vue-cli
 *  @license MIT
 */

createApp(App).use(store, injectionKey).use(router).use(ElementPlus).mount("#app");
