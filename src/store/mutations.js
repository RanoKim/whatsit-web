export default {
  UPDATE_PROFILE (state, profile) {
    state.profile = profile
  },
  SET_USER_ID (state, userId) {
    state.userId = userId
  },
  SET_PROJECTS: (state, { projects }) => {
    state.projects.splice(0, state.projects.length)
    projects.forEach(project => {
      if (project) {
        state.projects.push(project)
      }
    })
  },
  SET_CURRENT_PROJECT (state, project) {
    state.currentProject = project
  },
  SET_CURRENT_PROJECT_ID (state, projectId) {
    state.currentProjectId = projectId
  },
  SET_DATASETS: (state, { datasets }) => {
    state.datasets.splice(0, state.datasets.length)
    datasets.forEach(dataset => {
      if (dataset) {
        state.datasets.push(dataset)
        // console.log(dataset)
      }
    })
  }
}
