<template>
  <div class="row">
    <div class="col-sm"></div>
    <div class="col-md-4">
      <h3 class="text-center">Sign Up</h3>
      <form @submit.prevent="handleSubmit">
        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <label for="user.password">Username</label>
              <input
                v-model="user.username"
                placeholder="mike123"
                v-bind:class="{
                  'form-control': true,
                }"
                required
              />
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <label for="user.password">Email address</label>
              <input
                type="email"
                placeholder="mike@email.com"
                v-model="user.email"
                v-bind:class="{
                  'form-control': true,
                }"
                required
              />
            </div>
          </div>
        </div>


        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <label for="user.password">Phone Number</label>
              <input
                v-model="user.phone"
                v-bind:class="{
                  'form-control': true,
                }"
                required
              />
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <label for="user.password">Password</label>
              <input
                type="password"
                v-model="user.password"
                v-bind:class="{
                  'form-control': true,
                  'is-invalid': !confirmPassword(),
                }"
                required
              />
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <label for="user.confirmPassword">Confirm Password</label>
              <input
                type="password"
                v-model="user.confirmPassword"
                v-bind:class="{
                  'form-control': true,
                  'is-invalid': !confirmPassword(),
                }"
                required
              />
              <div class="invalid-feedback">
                Confirm password must be the same as password
              </div>
            </div>
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
import axios from "axios";

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
      valid: false,
      submitted: false,
    };
  },
  methods: {
    handleSubmit() {
      console.log("form submitted");

      // TODO password validation

      // const signup = {
      //   useremail: this.user.email,
      //   username: this.user.username,
      //   contact: this.user.phone,
      //   password: this.user.password,
      // };
      // axios
      //   .post("http://localhost:3000/api/user/signup", signup)
      //   .then((response) => {
      //     console.log(response);
      //     // TODO add feedback here -> SUCCESS (201)
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //     // TODO add feedback here -> ERROR (500 - email ady exists)
      //   });
    },
    validate: function () {
      if (this.confirmPassword()) {
        this.valid = true;
      }
    },
    confirmPassword: function () {
      return this.user.password == this.user.confirmPassword;
    },
    submit: function () {
      this.validate();
      if (this.valid) {
        //THIS IS WHERE YOU SUBMIT DATA TO SERVER
        this.submitted = true;
      }
    }, //end submit
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

/* .error-msg{
  color: red;
} */
</style>
