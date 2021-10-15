<template>
  <div>
    <card>
      <h5 slot="header" class="title">Change Personal Information</h5>
      <div class="row">
        <div class="col-md-3 pr-md-1">
          <base-input
            id="username"
            label="Username"
            placeholder="Username"
            v-model="model.username"
            disabled
          >
          </base-input>
        </div>
        <div class="col-md-5 px-md-1">
          <base-input
            id="email"
            label="Email address"
            type="email"
            placeholder="mike@email.com"
            v-model="model.email"
            disabled="none"
          >
          </base-input>
        </div>
        <div class="col-md-4 pl-md-1">
          <base-input
            id="phone_number"
            label="Phone Number"
            placeholder="Company"
            v-model="model.phone"
            disabled
          >
          </base-input>
        </div>
      </div>

      <base-button
        id="edit_save_btn"
        slot="footer"
        type="primary"
        fill
        @click="modify_button"
        >Edit</base-button
      >
    </card>
    <card>
      <!---->
      <h5 slot="header" class="title">Change Password</h5>
      <div class="row">
        <div class="col-md-4 pr-md-1">
          <!--v-model="model.oldpassword"-->
          <base-input
            id="old_password"
            label="Old Password"
            v-model="model.password"
            placeholder="Old Password"
            type="password"
            disabled
          >
          </base-input>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4 pr-md-1">
          <!--v-model="model.newpassword"-->
          <base-input
            id="new_password"
            label="New Password"
            v-model="model.newpassword"
            placeholder="New Password"
            type="password"
            v-bind:class="{
              'is-invalid': !(
                this.model.newpassword == this.model.confirmpassword
              ),
            }"
            disabled
          >
          </base-input>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4 pr-md-1">
          <!--v-model="model.confirmpassword"-->
          <base-input
            id="confirm_password"
            label="Confirm Password"
            v-model="model.confirmpassword"
            placeholder="Confirm Password"
            type="password"
            v-bind:class="{
              'is-invalid': !(
                this.model.newpassword == this.model.confirmpassword
              ),
            }"
            disabled
          >
          </base-input>
          <div class="invalid-feedback" style="color: red">
            ignore this--------------Confirm password must be the same as
            password
          </div>
        </div>
      </div>

      <base-alert
        id="password_validation"
        v-if="newPasswordValidationFail"
        type="warning"
        style="color: red"
      >
        Confirm password must be the same as new password!
      </base-alert>

      <!-- @click="modify_button" -->
      <!-- @click="modify_password" -->
      <base-button
        id="edit_change_password_btn"
        slot="footer"
        type="primary"
        fill
        @click="modify_password"
        >Change Password</base-button
      >
    </card>
  </div>
</template>
<script>
import NotificationTemplate from "../Notifications/NotificationTemplate";
import axios from "axios";

export default {
  props: {
    model: {
      type: Object,
      default: () => {
        return {};
      },
    },
    newPasswordValidationFail: false,
  },
  methods: {
    async modify_button() {
      let btn = document.getElementById("edit_save_btn");
      let username = document.getElementById("username");
      let phone_number = document.getElementById("phone_number");
      if (btn.innerText === "Edit") {
        btn.innerText = "Save";
        username.removeAttribute("disabled");
        phone_number.removeAttribute("disabled");
      } else {
        btn.innerText = "Edit";
        username.disabled = "true";
        phone_number.disabled = "true";
        const update = {
          useremail: this.model.email,
          username: this.model.username,
          contact: this.model.phone,
        };
        console.log(update); // this one prints in console
        // {useremail: 'Test18@gmail.com', username: 'AE', contact: '012222'}
        const response = await axios.put(
          "http://localhost:3000/api/user/update/info",
          update,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        console.log(response);
        if (response.status === 200) {
          localStorage.setItem("userdata", JSON.stringify(update));
        }
      }
    },

    async modify_password() {
      // need to hide the password when typed, but will do this after everything runs well
      let change_button = document.getElementById("edit_change_password_btn");
      let username = document.getElementById("username");

      let old_password = document.getElementById("old_password");
      let new_password = document.getElementById("new_password");
      let confirm_password = document.getElementById("confirm_password");
      // old_password.value = "";
      // new_password.value = "";
      // confirm_password.value = "";

      if (change_button.innerText === "Change Password") {
        change_button.innerText = "Save Password";
        old_password.removeAttribute("disabled");
        new_password.removeAttribute("disabled");
        confirm_password.removeAttribute("disabled");
        old_password.value = "";
        new_password.value = "";
        confirm_password.value = "";
      } else {
        change_button.innerText = "Change Password";
        old_password.disabled = "true";
        new_password.disabled = "true";
        confirm_password.disabled = "true";
        // old_password.value = "";
        // new_password.value = "";
        // confirm_password.value = "";

        const update_password = {
          useremail: this.model.email, // cannot get email
          newpassword: this.model.newpassword,
          oldpassword: this.model.password,
          // this.model.newpassword == this.model.confirmpassword ? <proceed> : <ask user to check>
          // how to raise error to the screen? "New Password is not the same as Confirm Password"
          // think they have the functionality on other component?
          // need to compare new password and confirm password
        };
        // confirmpassword: this.model.confirmpassword,
        console.log(update_password); // this one prints in console
        // this is the things that the user typed into the fields
        // example from personal information
        // {useremail: 'Test18@gmail.com', username: 'AE', contact: '012222'}

        if (this.model.newpassword == this.model.confirmpassword) {
          this.newPasswordValidationFail = false;
          const response_password = await axios.put(
            "http://localhost:3000/api/user/update/pwd",
            update_password,
            {
              headers: {
                Authorization: localStorage.getItem("token"), // Wei Hung asked this for testing purpose
              },
            }
          );
          console.log(response_password);
          // for error is 401?
          if (response_password.status === 200) {
            localStorage.setItem("userdata", JSON.stringify(update_password));
          }
        } else if (this.model.newpassword != this.model.confirmpassword) {
          this.newPasswordValidationFail = true;
          //old_password.value = "";
          //new_password.value = "";
          //confirm_password.value = "";
        }
      }
    },

    // async modify_password() {
    //   console.log("attempting to change password");

    //   const postinfo = {
    //     // useremail: this.user.email,
    //     // password: this.user.password,
    //     useremail: this.model.email,
    //     newpassword: this.model.newpassword,
    //     oldpassword: this.model.password,
    //   };
    //   axios
    //     .post("http://localhost:3000/api/user/update/pwd", postinfo)
    //     .then((response) => {
    //       // this.loginFail = false;
    //       // this.loginSuccess = true;
    //       localStorage.setItem("token", response.data.token);
    //       localStorage.setItem("userdata", JSON.stringify(response.data));
    //       // store.user.username = response.data.username;
    //       // store.user.email = response.data.useremail;
    //       // store.token = response.data.token;
    //       //router.push("dashboard");
    //       console.log(response.data);
    //     })
    //     .catch((error) => {
    //       console.log(error.message);
    //       // if (!this.loginFail) {
    //       //   this.loginFail = true;
    //       // }
    //     });
    // },
  },
};
</script>
<style>
input {
  background: white !important;
  color: black !important;
}
input:disabled {
  background: grey !important;
  color: white !important;
}
.edit_button {
  color: white !important;
  background: white !important;
}
#edit_save_btn {
  width: 100px;
  padding-left: 20px;
  padding-right: 20px;
}
</style>
