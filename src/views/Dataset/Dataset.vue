<template>
  <md-layout md-flex="100">
    <md-card md-with-hover @click.native="datasetClicked" style="flex: 1">
      <md-card-area>
        <md-card-header>
          <md-card-header-text>
            <div class="md-title" v-if="dataset.name">{{ dataset.name }}</div>
            <div class="md-title" v-else>No name</div>
            <div class="md-subhead">Type : {{ dataset.type }}</div>
          </md-card-header-text>
        </md-card-header>
      </md-card-area>
    </md-card>
  </md-layout>
</template>

<script>
  export default {
    name: 'Dataset',
    props: ['dataset'],
    methods: {
      datasetClicked () {
        this.$router.push(`/canvas/${this.$store.state.currentProjectId}/${this.dataset._id}`)
      }
    }
  }
</script>

<style scoped>
  .md-flex-100 {
    padding: 10px;
  }
</style>
