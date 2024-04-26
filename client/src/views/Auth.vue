<template>
  <div class="Auth">
    <!-- Left side -->
    <div class="a-left">
      <img src="../assets/img/icons/logo-ctu.png" alt="" />
      <div class="Webname">
        <h1>Social Media</h1>
        <h6>Explore the ideas throughout the world</h6>
      </div>
    </div>
    <!-- Right side -->
    <div class="a-right">
      <form class="infoForm authForm" @submit.prevent="handleSubmit">
        <h3>{{ isSignup ? "Sign up" : "Log In" }}</h3>

        <!-- Conditional rendering for first and last name inputs -->
        <div v-if="isSignup">
          <input
            type="text"
            placeholder="Name "
            class="infoInput"
            name="name"
            v-model="data.name"
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            class="infoInput"
            name="email"
            v-model="data.email"
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            class="infoInput"
            name="password"
            v-model="data.password"
          />
          <!-- Conditional rendering for confirm password input -->
          <input
            v-if="isSignup"
            type="password"
            placeholder="Confirm Password"
            class="infoInput"
            name="passwordConfirm"
            v-model="data.passwordConfirm"
          />
        </div>
        <span
          v-show="passwordConfirm"
          style="
            color: red;
            font-size: 14px;
            align-self: flex-end;
            margin-right: 5px;
          "
          >* Confirm Password is not same</span
        >
        <div>
          <span
            style="font-size: 13px; cursor: pointer; color: blue"
            @click="toggleSignup"
            >{{
              isSignup
                ? "Already have an account. Login!"
                : "Don't have an account? Sign up!"
            }}</span
          >
        </div>
        <button class="button infoButton" type="submit" :disabled="loading">
          {{ loading ? "Loading..." : isSignup ? "Sign up" : "Log In" }}
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import authService from "@/services/auth.service";
export default {
  data() {
    return {
      isSignup: true,
      loading: false,
      passwordConfirm: false,
      data: {
        name: "",
        email: "",
        password: "",
        passwordConfirm: "",
      },
    };
  },
  methods: {
    async handleSubmit() {
      this.loading = true;
      try {
        if (this.isSignup) {
          // Nếu đang ở chế độ đăng ký, thực hiện hàm signup
          await authService.signUp(this.data);
        } else {
          // Nếu đang ở chế độ đăng nhập, thực hiện hàm login với email và password
          await authService.login({
            email: this.data.email,
            password: this.data.password,
          });
        }
        // Xử lý sau khi đăng nhập hoặc đăng ký thành công
        this.$router.push("/");
      } catch (error) {
        alert("Error:" + error.response.data.message);
        // Xử lý lỗi
      } finally {
        this.loading = false;
      }
    },
    toggleSignup() {
      this.isSignup = !this.isSignup;
      this.resetForm();
    },
    resetForm() {
      this.data.name = "";
      this.data.email = "";
      this.data.password = "";
      this.data.passwordConfirm = "";
      this.passwordConfirm = false;
    },
  },
  watch: {
    "data.passwordConfirm"(newVal, oldVal) {
      if (this.isSignup && newVal !== this.data.password) {
        this.passwordConfirm = true;
      } else {
        this.passwordConfirm = false;
      }
    },
  },
};
</script>

<style scoped>
@import "./style/auth.css";
</style>
