import Vue from 'vue'

// CSS resets
import 'normalize.css/normalize.css'

// Import element
import '@/plugins/element-ui/index'

// Global css
import '@/styles/index.scss'

import App from './App.vue'
import router from './router'
import store from './store'

import './permission'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
