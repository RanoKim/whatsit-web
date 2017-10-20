<template>
  <md-button class="md-raised md-primary" @click="onClickLogin">
    Login with Github
  </md-button>
</template>

<script>
  export default {
    name: 'Login',
    methods: {
      onClickLogin () {
        console.log('login btn clicked')
      }
    }
  }
</script>

<style scoped>

</style>
