


import { configureStore } from "@reduxjs/toolkit";
import {homeReducer}  from "../../../src/redux/storages/homeSlice";
import {authReducer} from "../../../src/redux/storages/authSlice";
import {RootState} from "../../../src/redux/storages/store";

import { FakeRootState } from "./FakeRootStore";
import { DeepPartial } from "./DeepPartial";
import { libraryReducer } from "../../../src/redux/storages/librarySlice";
import { navbarReducer } from "../../../src/redux/storages/navbarSlice";
import { playerReducer } from "../../../src/redux/storages/playerSlice";


// fake store for testing
export const createTestStore = (preloadedState?:  DeepPartial<FakeRootState>) => {
    return configureStore({
 
        reducer:  {
            home_page: homeReducer,
            authorization: authReducer,
            navbar: navbarReducer,
            player: playerReducer
            // library_page: libraryReducer,
        },
        preloadedState,
    })
}
