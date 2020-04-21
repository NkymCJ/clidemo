import defaultSettings from '@/settings'

const { title } = defaultSettings

const getDefaultState = () => {
  return {
    title
  }
}

const state = getDefaultState()

const getters = {}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
