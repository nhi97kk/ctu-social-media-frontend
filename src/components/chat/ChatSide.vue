<template>
  <div class="ChatBox-container">
    <!-- Chat header -->
    <div class="chat-header">
      <div class="follower">
        <!-- <div>
          <img :src="getImageUrl(user.photo)" class="followerImage" alt="" />
          <div class="name" style="font-size: 0.8rem; color: white">
            <span>{{ user.name }}</span>
          </div>
        </div> -->
      </div>
      <hr style="width: 85%; border: 0.1px solid #ececec" />
    </div>

    <!-- Chat body -->
    <div class="chat-body">
      <div
        v-for="message in messages"
        :key="message._id"
        ref="scroll"
        class="message"
        :class="{ own: message.user == user._id }"
      >
        <span>{{ message.message }}</span>
        <timeago
          style="font-size: 12px; color: white"
          :datetime="message.createdAt"
        />
      </div>
    </div>

    <!-- Chat sender -->
    <div class="chat-sender">
      <div>+</div>
      <input type="text" v-model="data.message" />
      <div @click="createMessage"><i class="fa-solid fa-paper-plane"></i></div>
    </div>
  </div>
</template>
<script>
import messageService from "@/services/message.service";
export default {
  data() {
    return {
      data: {
        user: this.user._id,
        chat: this.chat._id,
        message: "",
      },
    };
  },
  props: {
    user: {
      type: Object,
    },
    messages: {
      type: Array,
    },
    chat: {
      type: Object,
    },
  },
  methods: {
    getImageUrl(photo) {
      return `http://localhost:3000/img/users/${photo}`;
    },
    async createMessage() {
      // Kiểm tra xem có đủ dữ liệu để tạo comment
      if (!this.data.message) {
        // Hiển thị thông báo lỗi cho người dùng
        alert("No message!");
        return;
      }

      try {
        // Tạo đối tượng FormData
        let formData = new FormData();
        formData.append("message", this.data.message);
        formData.append("chat", this.data.chat);
        formData.append("user", this.data.user);

        // Gửi dữ liệu để tạo bài viết
        await messageService.create(formData);

        // Xóa dữ liệu sau khi gửi thành công
        this.data.message = "";
        this.$emit("show-chat", this.data.chat);
      } catch (error) {
        // Xử lý lỗi từ server
        console.log("Error:" + error.message);
        alert("An error occurred. Please try again later.");
      }
    },
  },
  async mounted() {
    // Trước khi component được mounted, kiểm tra xem user._id có trong danh sách likes không
    console.log(this.messages);
  },
};
</script>
<style scoped></style>
