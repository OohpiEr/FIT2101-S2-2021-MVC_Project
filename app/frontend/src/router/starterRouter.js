import Vue from 'vue';
import Router from 'vue-router';
import DashboardLayout from '../layout/starter/SampleLayout.vue';
import NoSidebarLayout from '../layout/starter/NoSidebarLayout.vue';
import store from "@/store";

const Dashboard = () => import(/* webpackChunkName: "dashboard" */"@/pages/Dashboard.vue");
const AboutUs = () => import(/* webpackChunkName: "common" */ "@/pages/AboutUs.vue");
const Table = () => import(/* webpackChunkName: "common" */ "@/pages/Table.vue");
const ReportPage = () => import(/* webpackChunkName: "common" */ "@/pages/ReportPage.vue");
const Profile = () => import(/* webpackChunkName: "common" */ "@/pages/Profile.vue");
const SignUpPage = () => import(/* webpackChunkName: "unauthorized" */ "@/pages/SignUpPage.vue");
const Landing = () => import(/* webpackChunkName: "unauthorized" */ "@/pages/Landing.vue");
const LoginPage = () => import(/* webpackChunkName: "unauthorized" */ "@/pages/LoginPage.vue");
const NotFoundPage = () => import(/* webpackChunkName: "unauthorized" */ "@/pages/NotFoundPage.vue");


Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/dashboard',
      component: DashboardLayout,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          component: Dashboard
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
      name: 'SuperaccountRoutes',
      redirect: '/dashboard',
      component: DashboardLayout, 
      meta: {
        requiresSuperaccount: true
      },
      children: [
        {
          path: "report",
          name: "report",
          component: ReportPage
        },
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
  // guard for login
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!localStorage.getItem('token')) {
      next({ name: 'landing' })
    } else {
      next() // continue
    }
  } else {
    next() // continue
  }

  // guard for report page
  if (to.matched.some(record => record.meta.requiresSuperaccount)) {
    if (JSON.parse(localStorage.userdata).class !== 'superaccount') {
      next({ name: 'dashboard' })
    } else {
      next() // continue
    }
  } else {
    next() // continue
  }

})

export default router;
