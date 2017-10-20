<template>
  <md-layout md-flex="33">
    <md-card md-with-hover @click.native="projectClicked">
      <md-card-area>
        <md-card-media>
          <img src="/static/img/desk.jpg"/>
        </md-card-media>

        <md-card-header>
          <md-card-header-text>
            <div class="md-title">{{ project.name }}</div>
            <div class="md-subhead">Created by : {{ project.owner.login }}</div>
          </md-card-header-text>

          <md-menu md-size="4" md-direction="bottom left">
            <md-button class="md-icon-button" @click.native="projectMoreButtonClicked" md-menu-trigger>
              <md-icon>more_vert</md-icon>
            </md-button>

            <md-menu-content>
              <md-menu-item>
                <span>Export</span>
                <md-icon>save</md-icon>
              </md-menu-item>

              <!--<md-menu-item>-->
                <!--<span>Send a message</span>-->
                <!--<md-icon>message</md-icon>-->
              <!--</md-menu-item>-->
            </md-menu-content>
          </md-menu>
        </md-card-header>

      </md-card-area>
    </md-card>
  </md-layout>
</template>

<script>
  export default {
    name: 'Project',
    props: ['project'],
    methods: {
      projectClicked () {
        this.$store.commit('SET_CURRENT_PROJECT', this.project)
        console.log(`projectClicked : ${this.project._id}`)
//        window.localStorage.setItem('currentProjectId', this.project._id)
        this.$router.push(`/project/${this.project._id}`)
      },
      projectMoreButtonClicked (event) {
        event.stopPropagation()
      }
    }
  }
</script>

<style scoped>
  .md-flex-33 {
    padding: 10px;
  }

  .md-card {
    cursor: pointer;
  }
</style>
