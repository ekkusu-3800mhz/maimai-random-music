import { createRouter, createWebHashHistory } from "vue-router";
import routes from "./routes";

/**
 *  清远舞萌比赛BP机制抽歌器 - SPA路由定义
 * 
 *  @generator vue-cli
 *  @license MIT
 */

export default createRouter({
    history: createWebHashHistory(),
    routes,
});
