import { createMachine, send, assign } from "xstate";

interface CounterContext {
  points: number;
  win: number;
  time: number;
  cards: number[]; // [5, 1, 3, 1, 4, 0, 5, 0, 3, 2, 2]
}

export const gameMachine = createMachine<CounterContext>({
  id: "game",
  initial: "gameover",
  context: {
    points: 0,
    win: 5, //for a 5*5 board
    time: 0,
    cards: [],
  },
  states: {
    onEnter: assign({
      cards: () => {},
    }),
    playing: {
      invoke: {
        id: "time",
        src: (context, event) => (callback, onRecieve) => {
          const id = setInterval(() => callback("TIMER"), 1000);

          return () => clearInterval(id);
        },
      },
      on: {
        GAMEOVER: "gameover",
        TIMER: [
          {
            target: "gameover",
            cond: (context) => context.points === context.win,
          },
          {
            actions: assign({
              time: (context) => context.time + 1,
            }),
          },
        ],
      },
    },
    gameover: {
      on: {
        PLAY: {
          target: "playing",
          actions: assign({
            points: (context) => 0,
          }),
        },
      },
    },
  },
});
