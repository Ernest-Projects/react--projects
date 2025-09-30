import {configureStore} from "@reduxjs/toolkit";

// slices
import { navbarReducer } from "./navbarSlice";
import { homeReducer } from "./homeSlice";
import { playerReducer } from "./playerSlice";

export const store =  configureStore({
    reducer: {
        navbar: navbarReducer,
        home_page: homeReducer,
        player: playerReducer 
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;