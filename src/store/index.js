import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

const state = {
  profile: {},
  userId: null,
  projects: [],
  currentProject: {},
  currentProjectId: null,
  datasets: [],
  currentDataset: {},
  currentDatasetId: null
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
