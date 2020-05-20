import router from './router'
// import store from './store'
// import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/token'
import getPageTitle from '@/utils/get-page-title'

console.log('getToken', getToken)

// NProgress Configuration
NProgress.configure({ showSpinner: false })

// No redirect whitelist
const whiteList = ['/login']

router.beforeEach(async(to, from, next) => {
  // Start progress bar
  NProgress.start()

  // Set page title
  document.title = getPageTitle(to.meta.title)

  const hasToken = getToken()

  // 如果有Token，证明登录过
  if (hasToken) {
    if (to.path === '/login') {
      // 如果是去到登录页面，因为已经登录过了，那么就不用再登录了，直接去到首页
      next({ path: '/' })
      NProgress.done()
    } else {
      // // Determine whether the user has obtained his permission roles through getInfo
      // // const hasRoles = store.state.roles. && store.getters.roles.length > 0
      // const hasGetUserInfo = store.state.user.name
      // if (hasGetUserInfo) {
      //   next()
      // } else {
      //   try {
      //     // Get user info
      //     // await store.dispatch('user/getInfo')
      //     next()
      //   } catch (error) {
      //     // Remove token and go to login page to re-login
      //     // await store.dispatch('user/resetToken')
      //     Message.error(error || 'Has Error')
      //     next(`/login?redirect=${to.path}`)
      //     NProgress.done()
      //   }
      // }
    }
  } else { // 没有Token，证明没登录过
    if (whiteList.indexOf(to.path) !== -1) {
      // 如果是在白名单内的，直接去就可以了
      next()
    } else {
      // 如果不在白名单内的，则去到登录页，并记录当前要去的页面
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // Finish progress bar
  NProgress.done()
})
