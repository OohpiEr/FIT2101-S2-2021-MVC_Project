<template>
  <div class="row">
    <div class="col-sm"></div>
    <div class="col-md-4">
      <h3 class="text-center">Sign Up</h3>
      <form @submit.prevent="handleSubmit">
        <div class="row">
          <div class="col-md-12">
            <base-input
              label="Username"
              placeholder="Username"
              v-model="user.username"
              required
            >
            </base-input>
          </div>
        </div>

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
              label="Phone Number"
              placeholder="0123456789"
              v-model="user.phone"
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
          <div class="col-md-12">
            <base-input
              id="input"
              label="Confirm Password"
              type="password"
              v-model="user.confirmPassword"
              required
            >
            </base-input>
          </div>
        </div>

        <div class="row">
          <div class="col text-center button">
            <button class="btn" slot="footer" type="primary" fill>
              Sign Up
            </button>
            <!-- <base-button class="btn" slot="footer" type="primary" fill>Sign Up</base-button> -->
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
  name: "sign-up",
  data() {
    return {
      user: {
        email: "",
        username: "",
        phone: "",
        password: "",
        confirmPassword: "",
      },
    };
  },
  methods: {
    handleSubmit() {
      console.log("form submitted");

      // TODO password validation

      const signup = {
        useremail: this.user.email,
        username: this.user.username,
        contact: this.user.phone,
        password: this.user.password,
      };
      axios
        .post("http://localhost:3000/api/user/signup", signup)
        .then((response) => {
          console.log(response);
          // TODO add feedback here -> SUCCESS (201)
        })
        .catch((error) => {
          console.log(error);
          // TODO add feedback here -> ERROR (500 - email ady exists)
        });
    },
  },
};
</script>



<style scoped>
base-input {
  display: block;
  padding: 10px 6px;
}

.button {
  padding: 15px;
}
</style>
