<template>
  <div id="app" class="flex items-center justify-center h-screen">
    <TrafficLights />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import TrafficLights from './components/TrafficLights.vue'

@Component({
  components: {
    TrafficLights,
  },
})
export default class App extends Vue {}
</script>

<style></style>
