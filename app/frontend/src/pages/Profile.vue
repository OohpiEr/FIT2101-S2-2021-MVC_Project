<template>
  <div class="row">
    <div class="col-md-8">
      <edit-profile-form :model="model">
      </edit-profile-form>
    </div>
    <div class="col-md-4">
      <user-card :user="user"></user-card>
    </div>
  </div>
</template>
<script>
  import EditProfileForm from './Profile/EditProfileForm';
  import UserCard from './Profile/UserCard'
  export default {
    components: {
      EditProfileForm,
      UserCard
    },
    data() {
      return {
        model: {
          phone: '',
          email: '',
          username: '',
          firstName: '',
          lastName: '',
          address: '',
          city: '',
          country: '',
          about: ''
        },
        user: {
          fullName: '',
          title: '',
          description: '',
        }
      }
    },
    created(){
      let userdata = JSON.parse(localStorage.userdata)
      this.model.username = userdata.username
      this.user.username = userdata.username
      this.model.email = userdata.useremail
      this.model.phone = userdata.contact
    }
  }
</script>
<style>
</style>
