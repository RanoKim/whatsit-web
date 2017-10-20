export default {
  projects: state => {
    return state.projects.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0)
  },
  datasets: state => {
    return state.datasets.sort(
      function (a, b) {
        if (a['type'] !== b['type']) {
          if (a['type'] < b['type']) {
            return -1
          } else {
            return 1
          }
        } else {
          if (a.name < b.name) {
            return -1
          }
          if (a.name > b.name) {
            return 1
          } else {
            return 0
          }
        }
      }
    )
  }
}
