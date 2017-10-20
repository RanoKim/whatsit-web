<template>
  <div id="datasets" v-if="isLoaded">
    <h1>{{ currentProject.name }} / Dataset List</h1>

    <md-layout md-gutter>
      <md-layout md-flex="100" id="add-dataset-card">
        <md-card md-with-hover @click.native="addDataset" style="flex: 1; color: gray;">
          <div class="card-center">
            <span><md-icon class="md-size-2x">add</md-icon></span>
          </div>
        </md-card>
      </md-layout>

      <dataset v-for="dataset in datasets" :key="dataset._id" :dataset="dataset"></dataset>

    </md-layout>
  </div>
</template>

<script>
  import {mapState, mapGetters} from 'vuex'
  import Dataset from './Dataset.vue'

  export default {
    name: 'Datasets',
    components: {
      Dataset
    },
    computed: {
      ...mapState(['userId', 'currentProject', 'currentProjectId']),
      ...mapGetters(['datasets'])
    },
    data () {
      return {
        isLoaded: false
      }
    },
    created () {
      this.$store.watch((state) => state.userId, (newVal, oldVal) => {
        if (newVal) {
          this.isLoaded = true
          this.setCurrentProjectId(this.$route.params.projectId)
          this.fetchDatasets()
        }
      })

      console.log(`Dataset.vue created ${this.userId}`)

      if (this.userId) {
        this.isLoaded = true
        this.setCurrentProjectId(this.$route.params.projectId)
        this.fetchDatasets()
      }
    },
//    beforeDestroy () {
//      console.log(`beforeDestroy: Dataset.vue`)
//      // set currentProjectId state to NULL
//      this.$store.commit('SET_CURRENT_PROJECT_ID', null)
//    },
    methods: {
      setCurrentProjectId (projectId) {
        console.log(`Project ID : ${projectId}`)
        // set currentProjectId state
        this.$store.commit('SET_CURRENT_PROJECT_ID', projectId)
      },
      fetchDatasets () {
        if (this.currentProjectId) {
          console.log('fetchDatasets')
          this.$store.dispatch('fetchDatasets', {
            projectId: this.currentProjectId
          }).then(() => {
            console.log('done fetchDatasets in Datasets.vue')
//            this.requestFetchProjectLabels()
          })
        }
      },
      addDataset () {
        this.$router.push(`/project/${this.currentProjectId}/dataset/add`)
      }
    }
  }
</script>

<style scoped>
  #datasets {
    padding: 20px;
    margin: auto;
    width: 60vw;
  }

  h1 {
    color: gray;
  }

  .md-flex-100 {
    padding: 10px;
  }

  #add-dataset-card {
    margin-top: 10px;
    margin-bottom: 20px;
  }

  .card-center {
    text-align: center;
  }

  /*.card-center span {*/
    /*margin: 0;*/
    /*position: absolute;*/
    /*top: 50%;*/
    /*left: 50%;*/
    /*-ms-transform: translate(-50%, -50%);*/
    /*transform: translate(-50%, -50%);*/
  /*}*/
</style>
