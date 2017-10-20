<template>
  <div>
    <app-sidebar></app-sidebar>
    <div class="canvas-contents">
      <h1>CANVAS AREA</h1>
    </div>
  </div>
</template>

<script>
  import AppSidebar from '@/components/AppSidebar'

  export default {
    name: 'Canvas',
    components: {
      AppSidebar
    },
    created () {
      console.log(`Project ID : ${this.$route.params.projectId} \nDataset ID : ${this.$route.params.datasetId}`)
    }
  }
</script>

<style scoped>
  .canvas-contents {
    margin-left: 180px;
    padding: 10px;
  }
</style>
