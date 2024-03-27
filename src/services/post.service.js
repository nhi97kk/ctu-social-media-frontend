import createApiClient from "./api.service";
class PostService {
  constructor(baseUrl = "/api/v1/posts") {
    this.api = createApiClient(baseUrl);
  }
  async delete(id) {
    return (await this.api.delete(`/${id}`)).data;
  }
  async like(id) {
    return (await this.api.post(`/${id}/like`)).data;
  }
  async get(id) {
    return (await this.api.get(`/${id}`)).data.data;
  }
  async getAll() {
    return (await this.api.get("/")).data.data;
  }
  async getAllUserPosts(id) {
    return (await this.api.get(`/all/${id}`)).data.data;
  }
}
export default new PostService();
