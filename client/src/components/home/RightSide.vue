<script setup>
import { useFriendStore } from "@/store/friend";
import { onMounted } from "vue";
// import { useRouter } from "vue-router";

// const router = useRouter();
const friendStore = useFriendStore();

onMounted(async () => {
  await friendStore.getAllFriends();
});
</script>
<template>
  <div class="shortcuts shortcuts-2">
    <div class="second-col first-col">
      <div class="menu-item">
        <div class="upper">
          <h6>Your pages</h6>
        </div>
      </div>

      <div class="menu-item">
        <div class="item-row">
          <div class="icon">
            <img src="../../assets/img/stories/st-2.jpeg" alt="" />
          </div>
          <h4>Script house</h4>
        </div>
      </div>

      <div class="menu-item">
        <div class="item-row">
          <div class="icon">
            <img src="../../assets/img/stories/st-1.jpeg" alt="" />
          </div>
          <h4>omar ui design</h4>
        </div>
      </div>

      <div class="menu-item">
        <div class="item-row">
          <div class="icon more">
            <img src="../../assets/img/icons/arrow-down.svg" alt="" />
          </div>
          <h4>see more</h4>
        </div>
      </div>
    </div>
    <div class="second-col">
      <h6 class="title">birthdays</h6>
      <div class="menu-item">
        <div class="item-row">
          <div class="icon not-rounded">
            <img src="../../assets/img/icons/gift.svg" alt="" />
          </div>
          <h4>it's diana berry's birthday</h4>
        </div>
      </div>
      <div class="online">
        <h6 class="title">contact</h6>

        <div class="user" v-for="friend in friendStore.friends">
          <div class="profile">
            <img :src="getImageUrl(friend.photo)" alt="" />
          </div>
          <h4>{{ friend.name }}</h4>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    getImageUrl(photo) {
      return `http://localhost:3000/img/users/${photo}`;
    },
  },
};
</script>
<style scoped></style>
