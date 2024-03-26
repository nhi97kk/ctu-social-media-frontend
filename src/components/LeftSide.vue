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

      <div class="menu-item" @click="$router.push('/friend')">
        <div class="item-row">
          <div class="icon">
            <img src="../assets/img/icons/colored-people.svg" alt="" />
          </div>
          <h4>Friends</h4>
        </div>
      </div>

      <div class="menu-item" @click="$router.push('/chat')">
        <div class="item-row">
          <div class="icon">
            <img src="../assets/img/icons/colored-messenger.svg" alt="" />
          </div>
          <h4>Messenger</h4>
        </div>
      </div>

      <div class="menu-item">
        <div class="item-row">
          <div class="icon">
            <img src="../assets/img/icons/colored-flag.svg" alt="" />
          </div>
          <h4>Pages</h4>
        </div>
      </div>
    </div>
    <div class="second-col">
      <h6 class="title">your shortcuts</h6>
      <div class="menu-item">
        <div class="item-row">
          <div class="icon">
            <img src="../assets/img/stories/st-1.jpeg" alt="" />
          </div>
          <h4>Designers house</h4>
        </div>
      </div>

      <div class="menu-item">
        <div class="item-row">
          <div class="icon">
            <img src="../assets/img/stories/st-2.jpeg" alt="" />
          </div>
          <h4>Script house</h4>
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
  },
};
</script>
<style scoped></style>
