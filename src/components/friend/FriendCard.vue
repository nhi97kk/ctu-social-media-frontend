<template>
  <div class="item">
    <router-link
      :to="{
        name: 'profile',
        params: { id: friend._id },
      }"
    >
      <div class="person-img">
        <div class="icon">&times;</div>
        <img :src="getImageUrl(friend.photo)" alt="" />
      </div>
    </router-link>

    <div class="info">
      <h4>{{ friend.name }}</h4>
      <span>CTU Social Media</span>
      <button v-if="option === 'friends'">Message</button>
      <button v-if="option === 'requests'" @click="confirm">Confirm</button>
      <button v-if="option === 'others'" @click="handleButtonClick">
        {{ buttonText }}
      </button>
    </div>
  </div>
</template>

<script>
import UserService from "@/services/user.service";
import chatService from "@/services/chat.service";

export default {
  props: {
    friend: {
      type: Object,
    },
    option: {
      type: String,
    },
    user: {
      type: Object,
    },
  },
  methods: {
    getImageUrl(photo) {
      return `http://localhost:3000/img/users/${photo}`;
    },
    async addFriend() {
      await UserService.addFriend(this.friend._id);
      // Cập nhật trạng thái nút sau khi gửi yêu cầu kết bạn
      this.friend.requests.push(this.user._id);
    },
    async confirm() {
      await UserService.acceptRequest(this.friend._id);
      const members = [this.friend._id, this.user._id];
      await chatService.create({ members });
      this.$emit("show-requests");
    },
    async handleButtonClick() {
      if (this.friend.requests.includes(this.user._id)) {
        // Nếu user._id có trong mảng friend.requests
        // Hiển thị Sent requests
        console.log("Sent requests");
      } else {
        // Nếu user._id không có trong mảng friend.requests
        // Hiển thị Add friend
        await this.addFriend();
      }
    },
  },
  computed: {
    buttonText() {
      return this.friend.requests.includes(this.user._id)
        ? "Sent requests"
        : "Add friend";
    },
  },
};
</script>
