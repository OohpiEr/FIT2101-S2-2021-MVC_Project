<template>
  <div class="row">
    <div class="col-sm"></div>
    <div class="col-md-4">
      <h3 class="text-center">Login</h3>
      <login-card :user="user"></login-card>
      <!-- <p> Email: {{ user.email }}</p> -->
    </div>
    <div class="col-sm"></div>
  </div>
</template>



<script>
import LoginCard from './LoginPage/LoginForm.vue';
export default {
  name: "login",
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
    };
  },
  components: {
    LoginCard
  },
};
</script>



<style></style>
