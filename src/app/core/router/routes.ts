import { RouteRecordRaw } from "vue-router";

import Intro from "@/app/view/Intro.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "Home",
        component: Intro,
    },
];

export default routes;
