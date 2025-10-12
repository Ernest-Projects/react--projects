import {configureStore} from "@reduxjs/toolkit";

// slices
import { navbarReducer } from "./navbarSlice";
import { homeReducer } from "./homeSlice";
import { playerReducer } from "./playerSlice";
import { libraryReducer } from "./librarySlice";

export const store =  configureStore({
    reducer: {
        // static
        navbar: navbarReducer,
        player: playerReducer,

        // ------
        
        // pages
        home_page: homeReducer,
        library_page: libraryReducer,
        // ------

    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;