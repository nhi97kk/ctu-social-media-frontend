import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import timeago from "vue-timeago3";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.slim.min.js";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "@/assets/css/style.css";

const app = createApp(App);

app.use(timeago);

app.use(createPinia()).use(router).mount("#app");
