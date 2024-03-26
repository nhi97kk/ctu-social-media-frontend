<template>
  <!--navbar-->
  <nav>
    <!--logo and search-->
    <div class="left-side">
      <div class="logo">
        <img src="../assets/img/icons/logo-ctu.png" alt="" />
      </div>

      <div class="search">
        <input type="text" placeholder="Search..." name="" id="" />
      </div>
    </div>

    <!--tab icons-->
    <div class="tabs">
      <div class="tab-icon active" @click="toHome()">
        <div class="icon">
          <img src="../assets/img/icons/home.svg" alt="" />
        </div>
      </div>

      <div class="tab-icon">
        <div class="icon has-notification">
          <img src="../assets/img/icons/flag.svg" alt="" />
        </div>
      </div>

      <div class="tab-icon">
        <div class="icon">
          <img src="../assets/img/icons/users.svg" alt="" />
        </div>
      </div>

      <div class="tab-icon">
        <div class="icon has-notification">
          <img src="../assets/img/icons/calendar.svg" alt="" />
        </div>
      </div>
    </div>

    <!--right side-->
    <div class="right-side">
      <div class="user" @click="toProfile()">
        <div class="profile">
          <img :src="getImageUrl(user.photo)" alt="" />
        </div>
        <!-- <h4>{{ user.name }}</h4> -->
      </div>

      <!--icons-->
      <div class="user-icons">
        <div class="icon has-notification">
          <img src=" ../assets/img/icons/messenger.svg" alt="" />
        </div>

        <div class="icon">
          <img src="../assets/img/icons/bell.svg" alt="" />
        </div>

        <div class="icon icon-logout" @click="handleLogOut()">
          <img src="../assets/img/icons/logout.svg" alt="" />
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
import authService from "@/services/auth.service";
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
    async handleLogOut() {
      try {
        await authService.logout();
        this.$router.push("/auth");
      } catch (error) {
        console.error(error);
      }
    },
    toHome() {
      this.$router.push("/");
    },
    toProfile() {
      this.$router.push("/profile");
    },
  },
};
</script>
<style scoped></style>
