import { defineStore } from "pinia";
import PostService from "../services/post.service";

export const usePostStore = defineStore("post", {
  state: () => ({
    allPosts: null,
  }),
  getters: {
    posts: (state) => state.allPosts,
  },
  actions: {
    async getAllPosts() {
      try {
        const data = await PostService.getAll();
        this.allPosts = data.data;
      } catch (error) {
        console.log(error);
        // Xử lý lỗi khi không thể lấy thông tin người dùng
      }
    },
  },
});
