import { Machine, assign } from 'xstate'

export declare interface TrafficLightContext {
  duration: number
}

export declare interface TrafficLightSchema {
  states: {
    red: {}
    yellowFromRed: {}
    yellowFromGreen: {}
    green: {}
    greenBlinking: {}
  }
}

export declare type TrafficLightEvent = { type: 'TIMER' }

export const trafficLightMachine = Machine<
  TrafficLightContext,
  TrafficLightSchema,
  TrafficLightEvent
>({
  key: 'trafficLightMachine',
  initial: 'red',
  context: {
    duration: 10000,
  },

  states: {
    red: {
      entry: assign({ duration: () => 10000 }),
      on: {
        TIMER: 'yellowFromRed',
      },
    },
    yellowFromRed: {
      entry: assign({ duration: () => 3000 }),
      on: {
        TIMER: 'green',
      },
    },
    green: {
      entry: assign({ duration: () => 8000 }),
      on: {
        TIMER: 'greenBlinking',
      },
    },
    greenBlinking: {
      entry: assign({ duration: () => 3000 }),
      on: {
        TIMER: 'yellowFromGreen',
      },
    },
    yellowFromGreen: {
      entry: assign({ duration: () => 3000 }),
      on: {
        TIMER: 'red',
      },
    },
  },
})
