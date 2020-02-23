<template>
  <div class="rounded-full w-12 h-12 blinking" :class="classList"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class BlinkingLight extends Vue {
  @Prop({ type: String, required: true }) readonly color!:
    | 'red'
    | 'yellow'
    | 'green'
  @Prop({ type: Boolean, default: false }) readonly lit!: boolean

  get classList(): string {
    const { color, lit } = this
    let classList = `bg-${color}-500`
    if (!lit) {
      classList += ` opacity-25`
    }
    return classList
  }
}
</script>

<style>
.blinking {
  animation-duration: 0.5s;
  animation-name: animate-opacity;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}
@keyframes animate-opacity {
  from {
    opacity: 0.25;
  }
  ,
  to {
    opacity: 1;
  }
}
</style>
