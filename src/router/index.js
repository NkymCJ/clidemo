
import Vue from 'vue'
import VueRouter from 'vue-router'

/* Layout */
import Layout from '@/layout'

Vue.use(VueRouter)

export const constantRoutes = [
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/Login'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "404" */ '@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout
  },
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new VueRouter({
  // Require service support
  // mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  // Reset router
  router.matcher = newRouter.matcher
}

export default router
