import { motion } from "motion/react";
// redux aliase
import {
  
  setIsUserLoggedValue,
  setUserPassword,
  setIsAuthorizationWindowOpened,
  setUserDisplayName,
  setAuthorizationWindowId,
} from "@redux-storage/authSlice";

import { isUserPasswordValid } from "../validation/userDataValidation";

import { Eye, EyeOff } from "lucide-react";

import { useAuthAppDispatch, useAuthAppSelector } from "@redux-hook/authHook";
import { useNavigate } from "react-router-dom";

import React, { useEffect, useRef, useState } from "react";
import { AuthorizationInputTemplate } from "../components/AuthorizationInputTemplate";
import type { AuthFieldType } from "src/app-types/errorTypes";

type EmailWindowProps = {
  handleSetGlobalNotEmptyInputs: (value: boolean) => void;
  inputError: string | null;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, type: AuthFieldType) => void
};

export const PasswordWindow = ({ handleSetGlobalNotEmptyInputs, handleKeyDown, inputError }: EmailWindowProps) => {
  const userPassword = useAuthAppSelector(
    (state) => state.authorization.userInputData.userPassword
  );
  const userEmail = useAuthAppSelector(
    (state) => state.authorization.userInputData.userEmail
  );

  const authorizationWindowId = useAuthAppSelector((state) => state.authorization.authorizationWindowId);

  const [notEmptyInput, setNotEmptyInput] = useState<boolean>(true);

  const [validError, setValidError ] = useState<boolean>(false);

  const inputPasswordRef = useRef<HTMLInputElement>(null);

  const dispatch = useAuthAppDispatch();



  // const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // if (e.key == "Enter") {
    //   e.preventDefault();

    //   if (!isUserPasswordValid(userPassword)) {
    //     setValidError(true);
        
    //   } 
    //   else {
    //     dispatch(setAuthorizationWindowId({windowId: authorizationWindowId + 1}));
    //   }
    //   }

    // }

  useEffect(() => {
    setNotEmptyInput(userPassword.length !== 0);
    handleSetGlobalNotEmptyInputs(userPassword.length !== 0);

    // if (isUserPasswordValid(userPassword)) {
    //   setValidError(false);
    // }
    // else {
    //   setValidError(true)
    // }

  }, [userPassword])

  return (
    <>
      <div className="flex   flex-col h-[3.3rem] mb-[1rem] pb-[3rem] w-full py-[.4rem] pl-[1rem]  border-red-500">
        <p className="text-[rgba(152,152,152,1)]  pointer-events-none ">
          Your email address or profile URL

        </p>  

        <p
          className={` text-white transition duration-200 translate-y-[2px] my-0 focus:outline-none active:outline-none  w-full `}
        > hereis 
          {userEmail}
        </p>
      </div>

      {/* this is universal input for all auth fields (BRO I SPENT LITERALY 3 HOURS ON THIS) */}
      <AuthorizationInputTemplate<{ userPassword: string }>
        placeholder="Your password (min. 8 characters)"
        isTypePassword={true}

        inputError = {inputError}


        sliceReducer={setUserPassword} 
        sliceKey={"userPassword"}
        sliceState={userPassword}
        
        ref={inputPasswordRef}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
          handleKeyDown(e, "userPassword")
        }
      ></AuthorizationInputTemplate>

      { inputError !== null && inputError.length && (
      
      <section className="text-red-500 mt-[.2rem] text-[.8rem] h-fit w-full">
        <p>{inputError}</p>
      </section>)
      
      }
    </>
  );
};
