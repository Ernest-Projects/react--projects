import { configureStore, createSlice } from "@reduxjs/toolkit";

// yea its a bit hard to understand. Redux for bigger projects so logic may be little harder
const gameSlice = createSlice({
  name: "game",
  initialState: { value: 0, gameStartState: false, animateActive: false, quantityOfCards: 6 },
  reducers: {

    setGameStartState: (state) => {
      state.gameStartState = !state.gameStartState;
    },
    increment: (state) => {
      state.value += 1;
    },
    setAnimateActive: (state, actions) => {
      state.animateActive = actions.payload;
    },
    setQuantityOfCards: (state, actions) => {
      state.quantityOfCards = actions.payload;
    }
  },

});
export const { increment, setGameStartState, setAnimateActive, setQuantityOfCards } = gameSlice.actions;
export const store = configureStore({
  reducer: { game: gameSlice.reducer },
});


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch