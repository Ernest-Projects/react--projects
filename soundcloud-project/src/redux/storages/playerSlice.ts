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
  trackRepeatId: 0 | 1 | 2 | 3 | 4;
  volumeOfTrack: number;
  trackTime: Record<string, string>;
}

const initialState = {
  isAudioPlaying: false,
  trackDuration: 0,
  trackCurrentTime: 0,
  volumeOfTrack: 50,
  isTrackEnded: false,
  trackRepeatId: 1,
  trackTime: {
    trackTimeForward: "",
    trackTimeBack: "",
  },
} as PlayerState;

export const playerStore = createSlice({
  name: "player",
  initialState,
  // for popup windows
  reducers: {
    setMusicPlayable: (state) => {
      state.isAudioPlaying = !state.isAudioPlaying;
    },
    setTrackDuration: (state, action: PayloadAction<{ duration: number }>) => {
      state.trackDuration = action.payload.duration;
      console.log(state.trackDuration);
      console.log("duration:", state.trackDuration);
    },
    setTrackCurrentTime: (
      state,
      action: PayloadAction<{ current: number }>
    ) => {
      state.trackCurrentTime = action.payload.current;
      console.log("current:", state.trackCurrentTime);
    },
    setIsTrackEnded: (state, action: PayloadAction<{ ended: boolean }>) => {
      state.isTrackEnded = action.payload.ended;
      console.log("track ended: ", state.isTrackEnded);
    },
    setIsTrackOnRepeat: (state) => {
      state.trackRepeatId += 1;
      if (state.trackRepeatId == 4) {
        state.trackRepeatId = 0;
      }
      if (state.trackRepeatId == 0) {
        state.trackRepeatId = 1;
      }

      console.log("track on repeat: ", state.trackRepeatId);
    },
    setTrackTime: (state) => {
      // let seconds
      // forward
      let seconds = Math.floor(state.trackCurrentTime % 60);
      let minutes = Math.floor(state.trackCurrentTime / 60);

      let secStr = seconds < 10 ? `0${seconds}` : `${seconds}`;
      state.trackTime[0] = `${minutes}:${secStr}`;

      // back
      let timeTrackBack = state.trackDuration - state.trackCurrentTime;
      let allMinutes = Math.floor(timeTrackBack / 60);
      let allSeconds = Math.floor(timeTrackBack % 60);


      let allSecStr = allSeconds < 10 ? `0${allSeconds}` : `${allSeconds}`;
      state.trackTime[1] = `${allMinutes}:${allSecStr}`;

      if (state.isTrackEnded) {
        state.trackTime[0] = "0:00";
        state.trackTime[1] = `${allMinutes}:${allSecStr}`;
      }
    },
  },
});
export const {
  setMusicPlayable,
  setTrackDuration,
  setTrackCurrentTime,
  setIsTrackEnded,
  setIsTrackOnRepeat,
  setTrackTime,
} = playerStore.actions;
export const store = configureStore({
  reducer: { player: playerStore.reducer },
});

export const playerReducer = playerStore.reducer;

export type RootPlayerState = ReturnType<typeof store.getState>;
export type PlayerAppDispatch = typeof store.dispatch;
