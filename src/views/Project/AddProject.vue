<template>
  <div id="add-project">

      <md-whiteframe md-elevation="4">
        <md-toolbar class="md-transparent">
          <h2 class="md-title" style="flex: 1">Create New Project</h2>
        </md-toolbar>

        <hr/>

        <div class="add-project-input-container">
          <md-input-container>
            <label>Please enter the new project name.</label>
            <md-input v-model="projectName" placeholder="A new project name"></md-input>
          </md-input-container>
        </div>

        <br>
      </md-whiteframe>

      <div style="float: right">
        <md-button class="md-raised" @click.native="cancelClicked">Cancel</md-button>
        <md-button class="md-raised md-primary" @click.native="createProject">Create</md-button>
      </div>

  </div>
</template>

<script>
  export default {
    name: 'AddProject',
    data () {
      return {
        projectName: ''
      }
    },
    methods: {
      cancelClicked () {
        this.$router.push('/project/list')
      },
      createProject () {
        console.log('createProject')
        if (this.projectName.trim() === '') {
          alert('Please enter the project name.')
          return
        }
        this.requestAddProject()
      },
      requestAddProject () {
        const options = {
          name: this.projectName,
          userId: this.$store.state.userId,
          thumbnail: '/static/img/desk.jpg'
        }

        this.$store.dispatch('addProject', {
          options: options
        }).then(() => {
          console.log('done ADD_PROJECT in createProject.vue')
          this.$router.replace('/project/list')
        })
      }
    }
  }
</script>

<style scoped>
  #add-project {
    margin: 0;
    position: absolute;
    width: 50vw;
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }

  .md-whiteframe {
    background-color: white;
  }

  .add-project-input-container {
    padding-left: 20px;
    padding-right: 20px;
  }
</style>
