import { configureStore, createSlice, type PayloadAction } from '@reduxjs/toolkit';


export interface CounterState { 
    count: number;
}

// const initialState: CounterState ={
//     count: 0
// }
// or

const initialState = {
    count: 0
} as CounterState


export const appSlice = createSlice({
    name: "application",
    initialState,
    reducers: {
        increment: (state) => {
            state.count++
        },
        decrement: (state) => {
            state.count++;
        },
        setOwnCountValue: (state, actions: PayloadAction<number>) => {
            state.count = actions.payload
        }
    }
})


export const {increment, decrement, setOwnCountValue} = appSlice.actions;
export const store = configureStore({reducer: {application: appSlice.reducer}  
    
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
