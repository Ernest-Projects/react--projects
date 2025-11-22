import {motion }from "motion/react";
import {AuthorizationWithServices} from "../sign-up/AuthorizationWithServices";
import { SignInComponent } from "../sign-in/SignInComponent";

type MainWindowProps = {
    close: boolean
}


export const MainWindow = ({close}: MainWindowProps) => {
    return <>
    
        {/* header, subtitle and service buttons */}
        <AuthorizationWithServices />

        {/* component with button and input in there */}
        <SignInComponent /> 
    </>
}