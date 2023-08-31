import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    props: true
  },
  {
    path: '/clabe',
    name: 'clabe',
    component: () => import('@/views/Clabe'),
    props: true
  },
  {
    path: '/success',
    name: 'success',
    component: () => import('@/views/Success'),
    props: true
  },
  {
    path: '/expire',
    name: 'expire',
    component: () => import('@/views/expire'),
    props: true
  },
  {
    path: '/cash',
    name: 'cash',
    component: () => import('@/views/Cash'),
    props: true
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
