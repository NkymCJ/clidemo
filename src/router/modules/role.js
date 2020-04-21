/* Layout */
import Layout from '@/layout'

const roleRouter = {
  path: '/role',
  component: Layout,
  redirect: '/role/index',
  name: 'Role',
  meta: {
    title: 'Role'
  },
  children: [
    {
      path: 'index',
      component: () => import(/* webpackChunkName: "role" */ '@/views/role/index'),
      name: 'RoleIndex',
      meta: {
        title: 'Role',
        roles: ['VISITOR', 'ADMIN'],
        cache: true
      }
    }
  ]
}

export default roleRouter
