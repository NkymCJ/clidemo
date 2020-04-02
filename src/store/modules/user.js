import { login, logout, getInfo } from '@/api/user'
import { isEmptyObject } from '@/utils'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

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

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
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
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { success = false, data = {} } = response
        // Login error or no token
        if (!success || isEmptyObject(data) || !data.token) {
          reject(new Error('Login error'))
        }
        // Set store token
        commit('SET_TOKEN', data.token)
        // Set cookie token
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      // Get info by token
      getInfo(state.token).then(response => {
        const { success = false, data = {} } = response
        if (!success || isEmptyObject(data)) {
          reject(new Error('Get info error'))
        }
        const { name = '', avatar = '', introduction = '', roles = [] } = data
        // Do not use roles judgment temporarily
        // if (!roles || roles.length <= 0) {
        //   throw new Error('Get info:roles error')
        // }
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
        const { success = false } = response
        if (!success) {
          reject(new Error('Logout error'))
        }
        // Remove token before reset
        removeToken()
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // Remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      // Remove token before reset
      removeToken()
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
