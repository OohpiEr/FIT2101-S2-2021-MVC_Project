<template>
  <div class="wrapper">
    <side-bar>
      <template slot="links">
        <sidebar-link to="/dashboard" :name="$t('sidebar.dashboard')" icon="tim-icons icon-chart-pie-36" />
        <sidebar-link to="/analysis" :name="$t('analysis')" icon="tim-icons icon-chart-pie-36" />
        <sidebar-link to="/table" :name="$t('table')" icon="tim-icons icon-chart-pie-36" />
        <sidebar-link v-if="userclass === 'superaccount'" to="/report" :name="$t('report')" icon="tim-icons icon-alert-circle-exc" />
        <sidebar-link to="/about-us" :name="$t('about us')" icon="tim-icons icon-alert-circle-exc" />
      </template>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click.native="toggleSidebar"> </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss">
</style>
<script>
import TopNavbar from "./SampleNavbar.vue";
import ContentFooter from "./SampleFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "./MobileMenu";
export default {
  components: {
    TopNavbar,
    ContentFooter,
    DashboardContent,
    MobileMenu,
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
  },
  data() {
    return {
      userclass: "basic"
    };
  },
  created() {
    let userdata = JSON.parse(localStorage.userdata);
    this.userclass = userdata.class;
    console.log(this.userclass);
  },
};
</script>
