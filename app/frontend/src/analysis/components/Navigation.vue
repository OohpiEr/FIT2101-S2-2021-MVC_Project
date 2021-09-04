<template>
  <div id = "navigation">
    <ul>
      <li><a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" rel="noopener">About us</a></li>
      <li><a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" rel="noopener">Table</a></li>
      <li><a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" rel="noopener">Analysis</a></li>
    </ul>
    <div class="search">
      <input type="text" placeholder="Search for items" />
      <i class="fas fa-search"></i>
    </div>
      <ul>
      <li>Login</li>
      <li>Register</li>
    </ul>  
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
#navigation{
  display: flex;
  width: 100%;
  margin-bottom: 50px;
}

ul{
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0 20 0 0;
  float:right;
  }

li{
  font-size: 2rem;
  padding: 10px;
  cursor: pointer;
  margin-right: 50px;
  border: 2px solid black;
  background-color: white;  
  border-radius: 25px;
}

a{
  color: black;
  text-decoration: none;
}

a:hover{
  color: red;
}

.search {
  position: relative;
  width: 100%;
  max-width: 100px;
  padding: 15px 0 0 0;
  margin: 0 150px 0 500px;
}

input {
  border: none;
  outline: none;
  width: 120px;
  padding: 15px 60px 15px 20px;
  margin: 0;
  border-radius: 20px;
  background-color: #efefef;
  font-family: "Segoe UI", Tahoma;
  font-size: 1rem;
}

</style>