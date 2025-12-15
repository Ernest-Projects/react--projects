





import { configureStore, createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { ThunkAction, Action } from "@reduxjs/toolkit";


import { create } from "motion/react-m";
import { homeStore } from "./homeSlice";
import { title } from "motion/react-client";

import type {TrackProps} from '../../app-types/Track'
import type {TrackTitleProps} from '../../app-types/TrackTitle'



interface GlobalProps  {
    historyOfTracks: TrackProps[],
    likedTracks: TrackProps[]
   
}
const initialState = {
        likedTracks: {},
        historyOfTracks: {},
      
} as GlobalProps;

export const globalStore = createSlice({
    name: "global_player",
    initialState,
    reducers: {

    
        // add track in history
        setAddTrackInHistory: (state,action:PayloadAction<{trackData: any}>) => {
        },

        setUpdateSelectedTrack: (state, action:PayloadAction<{id: number, data: Partial<TrackProps>}>) => {
            const index = state.likedTracks.findIndex(item => item.id = action.payload.id);
            if (index != -1) {
                state.likedTracks[index] = {...state.likedTracks[index], ...action.payload.data}
                console.log("This track which has been selected right now: ", state.likedTracks[index]);
                console.log("playable is (in likedTracks): ", state.likedTracks[index].playable)
                console.log("setted is (in likedTracks): ", state.likedTracks[index].setted)
            }
        },


        // reload all liked tracks, i mean set liked tracks (next: globalTracks and others)
        setAllLikedTracks: (state, action:PayloadAction<{likedTracksFromDb: TrackProps[]}>) => {
            state.likedTracks = action.payload.likedTracksFromDb; 
            console.log("and last action. LikedTracks: ", state.likedTracks)
            // state.likedTracks = state.likedTracks.map((item, index) => item)
            // state.likedTracks.forEach(item => {console.log("Liked tracks from db in Redux: ", item, "\n")})

        },
        setResetAllTracks: (state) => {
            // func for setting tracks data to default (playable = false , setted = false)
            const reset = (tracks: TrackProps[]) => tracks.map(item => ({...item, playable: false, setted: false}))
            state.likedTracks = reset(state.likedTracks)
            console.log("all tracks are resetted!", state.likedTracks)
        }
        // setAllTracksNotPlayable()

    }
});

export const {setAddTrackInHistory, setAllLikedTracks, setResetAllTracks, setUpdateSelectedTrack } = globalStore.actions;
export const store = configureStore({reducer: {global_player: globalStore.reducer}});
export const globalReducer  = globalStore.reducer;

// export type AppThunk = ThunkAction<void, RootState, unknown, Action>

export type RootGlobalState = ReturnType<typeof store.getState>;
export type GlobalAppDispatch = typeof store.dispatch; 

//цей slice буде містити історію прослуханих треків та вподобані треки.

// Реалізація: в library page будуть 8 кладок відповідно до кількості кнопок можливий Router.
// Сама секція вподобаних треків буде компонентом та: секція останніх прослуханих плейлистів, following секці, liked stations, albums, playlists - секції
// В вкладці Overwiew всі компо збираються, а на всіх інших - окремо використовуються відповідні компоненти. 
// кожна кнопка має свій компонент, в config буде поле component поруч полем content