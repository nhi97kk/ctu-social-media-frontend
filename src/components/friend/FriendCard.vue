<template>
  <div class="item">
    <div class="person-img">
      <div class="icon">&times;</div>
      <img :src="getImageUrl(friend.photo)" alt="" />
    </div>

    <div class="info">
      <h4>{{ friend.name }}</h4>
      <span>CTU Social Media</span>
      <button v-if="option === 'friends'">Message</button>
      <button v-if="option === 'requests'" @click="confirm">Confirm</button>
      <button v-if="option === 'others'" @click="addFriend">Add friend</button>
    </div>
  </div>
</template>
<script>
import UserService from "@/services/user.service";
export default {
  props: {
    friend: {
      type: Object,
    },
    option: {
      type: String,
    },
  },
  methods: {
    getImageUrl(photo) {
      return `http://localhost:3000/img/users/${photo}`;
    },
    async addFriend() {
      await UserService.addFriend(this.friend._id);
    },
    async confirm() {
      await UserService.acceptRequest(this.friend._id);
      this.$emit("show-requests");
    },
  },
};
</script>
