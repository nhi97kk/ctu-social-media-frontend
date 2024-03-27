<script setup>
import AppHeader from "@/components/AppHeader.vue";
import Auth from "@/views/Auth.vue";
import { useAuthStore } from "@/store/auth";
import { usePostStore } from "@/store/post";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const authStore = useAuthStore();
const postStore = usePostStore();

onMounted(async () => {
  await authStore.getUser();
  // Kiểm tra nếu không có người dùng thì chuyển hướng đến trang /auth
  if (!authStore.user) {
    router.push({ name: "auth" });
  }
  if (authStore.user) {
    await postStore.getAllPosts();
    console.log(authStore.user);
  }
});
</script>

<template>
  <div v-if="authStore.user">
    <AppHeader :user="authStore.user" />
    <div class="wrapper">
      <LeftSide :user="authStore.user" />
      <PostSide :user="authStore.user" :posts="postStore.posts" />
      <RightSide :user="authStore.user" />
    </div>
  </div>
  <div v-else>
    <Auth />
  </div>
</template>

<script>
import LeftSide from "@/components/home/LeftSide.vue";
import PostSide from "@/components/home/PostSide.vue";
import RightSide from "@/components/home/RightSide.vue";
export default {
  components: {
    AppHeader,
    LeftSide,
    PostSide,
    RightSide,
  },
};
</script>
<style>
@import "./style/home.css";
</style>
