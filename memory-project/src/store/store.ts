import { configureStore, createSlice } from "@reduxjs/toolkit";

// yea its a bit hard to understand. Redux for bigger projects so logic a little harder
const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
});
export const { increment } = counterSlice.actions;
export const store = configureStore({
  reducer: { counter: counterSlice.reducer },
});


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch