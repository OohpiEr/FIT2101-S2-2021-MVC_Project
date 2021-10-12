<template>
  <card>
    <h5 slot="header" class="title">Edit Profile</h5>
    <div class="row">
      <!-- <div class="col-md-5 pr-md-1">
        <base-input label="Company (disabled)"
                  placeholder="Company"
                  v-model="model.company"
                  disabled>
        </base-input>
      </div> -->
      <div class="col-md-3 pr-md-1">
        <base-input
          label="Username"
          placeholder="Username"
          v-model="model.username"
          disabled
        >
        </base-input>
      </div>
      <div class="col-md-5 px-md-1">
        <base-input
          label="Email address"
          type="email"
          placeholder="mike@email.com"
          v-model="model.email"
          disabled
        >
        </base-input>
      </div>
      <div class="col-md-4 pl-md-1">
        <base-input
          label="Phone Number"
          placeholder="Company"
          v-model="model.phone"
        >
        </base-input>
      </div>
    </div>
    <base-button name="edit_save_btn" slot="footer" type="primary" fill>Edit</base-button>

  </card>
</template>
<script>
export default {
  props: {
    model: {
      type: Object,
      default: () => {
        return {};
      },
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
.edit_button{
  color: white !important;
  background: white !important;
}
</style>
