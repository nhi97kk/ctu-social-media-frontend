<script setup>
import AppHeader from "@/components/AppHeader.vue";
import Auth from "@/views/Auth.vue";
import FriendCard from "@/components/friend/FriendCard.vue";
import LeftSide from "@/components/friend/LeftSide.vue";
import { useAuthStore } from "@/store/auth";
import { useFriendStore } from "@/store/friend";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const authStore = useAuthStore();
const friendStore = useFriendStore();

onMounted(async () => {
  await authStore.getUser();

  // Kiểm tra nếu không có người dùng thì chuyển hướng đến trang /auth
  if (!authStore.user) {
    router.push({ name: "auth" });
  }
});

const showFriends = () => {
  friendStore.getAllFriends();
};

const showRequests = () => {
  friendStore.getAllRequests();
};

const showOthers = () => {
  friendStore.getAllOthers();
};
</script>

<template>
  <div v-if="authStore.user">
    <AppHeader :user="authStore.user" />
    <div class="wrapper">
      <LeftSide
        @show-friends="showFriends"
        @show-requests="showRequests"
        @show-others="showOthers"
        :user="authStore.user"
      />
      <div class="list-friend-card">
        <template v-if="friendStore.nums > 0">
          <!-- Duyệt qua danh sách bạn bè và hiển thị các card friend -->
          <FriendCard
            v-for="friend in friendStore.friends"
            :user="authStore.user"
            :key="friend._id"
            :friend="friend"
            :option="friendStore.option"
            @show-requests="showRequests"
          />
        </template>
        <!-- Nếu không có bạn bè, hiển thị thông báo -->
        <template v-else>
          <p>Just chose option!</p>
        </template>
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
    LeftSide,
    FriendCard,
  },
};
</script>
<style>
@import "./style/friend.css";
</style>
