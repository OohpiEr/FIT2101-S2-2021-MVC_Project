<template>
  
</template>

<script>
import axios from 'axios';

export default {
    name: "post-request",
    created() {
        const signup = {
            useremail: "testing111@gmail.com",
            username: "Tester 222", 
            contact: "07-054242",
            password: "secret",
        };
        axios.post("http://localhost:3000/api/user/signup", signup)
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        }); 
        
    }
}
</script>

<style>

</style>