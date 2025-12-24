
import { configureStore, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {GoogleLoginResponceProps, UserLoginDataProps, UserInputDataProps, Provider} from "../../app-types/loginTypes";
import type { AuthFieldType, ValidationErrorsProps } from "@app-types/errorTypes";

type UserEmail = string;
type UserPassword = string;
type UserDisplayName = string;
type UserAge = number;
type UserGender = "male" | "female";
type ProviderType = "local" | "google" | null;

interface AuthorizationErrorsProps  {
    userEmail: string | null;
    userPassword: string | null;
    userDisplayName: string | null;
    userAge: string | null;
}

export interface AuthorzationProps  {
    isUserLogged: boolean

    // for UI (maybe not the best solution) 
    authorizationWindowId: number, 
    isAuthorizationWindowOpened: boolean,

    provider: Provider,


    // VALIDATION ERRORS
    validationErrors:  AuthorizationErrorsProps;


    // data that will come from Google OAuth 2.0 login
    userGoogleData: GoogleLoginResponceProps | null; 

    // data, if user want to enter by self
    // userInputData: UserLoginDataProps | null;

    userInputData: UserInputDataProps;

}
const initialState =  {
        // user logged/unlogged boolean state
        isUserLogged: false,

        // for authorization windows
        authorizationWindowId: 1,
        isAuthorizationWindowOpened: false,
        

        validationErrors: {userEmail: "", userPassword: "", userDisplayName: "", userAge: ""},

        provider: null,

        // data that will come from Google OAuth 2.0 login
        userGoogleData: null,


        // data, if user want to enter by himself
        // email, password, display name, age, gender
        // userInputData: null

        userInputData: {userEmail: "", userPassword: "", userDisplayName: "", userAge: null, userGender: null, provider: null}

} as AuthorzationProps;

export const authStore = createSlice({
    name: "authorization",
    initialState,
    reducers: {


        // ----------------------------------------------------
        // login state

        // set quarantee user authorization value 
        setIsUserLoggedValue: (state, action: PayloadAction<{logged: boolean}>) => {
            state.isUserLogged = action.payload.logged;
        },
        // for user authorization
        setIsUserLogged: (state) => {
            state.isUserLogged = true;
            state.isAuthorizationWindowOpened = false;
        },

        // ----------------------------------------------------

   
        // WINDOWS
        // if authorization window opened
        setIsAuthorizationWindowOpened: (state, action: PayloadAction<{opened:boolean}>) => {
            state.isAuthorizationWindowOpened = action.payload.opened;
        },
        setClearAuthorizationData :(state) => {
            state.isAuthorizationWindowOpened = false;
            
            state.userInputData.userEmail = "";
            state.userInputData.userPassword = "";

            state.authorizationWindowId = 1;
        },

        // what exacly window open
        setAuthorizationWindowId: (state, action: PayloadAction<{windowId: number}>) => {
            state.authorizationWindowId = action.payload.windowId;
        },

        // -------------------------------------------

        // INPUT DATA
        // set all necessery data about user
        setUserPassword: (state, action: PayloadAction<{userPassword: UserPassword}>) => {
            state.userInputData.userPassword = action.payload.userPassword;
        },
          setUserEmail: (state, action: PayloadAction<{userEmail: UserEmail}>) => {
            state.userInputData.userEmail = action.payload.userEmail;
        },
        // 
        setUserDisplayName: (state, action: PayloadAction<{userDisplayName: UserDisplayName}>) =>{
            state.userInputData.userDisplayName = action.payload.userDisplayName;
        },
        setUserAge: (state, action: PayloadAction<{userAge: UserAge}>) => {
            state.userInputData.userAge = action.payload.userAge;
        }, 
        setUserGender: (state, action: PayloadAction<{userGender: UserGender}>) => {
            state.userInputData.userGender = action.payload.userGender;
        },


        // -------------------------------------------
        // PROVIDER (GOOGLE OR LOCAL INPUT ENTERY)

        setProvider: (state,action: PayloadAction<{type: ProviderType}>) => {
            state.provider = action.payload.type;
        },

        // -------------------------------------------

        // GOOGLE DATA (ON DEVELOPMENT STAGE)
        // set data from google
        setUserGoogleData: (state, action: PayloadAction<{data: GoogleLoginResponceProps}>) => {
            state.userGoogleData = action.payload.data;
        },
        // clear user google data (sign out)
        clearAllUserData: (state) => {
            state.userGoogleData = null;
            state.userInputData = {userEmail: "", userPassword: "", userDisplayName: "", userAge: null, userGender: null, provider: null};

            state.isUserLogged = false;

            state.provider = null;

            // state.user
        },

        // -------------------------------------------

        // VALIDATION ERRORS

        setValidationErrors: (state, action: PayloadAction<Partial<AuthorizationErrorsProps>>) => {

            state.validationErrors = {...state.validationErrors, ...action.payload};

        },
        // clear all errors
        clearValidationError: (state, action: PayloadAction<keyof ValidationErrorsProps>) => {
            state.validationErrors[action.payload] = null;
        }

    }
});

export const {setIsUserLogged, setAuthorizationWindowId, setUserPassword, setUserEmail, setUserDisplayName, setUserAge,setUserGender, setIsAuthorizationWindowOpened, setUserGoogleData, setIsUserLoggedValue, clearAllUserData, setValidationErrors, clearValidationError, setProvider} = authStore.actions;
export const store = configureStore({reducer: {authorization: authStore.reducer}});
export const authReducer  = authStore.reducer;

export type RootAuhtState = ReturnType<typeof store.getState>;
export type AuthAppDispatch = typeof store.dispatch; 

