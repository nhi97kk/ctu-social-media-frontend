<template>
  <div class="shortcuts">
    <div class="first-col">
      <h1>Chats</h1>
      <div class="menu-item" v-for="chat in chats">
        <div
          class="user"
          v-for="member in chat.members"
          @click="showChat(chat._id)"
        >
          <template v-if="member._id != user._id">
            <div class="profile">
              <img :src="getImageUrl(member.photo)" alt="" />
            </div>
            <h4>{{ member.name }}</h4>
          </template>
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
    chats: {
      type: Array,
    },
  },
  methods: {
    getImageUrl(photo) {
      return `http://localhost:3000/img/users/${photo}`;
    },
    showChat(id) {
      this.$emit("show-chat", id);
    },
  },
};
</script>
<style scoped></style>
