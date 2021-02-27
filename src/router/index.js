import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/monthly',
    name: 'MonthlyPage',
    component: () => import('../views/MonthlyPage.vue')
  },
  {
    path: '/weekly',
    name: 'WeeklyPage',
    component: () => import('../views/WeeklyPage.vue')  }
]

const router = new VueRouter({
  mode: 'history',
  base: './',
  routes
})

export default router
