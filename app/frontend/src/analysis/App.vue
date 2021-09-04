<template>
  <div id="app">
    <div class="content">
      <div class="top-bar">
        <Navigation />
      </div>
      <img alt="Donald Duck" src="./assets/Donald.png" style="width:300px;height:300px">
      <HelloWorld msg="CHANGE THIS"/>
    </div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Navigation from './components/Navigation.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    Navigation
  }
}
</script>

<style>
#app {
  position: relative;
  width: calc(100% - 20px);
  height: calc(100vh - 20px);
  padding: 10px;
  color: #333;
  overflow: hidden;
}

.content{
  position: absolute;
  top: 10px;
  width: calc(100% - 60px);
  height: calc(100vh - 60px);
  padding: 20px;
  background-color: #fff;
  border-radius: 30px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  transition: 1s transform cubic-bezier(0,.12,.14,1);
}

.top-bar{
  display:flex;
  width: 100%;
}
</style>
