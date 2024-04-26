<template>
  <div class="posts">
    <!-- stories -->

    <!--create post-->
    <div class="timeline">
      <div class="view create-post">
        <div class="input">
          <div class="user">
            <div class="profile">
              <img :src="getImageUrl(user.photo)" alt="" />
            </div>
          </div>
          <input
            data-toggle="modal"
            data-target="#myModaltoPost"
            type="text"
            :placeholder="`What's on your mind, ${user?.name}?`"
            name=""
            id=""
          />
        </div>
        <div class="media">
          <div class="category">
            <div class="option" data-toggle="modal" data-target="#myModal">
              <div class="icon">
                <i class="fa-solid fa-video"></i>
              </div>
              <span>Live video</span>
            </div>

            <div class="option" data-toggle="modal" data-target="#myModal">
              <div class="icon">
                <i class="fa-solid fa-image"></i>
              </div>
              <span>photo/video</span>
            </div>

            <div class="option" data-toggle="modal" data-target="#myModal">
              <div class="icon">
                <i class="fa-solid fa-icons"></i>
              </div>
              <span>feeling/activity</span>
            </div>
          </div>
        </div>
      </div>

      <!-- //Posts -->
      <PostCard
        v-for="post in posts"
        :post="post"
        :user="user"
        :key="post._id"
      />

      <!--people you may know-->
      <div class="view friends smaller-margin">
        <div class="upper">
          <h6>people you may know</h6>
          <div class="dots">
            <button class="btn-see-more">See more</button>
            <img
              style="width: 15px"
              src="../assets/img/icons/see-more.svg"
              alt=""
            />
          </div>
        </div>

        <div class="owl-theme people">
          <!-- <FriendCard /> -->
        </div>
      </div>
    </div>
  </div>

  <!-- The Modal -->
  <div class="modal" id="myModaltoPost">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="modal-title text-center">Create Post</h4>
          <button type="button" class="close" data-dismiss="modal">
            &times;
          </button>
        </div>

        <!-- Modal body -->
        <div class="view view-post-container smaller-margin">
          <div class="view-post p-4">
            <div class="upper">
              <div class="d-flex align-items-baseline">
                <div class="user">
                  <div class="profile">
                    <img alt="" :src="getImageUrl(user.photo)" />
                  </div>
                </div>

                <div class="info ml-4">
                  <h6 class="name">{{ user?.name }}</h6>
                </div>
              </div>

              <div class="dots">
                <div class="dot"></div>
              </div>
            </div>

            <div class="desc m-4">
              <input
                class="border-0"
                type="text"
                v-model="data.desc"
                :placeholder="`What's on your mind, ${user?.name}?`"
              />
            </div>

            <div class="post-img">
              <img
                style="width: 500px"
                :src="userPhotoUrl ? userPhotoUrl : ''"
                alt=""
              />
              <label for="uploadImageInput">Upload Image</label>
              <input
                ref="file"
                type="file"
                id="uploadImageInput"
                @change="handleFileChange()"
              />
            </div>
          </div>
        </div>

        <!-- Modal footer -->
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-success"
            data-dismiss="modal"
            @click="createPost"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import FriendCard from "@/components/friend/FriendCard.vue";
import PostCard from "@/components/PostCard.vue";
import postService from "@/services/post.service";
import fileService from "@/services/file.service";
export default {
  components: {
    FriendCard,
    PostCard,
  },
  data() {
    return {
      data: {
        desc: "",
        image: null,
        user: this.user._id,
      },
      userPhotoUrl: null,
    };
  },
  props: {
    user: {
      type: Object,
    },
    posts: {
      type: Array,
    },
  },
  methods: {
    getImageUrl(photo) {
      return `http://localhost:3000/img/users/${photo}`;
    },
    handleFileChange(e) {
      this.data.image = this.$refs.file.files[0];
      this.userPhotoUrl = URL.createObjectURL(this.$refs.file.files[0]);
      // console.log(this.data.image);
    },
    async createPost() {
      // Kiểm tra xem có đủ dữ liệu để tạo bài viết không
      if (!this.data.desc) {
        // Hiển thị thông báo lỗi cho người dùng
        alert("Description of the post is required!");
        return;
      }

      try {
        // Tạo đối tượng FormData
        let formData = new FormData();
        formData.append("desc", this.data.desc);
        formData.append("image", this.data.image);
        formData.append("user", this.data.user);

        // Gửi dữ liệu để tạo bài viết
        await fileService.create(formData);

        // Xóa dữ liệu sau khi gửi thành công
        this.data.desc = "";
        this.data.image = null;
        alert("Create successfully!");
      } catch (error) {
        // Xử lý lỗi từ server
        console.log("Error:" + error.message);
        alert("An error occurred. Please try again later.");
      }
    },
  },
};
</script>
