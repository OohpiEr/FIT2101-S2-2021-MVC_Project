<template>
  <div class="wrapper">
    <div class="main-panel">
      <top-navbar></top-navbar>

      <no-sidebar-content></no-sidebar-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss">
</style>
<script>
  import TopNavbar from "./NoSidebarNavbar.vue";
  import ContentFooter from "./SampleFooter.vue";
  import NoSidebarContent from "./NoSidebarContent.vue";
  import MobileMenu from "./MobileMenu";
  export default {
    components: {
      TopNavbar,
      ContentFooter,
      NoSidebarContent,
      MobileMenu
    }
  };
</script>
