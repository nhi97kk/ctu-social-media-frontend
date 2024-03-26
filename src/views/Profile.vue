<script setup>
import AppHeader from "@/components/AppHeader.vue";
import Auth from "@/views/Auth.vue";
import Me from "@/components/Me.vue";
import PostCard from "@/components/PostCard.vue";
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
  }
});
</script>

<template>
  <div v-if="authStore.user">
    <AppHeader :user="authStore.user" />
    <Me :user="authStore.user" />
    <div class="posts">
      <div class="timeline">
        <PostCard
          v-for="post in postStore.posts"
          :post="post"
          :user="authStore.user"
        />
      </div>
    </div>
  </div>
  <div v-else>
    <Auth />
  </div>
</template>

<script>
export default {
  components: {
    AppHeader,
    Me,
    PostCard,
  },
};
</script>
