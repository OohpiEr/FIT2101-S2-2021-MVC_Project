<template>
  <form>
    <div class="row">
      <div class="col-md-12 inputField">
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
      <div class="col-md-12 inputField">
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
      <div class="col-md-12 inputField">
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
      <div class="col-md-12 inputField">
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
      <div class="col-md-12 inputField">
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
        <base-button slot="footer" type="primary" fill>Sign Up</base-button>
      </div>
    </div>
  </form>
</template>
<script>
import Dashboard from "../Dashboard.vue";
export default {
  components: { Dashboard },
  props: {
    user: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
};
</script>

<style scoped>
.inputField {
  padding-bottom: 5px;
  padding-top: 5px;
  padding-right: 30px;
  padding-left: 30px;
}

.button{
  padding: 15px;
}
</style>
