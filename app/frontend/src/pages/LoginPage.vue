<template>
  <div class="row">
    <div class="col-sm"></div>
    <div class="col-md-4">
      <h3 class="text-center">Login</h3>
      <form @submit.prevent="handleSubmit">
        <base-alert v-if="loginFail" type="warning">
          Invalid email address or password.
        </base-alert>
        <base-alert v-if="loginSuccess" type="success">
          Login successful!
        </base-alert>

        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <label for="user.email">Email</label>
              <input
                type="email"
                v-model="user.email"
                v-bind:class="{
                  'form-control': true,
                  'is-invalid': loginFail,
                }"
                required
              />
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <label for="user.email">Password</label>
              <input
                type="password"
                v-model="user.password"
                v-bind:class="{
                  'form-control': true,
                  'is-invalid': loginFail,
                }"
                required
              />
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col text-center button">
            <button class="btn" slot="footer" type="primary" fill>Login</button>
          </div>
        </div>
      </form>
    </div>
    <div class="col-sm"></div>
  </div>
</template>



<script>
import axios from "axios";
import { BaseAlert } from "@/components";
import router from "../router/starterRouter";
import store from "@/store";

export default {
  name: "login",
  components: {
    BaseAlert,
    router,
  },
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      loginFail: false,
      loginSuccess: false,
    };
  },
  methods: {
    async handleSubmit() {
      console.log("form submitted");

      const postinfo = {
        useremail: this.user.email,
        password: this.user.password,
      };
      axios
        .post("http://localhost:3000/api/user/login", postinfo)
        .then((response) => {
          this.loginFail = false;
          this.loginSuccess = true;
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("userdata", JSON.stringify(response.data));
          // store.user.username = response.data.username;
          // store.user.email = response.data.useremail;
          // store.token = response.data.token;
          router.push("dashboard");
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error.message);
          if (!this.loginFail) {
            this.loginFail = true;
          }
        });
    },
  },
};
</script>



<style>
.button {
  padding: 15px;
}
</style>
