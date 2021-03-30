import Vue from 'vue'
import VueRouter from 'vue-router'
import SignIn from '../views/SignIn.vue'
import SignUp from '../views/SignUp.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: SignIn },
  {
    path: '/monthly',
    name: 'MonthlyPage',
    component: () => import('../views/MonthlyPage.vue')
  },
  {
    path: '/weekly',
    name: 'WeeklyPage',
    component: () => import('../views/WeeklyPage.vue')  
  },
  {
    path: '/signin',
    name: 'SignInPage',
    component: SignIn
  },
  {
    path: '/signup',
    name: 'SignUpPage',
    component: SignUp
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
