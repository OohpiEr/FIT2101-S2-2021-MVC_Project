import Vue from 'vue';
import Router from 'vue-router';
import DashboardLayout from '../layout/starter/SampleLayout.vue';
// import Starter from '../layout/starter/SamplePage.vue';

const Dashboard = () => import(/* webpackChunkName: "dashboard" */"@/pages/Dashboard.vue");
const Profile = () => import(/* webpackChunkName: "common" */ "@/pages/Profile.vue");
const AboutUs = () => import(/* webpackChunkName: "common" */ "@/pages/AboutUs.vue");
const Analysis = () => import(/* webpackChunkName: "common" */ "@/pages/Analysis.vue");
const Table = () => import(/* webpackChunkName: "common" */ "@/pages/Table.vue");

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/dashboard',
      component: DashboardLayout,
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          component: Dashboard
        },
        {
          path: "profile",
          name: "profile",
          component: Profile
        },
        {
          path: "about-us",
          name: "about us",
          component: AboutUs
        },
        {
          path: "anlysis",
          name: "anlysis",
          component: Analysis
        },
        {
          path: "table",
          name: "table",
          component: Table
        }
      ]
    }
  ]
});
