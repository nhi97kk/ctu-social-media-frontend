<script setup>
import AppHeader from "@/components/AppHeader.vue";
import Auth from "@/views/Auth.vue";

import { useAuthStore } from "@/store/auth";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const authStore = useAuthStore();

onMounted(async () => {
  await authStore.getUser();
  // Kiểm tra nếu không có người dùng thì chuyển hướng đến trang /auth
  if (!authStore.user) {
    router.push({ name: "auth" });
  }
});
</script>

<template>
  <div v-if="authStore.user">
    <AppHeader :user="authStore.user" />
  </div>
  <div v-else>
    <Auth />
  </div>
</template>

<script>
export default {
  components: {
    AppHeader,
  },
};
</script>
