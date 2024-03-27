import createApiClient from "./api.service";
class UserService {
  constructor(baseUrl = "/api/v1/users") {
    this.api = createApiClient(baseUrl);
  }
  async getUser() {
    return (await this.api.get("/me")).data.data;
  }
  async getOtherUser(id) {
    return (await this.api.get(`/${id}`)).data.data;
  }

  async deleteAll() {
    return (await this.api.delete("/")).data;
  }
  async get(id) {
    return (await this.api.get(`/${id}`)).data;
  }
  async update(id, data) {
    return (await this.api.put(`/${id}`, data)).data;
  }
  async delete(id) {
    return (await this.api.delete(`/${id}`)).data;
  }

  //friend
  async addFriend(userId) {
    return await this.api.patch(`/friends/${userId}/request`);
  }
  async acceptRequest(userId) {
    return await this.api.patch(`/friends/${userId}/accept`);
  }
  async unFriend(userId) {
    return await this.api.patch(`/friends/${userId}/unfriend`);
  }

  async getAllFriends() {
    return (await this.api.get("/contactMe")).data.data;
  }
  async getAllOthers() {
    return (await this.api.get("/othersMe")).data.data;
  }
}
export default new UserService();
