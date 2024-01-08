import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/tailwind.css";
import "vue-search-select/dist/VueSearchSelect.css";
import "tw-elements";
import Notifications from "@kyvg/vue3-notification";

createApp(App).use(store).use(router).use(Notifications).mount("#app");
