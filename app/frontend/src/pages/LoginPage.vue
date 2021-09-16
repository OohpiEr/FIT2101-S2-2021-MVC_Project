<template>
  <div class="row">
    <div class="col-sm"></div>
    <div class="col-md-4">
      <h3 class="text-center">Login</h3>
      <form @submit.prevent="handleSubmit">
        <div class="row">
          <div class="col-md-12">
            <base-input
              id="input"
              label="Email address"
              type="email"
              placeholder="mike@email.com"
              v-model="user.email"
              required
            >
            </base-input>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <base-input
              id="input"
              label="Password"
              type="password"
              v-model="user.password"
              required
            >
            </base-input>
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
import axios from 'axios';

export default {
  name: "login",
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    handleSubmit() {
      console.log("form submitted");

      const postinfo = {
      useremail: this.user.email,
      password: this.user.password,
    };
    axios
      .post("http://localhost:3000/api/user/login", postinfo)
      .then((response) => {
        console.log(response);
          // TODO add feedback here -> SUCCESS (201)
      })
      .catch((error) => {
        console.log(error.message);
          // TODO add feedback here -> ERROR (500 - email ady exists)
      });
    },
  },
};
</script>



<style></style>
