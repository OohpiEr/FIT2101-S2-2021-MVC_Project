<template>
  <card>
    <h5 slot="header" class="title">Edit Profile</h5>
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
    <base-button id="edit_save_btn" slot="footer" type="primary" fill @click = "modify_button">Edit</base-button>


  </card>
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
  },
  methods: {
    async modify_button() {
      let btn = document.getElementById("edit_save_btn");
      let username = document.getElementById("username");
      let phone_number = document.getElementById("phone_number");
      if (btn.innerText === "Edit"){
        btn.innerText = "Save";
        username.removeAttribute("disabled");
        phone_number.removeAttribute("disabled");
      }
      else{
        btn.innerText = "Edit";
        username.disabled = "true";
        phone_number.disabled = "true";
        const update = {
          useremail: this.model.email,
          username: this.model.username,
          contact: this.model.phone,
        };
        console.log(update);
        const response = await axios.put('http://localhost:3000/api/user/update/info',update, {
          headers: {
            "Authorization": localStorage.getItem('token'),
          }
        });
        console.log(response);
        if (response.status === 200){

          localStorage.setItem("userdata", JSON.stringify(update));
        }

      }
    }
  },
  // async created(){
  //   const update = {
  //     useremail: this.model.email,
  //     username: this.model.username,
  //     contact: this.model.phone,
  //   };
  //   const response = await axios.put('http://localhost:3000/api/user/update/info',update, {
  //     headers: {
  //       "Authorization": localStorage.getItem('token'),
  //     }
  //   });
  //   console.log(response);
  // }
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
.edit_button{
  color: white !important;
  background: white !important;
}
#edit_save_btn{
  width: 100px;
  padding-left: 20px;
  padding-right: 20px;
}
</style>
