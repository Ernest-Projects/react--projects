import { SignInComponent } from "../sign-in/SignInComponent"
import { motion } from "motion/react";

import { ChevronDown } from "lucide-react";

import { Fragment } from "react/jsx-runtime";
import { useAuthAppDispatch, useAuthAppSelector } from "@redux-hook/authHook";
import { setAuthorizationWindowId } from "@redux-storage/authSlice";

import { isUserEmailValid } from "../validation/userDataValidation";

export const EmailWindow = () => {

    const dispatch = useAuthAppDispatch();
    const userEmail = useAuthAppSelector((state) => state.authorization.userEmail)
    const authorizationWindowId = useAuthAppSelector((state)=> state.authorization.authorizationWindowId);



    // continue after checking email validation
    const handleGetBack = () => {
        if (authorizationWindowId == 2) {
          dispatch(setAuthorizationWindowId({windowId: 1}));
        }
      };

    return <> 

    <section style = {{display: "grid", gridTemplateColumns: "1fr auto 1fr"}} className="align-center pb-[2rem]">
        <button onClick={handleGetBack} style = {{transform: "rotate(90deg)"}} className=" bg-[rgb(48,48,48)]  justify-self-start aspect-[1/1] w-[2.5rem] h-fit rounded-[10rem] text-white"> 

     <ChevronDown
            strokeWidth={1.5}

            className={`
            "text-white"
             border-none place-self-center`}
            size={30}
          />
        </button>
        <header className="justify-self-center place-self-center text-white font-semibold">Sign in or create an account</header>
    </section>



        {/* component with button and input in there */}
        <SignInComponent /> 

    </>
}