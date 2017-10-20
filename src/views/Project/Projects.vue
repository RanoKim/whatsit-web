<template>
  <div id="projects" v-if="isLoaded">
    <h1>Project List</h1>

    <md-layout md-gutter>

      <md-layout md-flex="33">
        <md-card md-with-hover @click.native="addProject" style="flex: 1; color: gray;">
          <div class="card-center">
            <span><md-icon class="md-size-4x">add</md-icon></span>
          </div>
        </md-card>
      </md-layout>

      <project v-for="project in projects" :key="project._id" :project="project"
               class="projects-list"></project>
    </md-layout>

  </div>
</template>

<script>
  import {mapState, mapGetters} from 'vuex'
  import Project from '@/views/Project/Project'

  export default {
    name: 'Projects',
    components: {
      Project
    },
    computed: {
      ...mapState(['userId']),
      ...mapGetters(['projects'])
    },
    data () {
      return {
        isLoaded: false
      }
    },
    beforeCreate () {
      console.log('beforeCreate: Projects.vue')
    },
    created () {
      console.log('created: Projects.vue')
      if (this.userId) {
        this.isLoaded = true
        this.fetchProjects(this.$store.state.userId)
      }
      this.$store.watch((state) => state.userId, (newVal, oldVal) => {
        if (newVal) {
          this.isLoaded = true
          this.fetchProjects(this.userId)
        }
      })
    },
    methods: {
      addProject () {
        this.$router.push('/project/add')
      },
      fetchProjects (userId) {
        this.$store.dispatch('fetchProjects', userId)
      }
    }
  }
</script>

<style scoped>
  #projects {
    padding: 20px;
    margin: auto;
    width: 60vw;
  }

  h1 {
    color: gray;
  }

  .md-flex-33 {
    padding: 10px;
  }

  .card-center span {
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }

</style>
