import {
  configureStore,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

export interface PlayerState {
  isAudioPlaying: boolean;
  trackDuration: number;
  trackCurrentTime: number;
  isTrackEnded: boolean;
  isTrackOnRepeat: boolean;
}

const initialState = {
  isAudioPlaying: false,
  trackDuration: 0,
  trackCurrentTime: 0,
  isTrackEnded: false,
  isTrackOnRepeat: false
} as PlayerState;

export const playerStore = createSlice({
  name: "player",
  initialState,
  // for popup windows
  reducers: {
    setMusicPlayable: (state) => {
      state.isAudioPlaying = !state.isAudioPlaying;
    },
    setTrackDuration: (state, action: PayloadAction<{duration: number}>) => {
        state.trackDuration = action.payload.duration;
        console.log(state.trackDuration);
              console.log("duration:", state.trackDuration);
    },
    setTrackCurrentTime: (state, action: PayloadAction<{current: number}>) => {
      const {current} = action.payload;
      state.trackCurrentTime = current;
      console.log("current:", state.trackCurrentTime);
    },
    setIsTrackEnded: (state, action: PayloadAction<{ended: boolean}>) => {
      state.isTrackEnded = action.payload.ended;
      console.log("track ended: ", state.isTrackEnded)
    },
    setIsTrackOnRepeat: (state) => {
      state.isTrackOnRepeat = !state.isTrackOnRepeat;
    console.log("track on repeat: ", state.isTrackOnRepeat)
    }
  },
});
export const {setMusicPlayable, setTrackDuration,setTrackCurrentTime, setIsTrackEnded, setIsTrackOnRepeat} = playerStore.actions;
export const store = configureStore({
  reducer: { player: playerStore.reducer },
});

export const playerReducer = playerStore.reducer;

export type RootPlayerState = ReturnType<typeof store.getState>;
export type PlayerAppDispatch = typeof store.dispatch;
