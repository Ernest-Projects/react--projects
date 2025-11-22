import { configureStore, createSlice, type PayloadAction } from '@reduxjs/toolkit';

// for popup
interface PopupProps {
    isOpened: boolean;
    id: number
}

interface CounterState { 
    popupStates: PopupProps[];
    isInputOnFocus: boolean;
    activeButtonId: number;
}

// const initialState: CounterState ={
//     count: 0
// } 
// or
 
const initialState = {
    popupStates: [
        {id:0, isOpened: false},
        {id:1, isOpened: false},
        {id:2, isOpened: false},
        {id:3, isOpened: false}
    ],
    isInputOnFocus: false,
    activeButtonId: -1
} as CounterState;

export const navbarStore = createSlice({
    name: "navbar",
    initialState,
    // for popup windows
    reducers: {
        setOpenPopupWindow: (state, action:PayloadAction<{id: number}> ) => {
            // const popup = state.popupStates.find(i => (i.id-1) == action.payload.id);
            state.popupStates.forEach((popup) => {
                if (popup.id == action.payload.id) {
                    popup.isOpened = !popup.isOpened;
                }
                else {
                    popup.isOpened = false;
                }
            })
        },
        setCloseAllPopups: (state) => {
            state.popupStates.forEach(item => item.isOpened = false)
        },

      
        setActiveButton: (state, action) => {
            state.activeButtonId = action.payload;
        },

        // for input border animation
     
    }
})

export const {setOpenPopupWindow, setActiveButton, setCloseAllPopups} = navbarStore.actions;
export const store = configureStore({reducer: {navbar: navbarStore.reducer}})

export const navbarReducer = navbarStore.reducer;

export type RootNavbarState = ReturnType<typeof store.getState>;
export type NavbarAppDispatch = typeof store.dispatch;
