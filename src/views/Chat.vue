<script setup>
import AppHeader from "@/components/AppHeader.vue";
import Auth from "@/views/Auth.vue";
import LeftSide from "@/components/chat/LeftSide.vue";
import ChatSide from "@/components/chat/ChatSide.vue";

import { useChatStore } from "@/store/chat";
import { useAuthStore } from "@/store/auth";
import { useMessageStore } from "@/store/message";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { ref } from "vue";

const router = useRouter();
const authStore = useAuthStore();
const chatStore = useChatStore();
const messageStore = useMessageStore();

onMounted(async () => {
  await authStore.getUser();
  // Kiểm tra nếu không có người dùng thì chuyển hướng đến trang /auth
  if (!authStore.user) {
    router.push({ name: "auth" });
  }

  await chatStore.getAllUserChats(authStore.user._id);
});

const showChatSide = ref(false);

const showChat = async (id) => {
  await messageStore.getAllMessagesChats(id);
  await chatStore.getChat(id);
  showChatSide.value = true;
};
</script>

<template>
  <div v-if="authStore.user">
    <AppHeader :user="authStore.user" />
    <div class="wrapper">
      <LeftSide
        v-if="chatStore.chats"
        :chats="chatStore.chats"
        :user="authStore.user"
        @show-chat="showChat"
      />
      <p v-else>No more chats</p>
      <ChatSide
        v-if="showChatSide && chatStore.chat"
        :messages="messageStore.messages"
        :user="authStore.user"
        :chat="chatStore.chat"
        @show-chat="showChat"
      />
      <span v-else style="color: white"
        >Tap on a chat to start conversation...</span
      >
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
    ChatSide,
  },
};
</script>
<style>
@import "./style/chat.css";
</style>
