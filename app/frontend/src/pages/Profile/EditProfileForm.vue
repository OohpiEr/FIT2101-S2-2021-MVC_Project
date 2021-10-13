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
    modify_button() {
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
      }
    }
  },
  async created(){
    const update = {
      useremail: this.user.email,
      username: this.user.username,
      contact: this.user.phone,
    };
    const response = await axios.put('http://localhost:3000/api/user/update/info',update, {
      headers: {
        "Authorization": localStorage.getItem('token'),
      }
    });
  }
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
