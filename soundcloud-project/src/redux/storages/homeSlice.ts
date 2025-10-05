import {
  configureStore,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { InitialEntry } from "react-router-dom";

type SliderProps = {
  [key: string]: number;
};
type ToolsProps = {
  isToolsOpened: boolean;
  sliders: SliderProps;
};

const initialState = {
  isToolsOpened: false,
  sliders: {
    first: 0,
    second: 0,
    third: 0,
    fourth: 0,
  },
} as ToolsProps;

export const homeStore = createSlice({
  name: "home page",
  initialState,
  reducers: {
    //open/close tool button
    setIsToolsOpened: (state) => {
      state.isToolsOpened = !state.isToolsOpened;
    },

    // for sliders
    setMoveSlider: (
      state,
      action: PayloadAction<{ id: string; value: number; direction: string }>
    ) => {
      const { id, value, direction } = action.payload;
      if (direction == "right") {
        state.sliders[id] += value;
      }
      if (direction == "left") {
        state.sliders[id] -= value;
      }
    }
  },
});

export const { setIsToolsOpened, setMoveSlider } = homeStore.actions;
export const store = configureStore({
  reducer: { home_page: homeStore.reducer },
});

export const homeReducer = homeStore.reducer;

export type RootHomeState = ReturnType<typeof store.getState>;
export type HomeAppDispatch = typeof store.dispatch;
