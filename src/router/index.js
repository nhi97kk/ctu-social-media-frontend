import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import Auth from "@/views/Auth.vue";
import Profile from "@/views/Profile.vue";
import Friend from "@/views/Friend.vue";
import Chat from "@/views/Chat.vue";
const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/auth",
    name: "auth",
    component: Auth,
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
  },
  {
    path: "/friend",
    name: "friend",
    component: Friend,
  },
  {
    path: "/chat",
    name: "chat",
    component: Chat,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: () => import("@/views/NotFound.vue"),
  },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
export default router;
