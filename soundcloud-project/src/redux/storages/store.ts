import {configureStore} from "@reduxjs/toolkit";
import { navbarReducer } from "./navbarSlice";
import { homeReducer } from "./homeSlice";


export const store =  configureStore({
    reducer: {
        navbar: navbarReducer,
        home_page: homeReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;