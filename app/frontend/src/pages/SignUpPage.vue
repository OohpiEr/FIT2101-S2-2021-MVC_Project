<template>
  <div class="row">
    <div class="col-sm"></div>
    <div class="col-md-4">

      <modal :show.sync="modal">
        <h3 slot="header" class="modal-title" id="modal-title-default">
          Sign Up Success!
        </h3>

        <template slot="footer">
          <div class="col text-center button">
            <base-button type="primary" @click="$router.push('login')">Proceed to Log In</base-button>
          </div>
          
          <!-- <base-button type="secondary" class="ml-auto" @click="modal = false"
            >Close
          </base-button> -->
        </template>
      </modal>

      <h3 class="text-center">Sign Up</h3>
      <form @submit.prevent="handleSubmit">
        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <label for="user.username">Username</label>
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
              <label for="user.email">Email</label>
              <input
                type="email"
                placeholder="mike123@gmail.com"
                v-model="user.email"
                v-bind:class="{
                  'form-control': true,
                  'is-invalid': emailExist,
                }"
                required
              />
              <div class="invalid-feedback">Email already exist</div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <label for="user.phone">Phone</label>
              <input
                type="tel"
                placeholder="0123456789"
                v-model="user.phone"
                v-bind:class="{
                  'form-control': true,
                  'is-invalid': !validatePhone(),
                }"
                required
              />
              <div class="invalid-feedback">
                Phone number must be a valid format
              </div>
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
import { Modal } from "@/components";
import router from "../router/starterRouter";

export default {
  name: "sign-up",
  components: {
    Modal,
    router,
  },
  data() {
    return {
      user: {
        email: "",
        username: "",
        phone: "",
        password: "",
        confirmPassword: "",
      },
      submitted: false,
      modal: false,
      emailExist: false,
    };
  },
  methods: {
    handleSubmit() {
      if (this.validatePhone() && this.confirmPassword()) {
        this.submit();
      } else {
        console.log("form denied");
      }
    },
    confirmPassword: function () {
      return this.user.password == this.user.confirmPassword;
    },
    validatePhone: function () {
      let phone = Math.floor(Number(this.user.phone));
      return phone >= 0;
    },
    async submit() {
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
          this.emailExist = false;
          this.modal = true;
        })
        .catch((error) => {
          console.log(error);
          // TODO add feedback here -> ERROR (500 - email ady exists)
          this.emailExist = true;
        });
    },
  },
};
</script>



<style scoped>
.button {
  padding: 15px;
}

/* .error-msg{
  color: red;
} */
</style>
