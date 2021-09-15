<template>
  <div class="row">
    <div class="col-sm"></div>
    <div class="col-md-4">
      <h3 class="text-center">Sign Up</h3>
      <sign-up-card :user="user"></sign-up-card>
    </div>
    <div class="col-sm"></div>

  </div>
</template>



<script>
import SignUpCard from "./SignUpPage/SignUpCard.vue";
export default {
  name: "sign-up",
  data() {
    return {
      user: {
        email: "mike@email.com",
        username: "michael23",
      },
    };
  },
  components: {
    SignUpCard
  },
};
</script>



<style></style>
