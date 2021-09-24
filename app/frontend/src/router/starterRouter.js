import Vue from 'vue';
import Router from 'vue-router';
import DashboardLayout from '../layout/starter/SampleLayout.vue';
import NoSidebarLayout from '../layout/starter/NoSidebarLayout.vue';
import store from "@/store";

const Dashboard = () => import(/* webpackChunkName: "dashboard" */"@/pages/Dashboard.vue");
const AboutUs = () => import(/* webpackChunkName: "common" */ "@/pages/AboutUs.vue");
const Analysis = () => import(/* webpackChunkName: "common" */ "@/pages/Analysis.vue");
const Table = () => import(/* webpackChunkName: "common" */ "@/pages/Table.vue");
const Profile = () => import(/* webpackChunkName: "common" */ "@/pages/Profile.vue");
const SignUpPage = () => import(/* webpackChunkName: "common" */ "@/pages/SignUpPage.vue");
const Landing = () => import(/* webpackChunkName: "common" */ "@/pages/Landing.vue");
const LoginPage = () => import(/* webpackChunkName: "common" */ "@/pages/LoginPage.vue");
const NotFoundPage = () => import(/* webpackChunkName: "common" */ "@/pages/NotFoundPage.vue");


Vue.use(Router);

const router =  new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/dashboard',
      component: DashboardLayout,
      meta:{
        requiresAuth: true
      },
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
        },
        {
          path: "profile",
          name: "profile",
          component: Profile
        }
      ]
    },
    {
      path: '/',
      name: 'notLoggedIn',
      redirect: '/landing',
      component: NoSidebarLayout,
      children: [
        {
          path: 'sign-up',
          name: 'sign-up',
          component: SignUpPage
        },
        {
          path: "landing",
          name: "landing",
          component: Landing
        },
        {
          path: 'login',
          name: 'login',
          component: LoginPage
        }
      ]
    },
    {
      path: '/404',
      alias: "*",
      name: 'notFound',
      component: NotFoundPage,
    },


  ]
});

router.beforeEach((to, from, next) => {
  console.log(typeof(store.token))
  if (to.matched.some(record => record.meta.requiresAuth)){
    if (!store.token) {
      next({ name: 'landing' })
    } else {
      next() // continue
    }
  } else {
    next() // continue
  }
})

export default router;
