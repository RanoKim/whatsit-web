import {
  fetchProfile,
  updateUserProfile,
  getProjects,
  addProject,
  getDatasets,
  addDataset
} from '../api'

export default {
  fetchUserProfile: ({commit, state}, {token, provider}) => {
    return fetchProfile(token, provider)
      .then(profile => {
        console.log(`fetchProfile then in actions.js \n provider = ${provider} \n profile = ${JSON.stringify(profile)}`)
        commit('UPDATE_PROFILE', profile)
        updateUserProfile(profile)
          .then((data) => {
            console.log('UPDATE_USER_PROFILE: ' + JSON.stringify(data))
            let userId = data.data._id
            commit('SET_USER_ID', userId)
          })
      })
  },
  fetchProjects: ({commit, state}, userId) => {
    return getProjects(userId)
      .then(projects => {
        // console.log(`FETCH_PROJECTS then in actions.js \n projects = ${JSON.stringify(projects)}`)
        commit('SET_PROJECTS', { projects })
      })
  },
  addProject: ({ commit }, { options }) => {
    return addProject(options)
      .then(projects => {
        console.log('FETCH_PROJECTS then in actions.js')
      })
  },
  fetchDatasets: ({ commit }, { projectId }) => {
    return getDatasets(projectId)
      .then(datasets => {
        console.log(`FETCH_DATASETS then in actions.js`)
        commit('SET_DATASETS', { datasets })
      })
  },
  addDataset: ({ commit }, { options }) => {
    return addDataset(options)
      .then(data => {
        console.log('ADD_DATASET then in actions.js')
      })
  }
}
