/* Layout */
import Layout from '@/layout'

const configRouter = {
  path: '/config',
  component: Layout,
  redirect: '/config/index',
  name: 'Config',
  meta: {
    title: 'Config'
  },
  children: [
    {
      path: 'index',
      component: () => import(/* webpackChunkName: "configIndex" */ '@/views/config/index'),
      name: 'ConfigIndex',
      meta: { title: 'Config', cache: true }
    }
  ]
}
export default configRouter
