<script setup>
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
  <router-view />
</template>

<style></style>
