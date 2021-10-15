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

        <div class="row white_text">
          <div class="col-md-12">
            <div class="form-group">
              <label>Email</label>
              <input
                class="input_white_background"
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

        <div class="row white_text">
          <div class="col-md-12">
            <div class="form-group">
              <label>Password</label>
              <input
                class="input_white_background"
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

        <!-- Trigger/Open The Modal -->
        <div class="forgot_password">
          <a href="#" id="myBtn" @click = "modal" data-toggle="myModal">Forgot Password</a>
        </div>


        <div class="row">
          <div class="col text-center button">
            <button class="btn" slot="footer" type="primary" fill>Login</button>
          </div>
        </div>
      </form>

      <!-- The Modal -->
      <div id="myModal" class="modal">

        <!-- Modal content -->
        <div class="modal-content"  style="background: black; width: 300px; text-align: center">
          <span class="close">&times;</span>

          <form role="form" @submit.prevent="submit_pin">
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label  class="white-label">Enter your PIN.</label>
                  <input
                    type="password"
                    placeholder="PIN"
                    required
                    v-model="model.PIN"
                    maxlength="4"
                    class="modal-pin">
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label class="white-label">Email</label>
                  <input
                    type="email"
                    placeholder="mike123@gmail.com"
                    required
                    v-model="model.email"
                    class="modal-email"
                  />
                  <div class="invalid-feedback">Email already exist</div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label class="white-label">Enter a new Password</label>
                  <input
                    type="password"
                    v-model="model.password"
                    required
                    class="modal-password"
                  />
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label class="white-label">Confirm Password</label>
                  <input
                    type="password"
                    v-model="model.confirmPassword"
                    required
                    class="modal-password"
                  />
                  <div class="invalid-feedback">
                    Confirm password must be the same as password
                  </div>
                </div>
              </div>
            </div>

            <div class="text-center">
              <button class="btn my-4" slot="footer" id="submit_pin">Submit</button>
            </div>



          </form>
        </div>
      </div>



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
      model: {
        PIN: "",
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
    async submit_pin(){
      const postinfo = {
        useremail: this.model.email,
        password: this.model.password,
        PIN: this.model.pin
      };
      axios
        .put("http://localhost:3000/api/user/update/forgot", postinfo)
        .then((response) => {
          this.loginFail = false;
          this.loginSuccess = true;
          // localStorage.setItem("token", response.data.token);
          // localStorage.setItem("userdata", JSON.stringify(response.data));
          // store.user.username = response.data.username;
          // store.user.email = response.data.useremail;
          // store.token = response.data.token;
          router.push("dashboard");
          // console.log(response.data);
          console.log(response);
        })
        .catch((error) => {
          console.log(error.message);
          if (!this.loginFail) {
            this.loginFail = true;
          }
        });
    },
    modal: function(){
      // Get the modal
      let modal = document.getElementById("myModal");

      // Get the button that opens the modal
      let btn = document.getElementById("myBtn");

      // Get the <span> element that closes the modal
      let span = document.getElementsByClassName("close")[0];

      // When the user clicks the button, open the modal
      modal.style.display = "block";

      // When the user clicks on <span> (x), close the modal
      span.onclick = function() {
        modal.style.display = "none";
      }

      // When the user clicks anywhere outside of the modal, close it
      window.onclick = function(event) {
        if (event.target === modal) {
          modal.style.display = "none";
        }
      }
}

  },
};
</script>



<style>
.button {
  padding: 15px;
}
.white_text {
  color: white;
}
.forgot_password {
  color: lightskyblue;
  text-align: right;
  font-size: 13px;
}
.input_white_background{
  background: white;
}

.modal-pin{
  border-radius: 5px; padding-left:60px; padding-right:60px; font-size:20px; width: 170px; outline: none;
}

.modal-password{
  border-radius: 5px; padding-left:10px; padding-right:10px; font-size:20px; width: 200px; outline: none;
}

.modal-email{
  border-radius: 5px; padding-left:10px; padding-right:10px; font-size:15px; width: 200px; outline: none; height: 40px;
}

.white-label{
  display: block;
  color: white;
}

.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal Content */
.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

/* The Close Button */
.close {
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}

</style>
