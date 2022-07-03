import { createApp } from "vue";
import App from "@/app/view/App.vue";
import router from "@/app/core/router";
import store, { injectionKey } from "@/app/core/store";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";


createApp(App).use(store, injectionKey).use(router).use(ElementPlus).mount("#app");
