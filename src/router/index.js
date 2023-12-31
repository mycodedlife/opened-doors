import { createRouter, createWebHistory } from 'vue-router';
import { supabase } from '../supabase/supabase';
import HomeView from '../views/HomeView.vue';
import RegisterView from '../views/RegisterView.vue';
import LoginView from '../views/LoginView.vue';
import PersonalView from '../views/PersonalView.vue';
import ThanksView from '../views/ThanksView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
      meta: {
        title: "Home",
        auth: true,
      }
    },
    {
      path: '/login',
      name: 'LoginView',
      component: LoginView,
      meta: {
        title: "Login",
        auth: false,
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterView,
      meta: {
        title: "Register",
        auth: false,
      }
    },
    {
      path: '/personal',
      name: 'Personal',
      component: PersonalView,
      meta: {
        title: "Personal",
        auth: true,
      }
    },
    {
      path: '/thanks',
      name: 'Thanks',
      component: ThanksView,
      meta: {
        title: "Thanks",
        auth: true,
      }
    },
  ]
})

export default router

//Route guard for each route
router.beforeEach((to, from, next) => {
  const user = supabase.auth.getUser();
  if (to.matched.some((res) =>res.meta.auth)) {
    if (user) {
      next();
      return
    }
    next({name:"Login"})
    return;
  }
  next();
  
});

