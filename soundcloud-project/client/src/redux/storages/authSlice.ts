
import { configureStore, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {GoogleLoginResponceProps} from "./../../types/GoogleLoginResponce";

type UserEmail = string;
type UserPassword = string;
type UserDisplayName = string;
type UserAge = number;
type UserGender = string;


interface AuthorzationPpops  {
    isUserLogged: boolean

    // for UI (maybe not the best solution) 
    authorizationWindowId: number, 
    isAuthorizationWindowOpened: boolean

    // user data
    userEmail: UserEmail;
    userPassword: UserPassword;
    userDisplayName: UserDisplayName;
    userAge: UserAge;
    userGender: UserGender;


    // data that will come from Google OAuth 2.0 login
    userGoogleData: GoogleLoginResponceProps | null; 

}
const initialState =  {
        // user logged/unlogged boolean state
        isUserLogged: false,

        // for authorization windows
        authorizationWindowId: 1,
        isAuthorizationWindowOpened: false,
        
        // 
        userEmail: "",
        userPassword: "",
        userDisplayName: "",
        userAge: 0,
        userGender: "",

        // data that will come from Google OAuth 2.0 login
        userGoogleData: null


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

        setClearAuthorizationData :(state) => {
            state.isAuthorizationWindowOpened = false;
            
            state.userEmail = "";
            state.userPassword = "";

            state.authorizationWindowId = 1;
        },

        // what exacly window open
        setAuthorizationWindowId: (state, action: PayloadAction<{windowId: number}>) => {
            state.authorizationWindowId = action.payload.windowId;
        },



        // set all necessery data about user
        setUserPassword: (state, action: PayloadAction<{password: UserPassword}>) => {
            state.userPassword = action.payload.password;
        },
          setUserEmail: (state, action: PayloadAction<{email: UserEmail}>) => {
            state.userEmail = action.payload.email;
        },
        // 
        setUserDisplayName: (state, action: PayloadAction<{displayName: UserDisplayName}>) =>{
            state.userDisplayName = action.payload.displayName;
        },
        setUserAge: (state, action: PayloadAction<{age: UserAge}>) => {
            state.userAge = action.payload.age;
        }, 
        setUserGender: (state, action: PayloadAction<{gender: UserGender}>) => {
            state.userGender = action.payload.gender;
        }
    }
});

export const {setIsUserLogged, setIsUserLoggedValue, setAuthorizationWindowId, setUserPassword, setUserEmail, setUserDisplayName, setUserAge,setUserGender, setIsAuthorizationWindowOpened, setClearAuthorizationData} = authStore.actions;
export const store = configureStore({reducer: {authorization: authStore.reducer}});
export const authReducer  = authStore.reducer;

export type RootAuhtState = ReturnType<typeof store.getState>;
export type AuthAppDispatch = typeof store.dispatch; 

