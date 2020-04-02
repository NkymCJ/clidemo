import defaultSettings from '@/settings'

const { title, fixedHeader, sidebarLogo } = defaultSettings

const getDefaultState = () => {
  return {
    title,
    fixedHeader,
    sidebarLogo
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  CHANGE_SETTING: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
}

const actions = {
  resetState({ commit }) {
    commit('RESET_STATE')
  },
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
