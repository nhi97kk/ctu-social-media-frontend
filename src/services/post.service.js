import createApiClient from "./api.service";
class PostService {
  constructor(baseUrl = "/api/v1/posts") {
    this.api = createApiClient(baseUrl);
  }
  async delete() {
    return (await this.api.post("/:id")).data;
  }
  async like(id) {
    return (await this.api.post(`/${id}/like`)).data;
  }
  async get() {
    return (await this.api.get("/:id")).data;
  }
  async getAll() {
    return (await this.api.get("/")).data.data;
  }
}
export default new PostService();
