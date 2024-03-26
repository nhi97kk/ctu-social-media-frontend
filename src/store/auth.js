import { defineStore } from "pinia";
import UserService from "../services/user.service";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    authUser: null,
  }),
  getters: {
    user: (state) => state.authUser,
  },
  actions: {
    async getUser() {
      try {
        const data = await UserService.getUser();
        this.authUser = data.data;
      } catch (error) {
        console.log("Just login!");
        // Xử lý lỗi khi không thể lấy thông tin người dùng
      }
    },
  },
});
