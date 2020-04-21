
import Vue from 'vue'
import VueRouter from 'vue-router'

/* Layout */
import Layout from '@/layout/index'

/* Router modules */
import roleRouter from './modules/role'
import configRouter from './modules/config'

Vue.use(VueRouter)

/**
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    cache: fasle                if set true, the page will be cached(default is false)
  }
 */

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import(/* webpackChunkName: "redirect" */ '@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "404" */ '@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'Home',
      component: () => import(/* webpackChunkName: "home" */ '@/views/home/index'),
      meta: { title: 'Home', cache: true }
    }]
  },
  configRouter,
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

export const asyncRoutes = [
  roleRouter
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
