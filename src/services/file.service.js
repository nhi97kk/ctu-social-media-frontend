import createApiClient from "./photo.service";
class FileService {
  constructor(baseUrl = "/api/v1") {
    this.api = createApiClient(baseUrl);
  }
  async create(data) {
    return (await this.api.post("/posts", data)).data.data;
  }
  async update(data) {
    return (await this.api.patch("/posts/:id", data)).data;
  }
  async updateUser(data) {
    return (await this.api.patch("/users/updateMe", data)).data.data;
  }
}
export default new FileService();
