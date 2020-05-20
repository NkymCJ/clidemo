import { login, logout, getInfo } from '@/api/user'
import { isEmptyObject } from '@/utils'
import { getToken, setToken, removeToken } from '@/utils/token'
import router, { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: []
  }
}

const state = getDefaultState()

const getters = {}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // Login to get token
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username, password }).then(response => {
        const { success = false, data = {} } = response
        // get false/is empty object/no token
        if (!success || isEmptyObject(data) || !data.token) {
          reject(new Error('Login error'))
        }
        // Set store token
        // Example: ADMIN-token or VISITOR-token
        commit('SET_TOKEN', data.token)
        // Set cookie token
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // Get info by token
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { success = false, data = {} } = response
        if (!success || isEmptyObject(data)) {
          reject(new Error('Get info error'))
        }
        const { name = '', avatar = '', introduction = '', roles = ['VISITOR'] } = data
        // Do not use roles judgment temporarily
        if (roles.length <= 0) {
          throw new Error('Get info:roles error')
        }
        commit('SET_ROLES', roles)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_INTRODUCTION', introduction)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(response => {
        const { success = false } = response || {}
        if (!success) {
          reject(new Error('Logout error'))
        }
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        // Remove cookie token before reset
        removeToken()
        // Reset router
        resetRouter()

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // Remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      // Remove token before reset
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'
      // Set store token
      // Example: ADMIN-token or VISITOR-token
      commit('SET_TOKEN', token)
      // Set cookie token
      setToken(token)
      const { roles = ['VISITOR'] } = await dispatch('getInfo')
      console.log(roles)
      resetRouter()
      console.log(router)
      // Generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
      // Dynamically add accessible routes
      router.addRoutes(accessRoutes)
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
