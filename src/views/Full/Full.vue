<template>
  <div class="app">
    <h1>Test</h1>
  </div>
</template>

<script>
  import { getToken } from '@/util/auth'

  export default {
    name: 'Full',
    created () {
      if (getToken()) {
        this.$router.push('/project')
      } else {
        window.location.href = 'http://localhost:3000/login'
      }
    },
    methods: {
    }
  }
</script>

<style scoped>
</style>
