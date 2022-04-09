import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '../views/IndexView.vue'
import LoginView from '../views/LoginView.vue'
import HomeView from '../views/HomeView.vue'
import DefaultView from '../views/DefaultView.vue'
import TestingCssView from '../views/TestingCssView.vue'

import app from '../firebase'

import { getAuth, onAuthStateChanged } from "firebase/auth";

const routes = [
  {
    path: '/index',
    name: 'Index',
    component: IndexView,
    meta: {requiresAuth:true}
  },
  {
    path: '/',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/g/:gameid',
    name: 'Home',
    component: HomeView,
    meta: {requiresAuth:true}
  },
  {
    path: '/maqueta',
    name: 'TestingCss',
    component: TestingCssView
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: DefaultView,
    meta: {requiresAuth:false}
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const rutaAuth = to.matched.some((record) => record.meta.requiresAuth);
  const auth = getAuth(app);
  var user = null;
  onAuthStateChanged(auth, (u) => {
    user = u;
    if(rutaAuth && user==null) {
      next({name:'Login'});
    } else {
      next();
    }
  });
});

export default router;
