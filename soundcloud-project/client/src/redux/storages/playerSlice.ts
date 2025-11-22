import {
  configureStore,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

import type{ TrackProps} from 'src/types/Track'

export interface PlayerState {
  isAudioPlaying: boolean;
  trackDuration: number;
  trackCurrentTime: number;
  isTrackEnded: boolean;
  trackRepeatId: 0 | 1 | 2 | 3 | 4;
  volumeOfTrack: number;
  trackTime: Record<string, string>;
  currentTrack: TrackProps;
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
  currentTrack: {
     id: 3,
      audio: "Get_Away_w_CNQR.mp3",
      image: "artworks-cKp9DnXYoVNyB8Ya-5Gb30w-t500x500.jpeg",
      title: {
        name: "Get Away (w/ CNQR+)",
        subtitle: "Hugeloud"
      },
      liked: true,
      setted: true,
      playable: false
  },
} as PlayerState;

export const playerStore = createSlice({
  name: "player",
  initialState,
  // for popup windows
  reducers: {
    setMusicPlayable: (state, action: PayloadAction<{playable?: boolean}>) => {
      if (typeof action.payload?.playable == "boolean") {
         state.isAudioPlaying = action.payload.playable;
      }
      else {
        state.isAudioPlaying =!state.isAudioPlaying;
      }
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
    },
    setIsTrackEnded: (state, action: PayloadAction<{ ended: boolean }>) => {
      state.isTrackEnded = action.payload.ended;
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

    setPlayerData: (state, action: PayloadAction<{ data: TrackProps }>) => {
      state.currentTrack = action.payload.data;
      console.log("when clicked on the title: ", state.currentTrack)
      console.log("setted is (in currentTrack):", state.currentTrack.setted)
      console.log("playable is (in currentTrack):", state.currentTrack.playable)

    },

    // встановити трек: встановити setted = true (встановлений в player), встановити played = true (трек грає)
    setCurrentTrackPlayablePayload: (state, action: PayloadAction<{trackId: number}>) => {
      // state.currentTrack.forEach(element => {element.

      // });
      if (state.currentTrack.id == action.payload.trackId) {
        state.currentTrack.playable = true;
        console.log("State `playable` for track ", action.payload.trackId, ": ", state.currentTrack.playable)
      }
      
      // state.headerButtons.forEach((item) => item.isSelected = item.id === action.payload.id);
    },
  
   setCurrentTrackSettedPayload: (state, action: PayloadAction<{trackId: number}>) => {
      // state.currentTrack.forEach(element => {element.
  if (state.currentTrack.id == action.payload.trackId) {
        state.currentTrack.setted = true;
      }
      // });
      // state.headerButtons.forEach((item) => item.isSelected = item.id === action.payload.id);
    }
  }
});
export const {
  setMusicPlayable,
  setTrackDuration,
  setTrackCurrentTime,
  setIsTrackEnded,
  setIsTrackOnRepeat,
  setTrackTime,
  setCurrentTrackSettedPayload,
  setPlayerData,
  setCurrentTrackPlayablePayload
} = playerStore.actions;
export const store = configureStore({
  reducer: { player: playerStore.reducer },
});

export const playerReducer = playerStore.reducer;

export type RootPlayerState = ReturnType<typeof store.getState>;
export type PlayerAppDispatch = typeof store.dispatch;
