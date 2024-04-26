import { defineStore } from "pinia";
import ChatService from "../services/chat.service";

export const useChatStore = defineStore("chat", {
  state: () => ({
    allChats: null,
    Achat: null,
  }),
  getters: {
    chats: (state) => state.allChats,
    chat: (state) => state.Achat,
  },
  actions: {
    async getAllUserChats(id) {
      try {
        const data = await ChatService.getAllUserChats(id);
        this.allChats = data;

        console.log(data);
      } catch (error) {
        console.log(error);
        // Xử lý lỗi khi không thể lấy thông tin người dùng
      }
    },

    async getChat(id) {
      try {
        const data = await ChatService.get(id);
        this.Achat = data.data;

        console.log(this.Achat);
      } catch (error) {
        console.log(error);
      }
    },
  },
});
