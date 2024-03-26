<template>
  <div class="wrapper">
    <LeftSide :user="user" />
    <PostSide :user="user" :posts="posts" />
    <RightSide :user="user" />
  </div>
</template>
<script>
import LeftSide from "@/components/LeftSide.vue";
import PostSide from "@/components/PostSide.vue";
import RightSide from "@/components/RightSide.vue";

export default {
  components: {
    LeftSide,
    PostSide,
    RightSide,
  },
  props: {
    user: {
      type: Object,
    },
    posts: {
      type: Array,
    },
  },
};
</script>
<style scoped></style>
