import {configureStore} from "@reduxjs/toolkit";

// slices
import { navbarReducer } from "./navbarSlice";
import { homeReducer } from "./homeSlice";
import { playerReducer } from "./playerSlice";
import { libraryReducer } from "./librarySlice";
import { globalReducer } from "./globalSlice";
import { authReducer } from "./authSlice";

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

        // global
        global_player:globalReducer,

        // authorization
        authorization: authReducer
    },
});
export type storeApp = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = import("@reduxjs/toolkit").ThunkAction<ReturnType, RootState, undefined, import("redux").AnyAction>;