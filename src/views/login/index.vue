<template>
  <div class="login">
    {{ name }}
    <el-button :loading="loading" type="primary" @click="handleLogin">Login</el-button>
  </div>
</template>

<script>
import { setToken } from '@/utils/token'

import { validLowerCase, validUpperCase } from '@/utils/validate'

console.log('validLowerCase', validLowerCase)
console.log('validUpperCase', validUpperCase)

export default {
  name: 'Login',
  data() {
    return {
      name: '登录',
      loading: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  methods: {
    handleLogin() {
      this.loading = true
      setToken('PASS')
      this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
      this.loading = false
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  }
}
</script>

<style lang="scss" scoped>
  .login {}
</style>
