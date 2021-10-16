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
      <h5 slot="header" class="title">Change Password</h5>
      <div class="row">
        <div class="col-md-4 pr-md-1">
          <base-input
            id="old_password"
            label="Old Password"
            v-model="model.password"
            placeholder="Old Password"
            type="password"
          >
          </base-input>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4 pr-md-1">
          <base-input
            id="new_password"
            label="New Password"
            v-model="model.newpassword"
            placeholder="New Password"
            type="password"
          >
          </base-input>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4 pr-md-1">
          <base-input
            id="confirm_password"
            label="Confirm Password"
            v-model="model.confirmpassword"
            placeholder="Confirm Password"
            type="password"
          >
          </base-input>
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

      <base-alert
        id="password_validation_success"
        v-if="newPasswordValidationSuccess"
        type="warning"
        style="color: lightgreen"
      >
        Password has been changed successfully!
      </base-alert>

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
    newPasswordValidationSuccess: false,
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
        const response = await axios.put(
          "http://localhost:3000/api/user/update/info",
          update,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        if (response.status === 200) {
          updateInfo = JSON.parse(
            localStorage.getItem("userdata", JSON.stringify(update))
          );
          updateInfo.username = update.username;
          updateInfo.contact = update.contact;
          localStorage.setItem("userdata", JSON.stringify(updateInfo));
        }
      }
    },

    async modify_password() {
      let change_button = document.getElementById("edit_change_password_btn");
      let old_password = document.getElementById("old_password");
      let new_password = document.getElementById("new_password");
      let confirm_password = document.getElementById("confirm_password");

      const update_password = {
        useremail: this.model.email,
        newpassword: this.model.newpassword,
        oldpassword: this.model.password,
      };

      if (this.model.newpassword == this.model.confirmpassword) {
        this.newPasswordValidationFail = false;
        const response_password = await axios.put(
          "http://localhost:3000/api/user/update/pwd",
          update_password,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        if (response_password.status === 200) {
          this.newPasswordValidationSuccess = true;
          this.model.password = "";
          this.model.newpassword = "";
          this.model.confirmpassword = "";
        }
      } else if (this.model.newpassword != this.model.confirmpassword) {
        this.newPasswordValidationSuccess = false;
        this.newPasswordValidationFail = true;
      }
    },
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
