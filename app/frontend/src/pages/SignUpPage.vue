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
        company: "Creative Code Inc.",
        email: "mike@email.com",
        username: "michael23",
        firstName: "Mike",
        lastName: "Andrew",
        address: "Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09",
        city: "Melbourne",
        country: "Australia",
        about:
          "Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo.",
      },
    };
  },
  components: {
    SignUpCard
  },
};
</script>



<style></style>
