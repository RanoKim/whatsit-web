<template>
  <aside class="menu app-sidebar">
    <p class="menu-label">Menu</p>
    <!--<ul class="menu-list">-->
      <!--<li v-for="(item, index) in menus">-->
        <!--<router-link :to="item.path" :exact="true">-->
          <!--{{ item.meta.label }}-->
        <!--</router-link>-->
      <!--</li>-->
    <!--</ul>-->
  </aside>
</template>

<script>
  export default {
    name: 'AppSidebar'
  }
</script>

<style scoped>
  .app-sidebar {
    position: fixed;
    top: 52px;
    left: 0;
    botton: 0;
    padding: 20px 0 50px;
    width: 180px;
    height: 100vh;
    z-index: 1023;
    background-color: darkgray;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.9);
    overflow-y: auto;
  }

  .app-sidebar > .menu-label {
    padding-left: 10px;
  }
</style>
