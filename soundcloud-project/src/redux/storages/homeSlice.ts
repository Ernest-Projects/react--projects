import { configureStore, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { InitialEntry } from 'react-router-dom';


type ToolsProps =  {
    isToolsOpened: boolean;
}

const initialState = {
    isToolsOpened: false
} as ToolsProps;

export const homeStore = createSlice({
    name: "home page",
    initialState,
    reducers: {
        setIsToolsOpened: (state) => {
            state.isToolsOpened  = !state.isToolsOpened;
        }
    }
})


export const {setIsToolsOpened} = homeStore.actions;
export const store = configureStore({reducer: {home_page: homeStore.reducer}})

export const homeReducer = homeStore.reducer;

export type RootHomeState = ReturnType<typeof store.getState>;
export type HomeAppDispatch = typeof store.dispatch;
