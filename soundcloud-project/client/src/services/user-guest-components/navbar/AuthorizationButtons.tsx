// import

import { nav } from "motion/react-client";
import { GlobalButton } from "../../../components/global/GlobalButton";
import { useAuthAppDispatch } from "@redux-hook/authHook";
import {setIsUserLoggedValue } from "@redux-storage/authSlice";
import {setCloseAllPopups} from "@redux-storage/navbarSlice";


import { useNavbarAppDispatch } from "@redux-hook/navbarHook";
import { setAuthorizationWindowId, setIsAuthorizationWindowOpened } from "@redux-storage/authSlice"

export const AuthorizationButtons = () => {
    const authDispatch = useAuthAppDispatch();
        const navbarDispatch = useNavbarAppDispatch();


    const handleSingIn = () => {
        console.log("here");

        // set user logged, but its for test only for now
        // authDispatch(setIsUserLoggedValue({logged: true}));
     
        // set open login window
        authDispatch(setIsAuthorizationWindowOpened({opened: true}));
        // close popups
        navbarDispatch(setCloseAllPopups());

        // disable scrollbar
        document.documentElement.style.overflow = "hidden";


    
        
    }
    return <>

    <section className="h-full font-medium w-fit  flex gap-x-[1rem] ">
        <GlobalButton data-cy = "navbar-sign-in-button" onClick = {handleSingIn} text = {"Sign in"} bg = {"transparent"} color = {"white"}/>
        <GlobalButton onClick  = {handleSingIn} text = {"Create account"} bg = {"white"} color = {"black"}/>
        <GlobalButton text = {"Upload"} bg = {"transparent"} color = {"gray"}/>
    </section>

    </>
}