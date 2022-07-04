import { RouteRecordRaw } from "vue-router";

import Intro from "@/app/view/Intro.vue";
import BP from "@/app/view/BP.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "Intro",
        component: Intro,
    },
    {
        path: "/bp/:level",
        name: "BP",
        component: BP,
        props: true,
    }
];

export default routes;
