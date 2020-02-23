<template>
  <div
    class="border rounded border-black w-16 h-48 flex flex-col items-center justify-between p-4"
  >
    <Light color="red" :lit="current.matches('red')"></Light>
    <Light
      color="yellow"
      :lit="
        current.matches('yellowFromRed') || current.matches('yellowFromGreen')
      "
    ></Light>
    <BlinkingLight
      color="green"
      :lit="true"
      v-if="current.matches('greenBlinking')"
    ></BlinkingLight>
    <Light color="green" :lit="current.matches('green')" v-else></Light>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { interpret, State } from 'xstate'
import Light from './Light.vue'
import BlinkingLight from './BlinkingLight.vue'

import {
  trafficLightMachine,
  TrafficLightEvent,
  TrafficLightContext,
  TrafficLightSchema,
} from '../statemachine/TrafficLights'

@Component({
  components: {
    Light,
    BlinkingLight,
  },
})
export default class TrafficLights extends Vue {
  private service = interpret(trafficLightMachine)
  private current = trafficLightMachine.initialState

  @Watch('current')
  onCurrentChanged(
    val: State<
      TrafficLightContext,
      TrafficLightEvent,
      TrafficLightSchema
    > /*, _oldVal: any*/
  ): void {
    console.log(val.value, val.context.duration, val)
    setTimeout(() => {
      this.send({ type: 'TIMER' })
    }, val.context.duration)
  }

  created(): void {
    this.service
      .onTransition((state) => {
        this.current = state
      })
      .start()
  }

  send(event: TrafficLightEvent): void {
    this.service.send(event)
  }
}
</script>
