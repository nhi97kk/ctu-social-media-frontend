import createApiClient from "./api.service";
class MessageService {
  constructor(baseUrl = "/api/v1/messages") {
    this.api = createApiClient(baseUrl);
  }
  async create(data) {
    return (await this.api.post("/", data)).data;
  }

  async getAllMessagesChats(chatId) {
    return (await this.api.get(`/message/${chatId}`)).data.data;
  }
}
export default new MessageService();
