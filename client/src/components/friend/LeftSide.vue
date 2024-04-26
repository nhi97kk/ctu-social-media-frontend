<template>
  <div class="shortcuts">
    <div class="first-col">
      <div class="menu-item">
        <div class="user">
          <div class="profile">
            <img :src="getImageUrl(user.photo)" alt="" />
          </div>
          <h4>{{ user?.name }}</h4>
        </div>
      </div>

      <div class="menu-item" @click="showFriends">
        <div class="item-row">
          <div class="icon icon-friend">
            <i class="fa-solid fa-user-group"></i>
          </div>
          <h4>Your Friends</h4>
        </div>
      </div>

      <div class="menu-item" @click="showRequests">
        <div class="item-row">
          <div class="icon icon-friend">
            <i class="fa-solid fa-user-clock"></i>
          </div>
          <h4>Friends Requests</h4>
        </div>
      </div>

      <div class="menu-item" @click="showOthers">
        <div class="item-row">
          <div class="icon icon-friend">
            <i class="fa-solid fa-user-plus"></i>
          </div>
          <h4>More friends</h4>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    user: {
      type: Object,
    },
  },
  methods: {
    getImageUrl(photo) {
      return `http://localhost:3000/img/users/${photo}`;
    },
    showFriends() {
      this.$emit("show-friends", "friends");
    },
    showRequests() {
      this.$emit("show-requests", "requests");
    },
    showOthers() {
      this.$emit("show-others", "others");
    },
  },
};
</script>
<style scoped></style>
