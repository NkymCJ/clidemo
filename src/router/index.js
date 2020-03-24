import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'

Vue.use(VueRouter)

/* Layout */
import Layout from '@/layout'

const routes = [
  {
    path: '/login',
    // component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    // component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
  }
]

const router = new VueRouter({
  routes,
  scrollBehavior: () => ({ y: 0 })
})

export default router
