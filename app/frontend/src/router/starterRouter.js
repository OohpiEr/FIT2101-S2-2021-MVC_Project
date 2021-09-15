import Vue from 'vue';
import Router from 'vue-router';
import DashboardLayout from '../layout/starter/SampleLayout.vue';
import NoSidebarLayout from '../layout/starter/NoSidebarLayout.vue';

const Dashboard = () => import(/* webpackChunkName: "dashboard" */"@/pages/Dashboard.vue");
const AboutUs = () => import(/* webpackChunkName: "common" */ "@/pages/AboutUs.vue");
const Analysis = () => import(/* webpackChunkName: "common" */ "@/pages/Analysis.vue");
const Table = () => import(/* webpackChunkName: "common" */ "@/pages/Table.vue");
const SignUpPage = () => import(/* webpackChunkName: "common" */ "@/pages/SignUpPage.vue");

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
          path: "about-us",
          name: "about us",
          component: AboutUs
        },
        {
          path: "analysis",
          name: "analysis",
          component: Analysis
        },
        {
          path: "table",
          name: "table",
          component: Table
        }
      ]
    },
    {
      path: '/',
      name: 'sign-up',
      redirect: '/sign-up',
      component: NoSidebarLayout,
      children: [
        {
          path: 'sign-up',
          name: 'sign-up',
          component: SignUpPage
        }
      ]
    }

  ]
});
