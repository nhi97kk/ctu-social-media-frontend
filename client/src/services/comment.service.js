import createApiClient from "./api.service";
class CommentService {
  constructor(baseUrl = "/api/v1/comments") {
    this.api = createApiClient(baseUrl);
  }
  async create(data) {
    return (await this.api.post("/", data)).data;
  }
  async update(id) {
    return await this.api.patch(`/${id}`);
  }
  async delete(id) {
    return await this.api.delete(`/${id}`);
  }
  async get(id) {
    return (await this.api.get(`/${id}`)).data.data;
  }
  async getAll() {
    return (await this.api.get("/")).data.data;
  }
  async getAllCommentsPost(postId) {
    return (await this.api.get(`/post/${postId}`)).data.data;
  }
}
export default new CommentService();
