<template>
  <div class="profile">
    <div class="card-info">
      <div class="img-profile">
        <img :src="getImageUrl(user.photo)" alt="" />
      </div>

      <div class="info-profile">
        <h4>{{ user?.name }}</h4>
        <h4>{{ user?.email }}</h4>
      </div>

      <i
        class="fa-solid fa-user-pen edit-me-icon"
        data-toggle="modal"
        data-target="#myModal"
      ></i>
    </div>
  </div>

  <!-- The Modal -->
  <div class="modal" id="myModal">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="modal-title text-center">Edit Profile Information</h4>
          <button type="button" class="close" data-dismiss="modal">
            &times;
          </button>
        </div>

        <!-- Modal body -->
        <div class="user-view__form-container">
          <h2 class="heading-secondary ma-bt-md">Your account settings</h2>

          <form class="form form-user-data">
            <div class="form__group">
              <label class="form__label" for="name">Name</label>
              <input
                id="name"
                class="form__input"
                type="text"
                v-model="userLocal.name"
                required
                name="name"
              />
            </div>
            <div class="form__group ma-bt-md">
              <label class="form__label" for="email">Email address</label>
              <input
                id="email"
                class="form__input"
                type="email"
                v-model="userLocal.email"
                required
                name="email"
              />
            </div>
            <div class="form__group form__photo-upload">
              <img
                class="form__user-photo"
                :src="
                  userPhotoUrl ? userPhotoUrl : getImageUrl(userLocal.photo)
                "
                alt="User photo"
              />
              <input
                class="form__upload"
                type="file"
                accept="image/*"
                id="photo"
                name="photo"
                ref="file"
                @change="handleFileChange()"
              />
              <label for="photo" class="form__label">Upload a new photo</label>
            </div>
            <div class="form__group right">
              <button
                data-dismiss="modal"
                class="btn btn--small btn-success"
                @click="updateUser"
              >
                Save
              </button>
            </div>
          </form>

          <div class="line">&nbsp;</div>

          <h2 class="heading-secondary ma-bt-md">Password change</h2>
          <form class="form form-user-password">
            <div class="form__group">
              <label class="form__label" for="password-current"
                >Current password</label
              >
              <input
                id="password-current"
                class="form__input"
                type="password"
                placeholder="••••••••"
                required
                minlength="8"
                v-model="data.passwordCurrent"
              />
            </div>
            <div class="form__group">
              <label class="form__label" for="password">New password</label>
              <input
                id="password"
                class="form__input"
                type="password"
                placeholder="••••••••"
                required
                minlength="8"
                v-model="data.password"
              />
            </div>
            <div class="form__group ma-bt-lg">
              <label class="form__label" for="password-confirm"
                >Confirm password</label
              >
              <input
                id="password-confirm"
                class="form__input"
                type="password"
                placeholder="••••••••"
                required
                minlength="8"
                v-model="data.passwordConfirm"
              />
            </div>
            <div class="form__group right">
              <button
                @click="updatePass"
                data-dismiss="modal"
                class="btn btn--small btn-warning"
              >
                Save password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import fileService from "@/services/file.service";
import authService from "@/services/auth.service";
export default {
  data() {
    return {
      userLocal: this.user,
      data: {
        passwordCurrent: "",
        password: "",
        passwordConfirm: "",
      },
      userPhotoUrl: null,
    };
  },
  props: {
    user: {
      type: Object,
    },
  },
  methods: {
    getImageUrl(photo) {
      return `http://localhost:3000/img/users/${photo}`;
    },
    handleFileChange(e) {
      this.userLocal.photo = this.$refs.file.files[0];
      // Tạo URL cho tập tin mới và gán cho thuộc tính src của hình ảnh
      this.userPhotoUrl = URL.createObjectURL(this.$refs.file.files[0]);
      // console.log(this.data.photo);
    },
    async updateUser() {
      try {
        let formData = new FormData();
        formData.append("name", this.userLocal.name);
        formData.append("email", this.userLocal.email);
        formData.append("photo", this.userLocal.photo);

        await fileService.updateUser(formData);

        alert("Profile updated successfully!");
        window.location.reload();
      } catch (error) {
        console.log("Error:" + error.message);
        alert("An error occurred. Please try again later.");
      }
    },
    async updatePass() {
      try {
        await authService.updatePass(this.data);

        alert("Password changed successfully");
      } catch (error) {
        alert("error");
        console.log(error);
      }
    },
  },
};
</script>
<style scoped>
@import "../views/style/profile.css";
</style>
