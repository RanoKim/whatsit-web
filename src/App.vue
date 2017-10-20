<template>
  <div id="app" class="page-content">
    <div id="header">
      <app-header></app-header>
    </div>

    <div id="contents">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import AppHeader from '@/components/AppHeader'

  export default {
    name: 'app',
    components: {
      AppHeader
    }
  }
</script>

<style>
  #app {
    width: 100vw; /* 브라우저 너비의 100% */
    height: 100vh; /* 브라우저 높이의 100% */
    background-color: #0c3b58;
    overflow-y: auto;
  }

  #header {
    position: sticky;
    top: 0;
    z-index: 1000;
  }
/*#app {*/
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
/*}*/
</style>
