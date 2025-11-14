





import { configureStore, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { create } from "motion/react-m";
import { homeStore } from "./homeSlice";
import { title } from "motion/react-client";

type ButtsProps = {
    id: number,
    isSelected: boolean
}
type TrackTitleProps = {
    type: string
    image: string,
    title: {
        header: string,
        subtitle: string
    }
}

interface TrackProps  {
 id: number,
  audio: string,
    image: string,
    title: {
        name: string,
        subtitle: string
    },
    liked: boolean,
    setted: boolean,
    playable:boolean
}

interface LibraryProps  {
    headerButtons: ButtsProps[],
    historyOfTracks: TrackTitleProps[],
    likedTracks: TrackProps[]

}
const initialState = {
    headerButtons: Array.from({length:  7}, (_, i) => ({id: i, isSelected: i == 1? true : false}))

} as LibraryProps;

export const libraryStore = createSlice({
    name: "library_page",
    initialState,
    reducers: {
        setSelectButton: (state, action: PayloadAction<{id: number}>) =>  {
            const button = state.headerButtons.find((item) => item.id == action.payload.id);
            
            if (button) {
                button.isSelected = true;
                state.headerButtons.forEach((item) => item.isSelected = item.id === action.payload.id);
            }
        },
        // add track in history
        setAddTrackInHistory: (state,action:PayloadAction<{trackData: any}>) => {
        },


        // setAllLikedTracks: (state, action:PayloadAction<{likedTracksFromDb: TrackProps[]}>) => {
            // state.likedTracks = action.payload.likedTracksFromDb; 
            // state.likedTracks = state.likedTracks.map((item, index) => item)

        // }/


    }
});

export const {setSelectButton,setAddTrackInHistory} = libraryStore.actions;
export const store = configureStore({reducer: {library_page: libraryStore.reducer}});
export const libraryReducer = homeStore.reducer;


export type RootLibraryState = ReturnType<typeof store.getState>;
export type LibraryAppDispatch = typeof store.dispatch;

//цей slice буде містити історію прослуханих треків та вподобані треки.

// Реалізація: в library page будуть 8 кладок відповідно до кількості кнопок можливий Router.
// Сама секція вподобаних треків буде компонентом та: секція останніх прослуханих плейлистів, following секці, liked stations, albums, playlists - секції
// В вкладці Overwiew всі компо збираються, а на всіх інших - окремо використовуються відповідні компоненти. 
// кожна кнопка має свій компонент, в config буде поле component поруч полем content