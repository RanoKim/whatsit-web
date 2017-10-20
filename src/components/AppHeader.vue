<template>
  <div>
    <template v-if="isLoaded">
      <md-toolbar class="md-dense" id="toolbar">
        <md-button class="md-icon-button" @click.native="logoClicked" style="color: white">
          <md-icon>home</md-icon>
        </md-button>

        <h2 class="md-title" style="flex: 1">
          WHATSIT
        </h2>

        <template v-if="profile">
          <md-menu md-direction="bottom left">

            <md-button md-menu-trigger>
              <md-avatar class="md-medium">
                <img :src="profile.avatarUrl" alt="">
              </md-avatar>
              <span>&nbsp;&nbsp;{{ this.profile.login }}</span>
            </md-button>

            <md-menu-content>
              <md-menu-item @click.native="logout">Logout</md-menu-item>
            </md-menu-content>

          </md-menu>
        </template>
      </md-toolbar>
    </template>
  </div>
</template>

<script>
  import { getToken, getProvider, clearToken } from '@/util/auth'
  import { mapState } from 'vuex'

  export default {
    name: 'AppHeader',
    computed: mapState(['profile']),
    data () {
      return {
        isLoaded: false
      }
    },
    beforeCreate () {
      console.log('beforeCreated Header.vue')
      this.$store.watch((state) => state.profile, (newVal, oldVal) => {
        console.log(this.profile)
        if (newVal === null) {
          window.location.href = 'http://localhost:3000/login'
        }
      })
    },
    created () {
      this.$store.dispatch('fetchUserProfile', {
        token: getToken(),
        provider: getProvider()
      }).then(() => {
        // this.$router.replace('/dashboard')
        this.isLoaded = true
      })
    },
    methods: {
      logout () {
        clearToken()
        this.$store.commit('UPDATE_PROFILE', null)
      },
      logoClicked () {
        this.$router.push('/project')
      }
    }
  }
</script>

<style scoped>
  .md-title {
    cursor: pointer;
  }

  /*.md-icon-button {*/
  /*cursor: default;*/
  /*}*/
</style>
