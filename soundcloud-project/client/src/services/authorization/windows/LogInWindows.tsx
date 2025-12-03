import { SignInComponent } from "../sign-in/SignInComponent"
import { motion } from "motion/react";

import { ChevronDown } from "lucide-react";

import { Fragment } from "react/jsx-runtime";
import { useAuthAppDispatch, useAuthAppSelector } from "@redux-hook/authHook";
import { setAuthorizationWindowId } from "@redux-storage/authSlice";

import { isUserEmailValid } from "../validation/userDataValidation";
import { PreviousWindowButton } from "../components/PreviousWindowButton";

export const LogInWindows = () => {


    return <> 

        {/* button for returning to the previous auth window in authorization */}
        <PreviousWindowButton/>


        {/* component with button and input in there */}
        <SignInComponent /> 

    </>
}
