<script setup>
import AppHeader from "@/components/AppHeader.vue";
import Auth from "@/views/Auth.vue";
import Me from "@/components/Me.vue";
import PostCard from "@/components/PostCard.vue";
import { useAuthStore } from "@/store/auth";
import { usePostStore } from "@/store/post";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { defineProps } from "vue";

const router = useRouter();
const authStore = useAuthStore();
const postStore = usePostStore();
const props = defineProps({
  id: String, // hoặc kiểu dữ liệu tương ứng
});

onMounted(async () => {
  await authStore.getUser();
  // Kiểm tra nếu không có người dùng thì chuyển hướng đến trang /auth
  if (!authStore.user) {
    router.push({ name: "auth" });
  }
  if (authStore.user) {
    await authStore.getOtherUser(props.id);
    await postStore.getAllUserPosts(props.id);

    console.log(authStore.other);
    console.log(postStore.posts);
  }
});
</script>

<template>
  <div v-if="authStore.user && authStore.other && postStore.posts">
    <AppHeader :user="authStore.user" />
    <Me :user="authStore.other" :current="authStore.user" />
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
