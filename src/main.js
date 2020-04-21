import Vue from 'vue'

// CSS resets
import 'normalize.css/normalize.css'

// Import element
import '@/plugins/element-ui/index'

// Global css
import '@/styles/index.scss'

import App from './App.vue'
import store from './store'
import router from './router'

import './permission'

import * as filters from './filters'

// 注册全局的过滤
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
