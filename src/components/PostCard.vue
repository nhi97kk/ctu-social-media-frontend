<script setup>
import { useCommentStore } from "@/store/comment";
import { onMounted } from "vue";

const commentStore = useCommentStore();

const renderComment = (id) => {
  commentStore.getAllCommentPosts(id);
};
</script>
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

      <div
        @click="renderComment(post._id)"
        class="post-img"
        data-toggle="modal"
        :data-target="'#myModaltoCmt' + post._id"
      >
        <img :src="getPostImageUrl(post.image)" alt="" />
      </div>

      <div class="actions-container">
        <div class="action">
          <div class="icon" @click="toggleLike">
            <i :class="likeIcon"></i>
          </div>
          <span>{{ likeCount }} like</span>
        </div>

        <div
          class="action"
          data-toggle="modal"
          :data-target="'#myModaltoCmt' + post._id"
          @click="renderComment(post._id)"
        >
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
        <div
          class="input"
          data-toggle="modal"
          :data-target="'myModaltoCmt' + post._id"
        >
          <input type="text" placeholder="Write a comment" name="" />
          <div class="media">
            <div class="icon">
              <i class="fa-solid fa-camera"></i>
            </div>

            <div class="icon">
              <i class="fa-regular fa-image"></i>
            </div>

            <div class="icon">
              <i class="fa-regular fa-face-smile"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- The Modal -->
  <div class="modal" :id="'myModaltoCmt' + post._id">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="modal-title text-center">Post of {{ post.user.name }}</h4>
          <button type="button" class="close" data-dismiss="modal">
            &times;
          </button>
        </div>

        <!-- Modal body -->
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
                  <timeago
                    style="font-size: 12px; color: #999"
                    :datetime="date"
                  />
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
                <span>{{ likeCount }} like</span>
              </div>

              <div class="action" data-toggle="modal" data-target="#myModal">
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
          </div>
        </div>

        <div class="comment-post d-flex flex-column">
          <div class="d-flex p-2" v-for="comment in commentStore.comments">
            <div class="user">
              <div class="profile">
                <img :src="getUserImageUrl(comment.user.photo)" alt="" />
              </div>
            </div>
            <div class="d-flex flex-column w-100 pl-4 desc-comment">
              <h4 class="user-name font-weight-bold" style="font-size: 1rem">
                {{ comment.user.name }}
              </h4>
              <p class="user-comment m-0">{{ comment.desc }}</p>
            </div>
          </div>

          <div class="d-flex p-2" v-for="comment in comments">
            <div class="user">
              <div class="profile">
                <img :src="getUserImageUrl(user.photo)" alt="" />
              </div>
            </div>
            <div class="d-flex flex-column w-100 pl-4 desc-comment">
              <h4 class="user-name font-weight-bold" style="font-size: 1rem">
                {{ user.name }}
              </h4>
              <p class="user-comment m-0">{{ comment }}</p>
            </div>
          </div>
        </div>

        <!-- Modal footer -->
        <div class="modal-footer">
          <div class="cmt-side">
            <div class="user">
              <div class="profile">
                <img :src="getUserImageUrl(user.photo)" alt="" />
              </div>
            </div>
            <div class="input-side">
              <input
                class="input-cmt"
                type="text"
                placeholder="Write a comment"
                v-model="data.desc"
                required
              />
              <div class="media">
                <div class="icon" @click="createComment">
                  <i class="fa-solid fa-paper-plane"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import postService from "@/services/post.service";
import commentService from "@/services/comment.service";

export default {
  data() {
    return {
      date: this.post.createdAt,
      isLiked: false,
      likes: this.post.likes.length,
      data: {
        desc: "",
        post: this.post._id,
        user: this.user._id,
      },
      comments: [],
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
    async createComment() {
      // Kiểm tra xem có đủ dữ liệu để tạo comment
      if (!this.data.desc) {
        // Hiển thị thông báo lỗi cho người dùng
        alert("Description of the comment is required!");
        return;
      }

      this.comments.push(this.data.desc);

      try {
        // Tạo đối tượng FormData
        let formData = new FormData();
        formData.append("desc", this.data.desc);
        formData.append("post", this.data.post);
        formData.append("user", this.data.user);

        // Gửi dữ liệu để tạo bài viết
        await commentService.create(formData);

        // Xóa dữ liệu sau khi gửi thành công
        this.data.desc = "";
        alert("Create successfully!");
      } catch (error) {
        // Xử lý lỗi từ server
        console.log("Error:" + error.message);
        alert("An error occurred. Please try again later.");
      }
    },
  },
  async mounted() {
    // Trước khi component được mounted, kiểm tra xem user._id có trong danh sách likes không
    this.isLiked = this.post.likes.some((like) => like === this.user._id);
    console.log(this.post.likes);
  },
};
</script>
