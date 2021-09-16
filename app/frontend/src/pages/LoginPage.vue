<template>
  <div class="row">
    <div class="col-sm"></div>
    <div class="col-md-4">
      <h3 class="text-center">Login</h3>
      <form>
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
              label="Password"
              type="password"
              v-model="user.password"
              required
            >
            </base-input>
          </div>
        </div>

        <div class="row">
          <div class="col text-center button">
            <button class="btn" slot="footer" type="primary" fill>Login</button>
          </div>
        </div>
      </form>
    </div>
    <div class="col-sm"></div>
  </div>
</template>



<script>
export default {
  name: "login",
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
    };
  },
};
</script>



<style></style>
