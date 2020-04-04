import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// import { getToken } from '@/utils/auth'
import getPageTitle from '@/utils/get-page-title'

// NProgress Configuration
NProgress.configure({ showSpinner: false })

// No redirect whitelist
const whiteList = ['/login']

router.beforeEach(async(to, from, next) => {
  // Start progress bar
  NProgress.start()

  // Set page title
  document.title = getPageTitle(to.meta.title)

  // const hasToken = getToken()
  const hasToken = true

  if (hasToken) {
    if (to.path === '/login') {
      // If is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      // Determine whether the user has obtained his permission roles through getInfo
      // const hasRoles = store.state.roles. && store.getters.roles.length > 0
      const hasGetUserInfo = store.state.user.name
      if (hasGetUserInfo) {
        next()
      } else {
        try {
          // Get user info
          // await store.dispatch('user/getInfo')
          next()
        } catch (error) {
          // Remove token and go to login page to re-login
          // await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    // Has no taken
    if (whiteList.indexOf(to.path) !== -1) {
      // In the free login whitelist, go directly
      next()
    } else {
      // Other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // Finish progress bar
  NProgress.done()
})
