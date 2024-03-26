<template>
  <!--post container-->
  <div class="view view-post-container smaller-margin">
    <div class="view-post">
      <div class="upper">
        <div class="d-flex">
          <div class="user">
            <div class="profile">
              <img :src="getUserImageUrl(post.user.photo)" alt="" />
            </div>
          </div>

          <div class="info">
            <h6 class="name">{{ post.user.name }}</h6>
            <timeago style="font-size: 12px; color: #999" :datetime="date" />
          </div>
        </div>

        <div class="dots">
          <div class="dot"></div>
        </div>
      </div>

      <div class="desc">
        <p>{{ post?.desc }}</p>
      </div>

      <div class="post-img">
        <img :src="getPostImageUrl(post.image)" alt="" />
      </div>

      <div class="actions-container">
        <div class="action">
          <div class="icon" @click="toggleLike">
            <i :class="likeIcon"></i>
          </div>
          <span>{{ this.likeCount }} like</span>
        </div>

        <div class="action">
          <div class="icon">
            <i class="fa-regular fa-message"></i>
          </div>
          <span> comment </span>
        </div>

        <div class="action">
          <div class="icon">
            <i class="fa-solid fa-share"></i>
          </div>
          <span> share </span>
        </div>
      </div>

      <div class="write-comment">
        <div class="user">
          <div class="profile">
            <img :src="getUserImageUrl(user.photo)" alt="" />
          </div>
        </div>
        <div class="input">
          <input type="text" placeholder="Write a comment" name="" id="" />
          <div class="media">
            <div class="icon">
              <img src="../assets/img/icons/camera.svg" alt="" />
            </div>

            <div class="icon">
              <img src="../assets/img/icons/image.svg" alt="" />
            </div>

            <div class="icon">
              <img src="../assets/img/icons/smile-2.svg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import postService from "@/services/post.service";

export default {
  data() {
    return {
      date: this.post.createdAt,
      isLiked: false,
      likes: this.post.likes.length,
    };
  },
  props: {
    post: {
      type: Object,
    },
    user: {
      type: Object,
    },
  },
  computed: {
    likeIcon() {
      return this.isLiked ? "fa-solid fa-thumbs-up" : "fa-regular fa-thumbs-up";
    },
    likeCount() {
      return this.likes;
    },
  },
  methods: {
    getUserImageUrl(photo) {
      return `http://localhost:3000/img/users/${photo}`;
    },
    getPostImageUrl(photo) {
      return `http://localhost:3000/img/posts/${photo}`;
    },
    async toggleLike() {
      try {
        await postService.like(this.post._id);
        this.isLiked = !this.isLiked;
        this.likes = this.isLiked ? this.likes + 1 : this.likes - 1;
      } catch (error) {
        console.log(error);
      }
    },
  },
  async mounted() {
    // Trước khi component được mounted, kiểm tra xem user._id có trong danh sách likes không
    this.isLiked = this.post.likes.some((like) => like === this.user._id);
  },
};
</script>
