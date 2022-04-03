import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '../views/IndexView.vue'
import HomeView from '../views/HomeView.vue'
import TestingCssView from '../views/TestingCssView.vue'

const routes = [
  {
    path: '/',
    name: 'IndexView',
    component: IndexView
  },
  {
    path: '/g/:gameid',
    name: 'HomeView',
    component: HomeView
  },
  {
    path: '/maqueta',
    name: 'TestingCssView',
    component: TestingCssView
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
