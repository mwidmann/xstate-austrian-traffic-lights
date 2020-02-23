<template>
  <div class="rounded-full w-12 h-12" :class="classList"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Light extends Vue {
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
