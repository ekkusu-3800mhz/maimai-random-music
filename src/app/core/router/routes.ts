import { RouteRecordRaw } from "vue-router";

import Intro from "@/app/view/Intro.vue";
import BP from "@/app/view/BP.vue";
import Random from "@/app/view/Random.vue";

/**
 *  清远舞萌比赛BP机制抽歌器 - SPA路由表
 * 
 *  @author 3.80GHz <shinra.dx@outlook.com>
 *  @license MIT
 */

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "Intro",
        component: Intro,
    },
    {
        path: "/bp",
        name: "BP",
        component: BP,
    },
    {
        path: "/rand",
        name: "Random",
        component: Random,
    },
];

export default routes;
