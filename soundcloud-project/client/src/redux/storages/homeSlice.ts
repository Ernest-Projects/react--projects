import {
  configureStore,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { InitialEntry } from "react-router-dom";

type SliderProps = {
  [key: string]: number;
};
export interface ToolsProps  {
  isToolsOpened: boolean;
  // sliders: SliderProps;
};

const initialState = {
  isToolsOpened: false,

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
  
  },
});

export const { setIsToolsOpened } = homeStore.actions;
export const store = configureStore({
  reducer: { home_page: homeStore.reducer },
});

export const homeReducer = homeStore.reducer;

export type RootHomeState = ReturnType<typeof store.getState>;
export type HomeAppDispatch = typeof store.dispatch;
