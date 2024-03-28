import createApiClient from "./api.service";
class ChatService {
  constructor(baseUrl = "/api/v1/chats") {
    this.api = createApiClient(baseUrl);
  }
  async create(data) {
    return (await this.api.post("/", data)).data;
  }
  async get(id) {
    return (await this.api.get(`/${id}`)).data.data;
  }
  async getAll() {
    return (await this.api.get("/")).data.data;
  }
  async getAllUserChats(userId) {
    return (await this.api.get(`/chat/${userId}`)).data.data;
  }
}
export default new ChatService();
