
import { configureStore, createSlice, type PayloadAction } from "@reduxjs/toolkit";


type UserEmail = string;
type UserPassword = string;
type UniqueId = number;

interface AuthorzationPpops  {
    isUserLogged: boolean

    // 
    authorizationWindowId: UniqueId,
    isAuthorizationWindowOpened: boolean

    // 
    userEmail: UserEmail;
    userPassword: UserPassword;

}
const initialState =  {
        // user
        isUserLogged: false,

        // for authorization windows
        authorizationWindowId: 1,
        isAuthorizationWindowOpened: false,
        // 
        userEmail: "",
        userPassword: ""

} as AuthorzationPpops;

export const authStore = createSlice({
    name: "authorization",
    initialState,
    reducers: {

        // for user authorization
        setIsUserLogged: (state) => {
            state.isUserLogged = !state.isUserLogged
        },
        // for user login and logout guarantee
        setIsUserLoggedValue: (state, action: PayloadAction<{logged: boolean}>) => {
            state.isUserLogged = action.payload.logged;
        },

        // if authorization window opened
        setIsAuthorizationWindowOpened: (state, action: PayloadAction<{opened:boolean}>) => {
            state.isAuthorizationWindowOpened = action.payload.opened;
        },
        // what exacly window open
        setAuthorizationWindowId: (state, action: PayloadAction<{windowId: UniqueId}>) => {
            state.authorizationWindowId = action.payload.windowId;
        },



        // 
        setUserPassword: (state, action: PayloadAction<{password: UserEmail}>) => {
            state.userPassword = action.payload.password;
        },
          setUserEmail: (state, action: PayloadAction<{email: UserPassword}>) => {
            state.userEmail = action.payload.email;
        },

    }
});

export const {setIsUserLogged, setIsUserLoggedValue, setAuthorizationWindowId, setUserPassword, setUserEmail, setIsAuthorizationWindowOpened} = authStore.actions;
export const store = configureStore({reducer: {authorization: authStore.reducer}});
export const authReducer  = authStore.reducer;

export type RootAuhtState = ReturnType<typeof store.getState>;
export type AuthAppDispatch = typeof store.dispatch; 

