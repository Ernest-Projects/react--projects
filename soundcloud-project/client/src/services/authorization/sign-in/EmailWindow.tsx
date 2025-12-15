import { motion } from "motion/react";
// redux alias
import {
  setAuthorizationWindowId,
  setUserEmail,
} from "@redux-storage/authSlice";

import { AuthorizationInputTemplate } from "../components/AuthorizationInputTemplate";

import { useEffect, useState } from "react";

import { useAuthAppDispatch, useAuthAppSelector } from "@redux-hook/authHook";

import type {  AuthFieldType } from "../../../app-types/errorTypes";

type EmailWindowProps = {
  handleSetGlobalNotEmptyInputs: (value: boolean) => void;
  inputError: string | null;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, type: AuthFieldType) => void;
};

export const EmailWindow = ({handleSetGlobalNotEmptyInputs, handleKeyDown, inputError}: EmailWindowProps) => {
  const userEmail = useAuthAppSelector(
    (state) => state.authorization.userInputData.userEmail
  );
  const dispatch = useAuthAppDispatch();

  const [isNotEmptyInput, setIsNotEmptyInput] = useState<boolean>(true);



  // --------------------------------------------------

  // TEST

  useEffect(() => {
    console.log("Email type:", typeof userEmail);
    setIsNotEmptyInput(userEmail.length !== 0);
    handleSetGlobalNotEmptyInputs(userEmail.length !== 0);
  }, [userEmail]);

  // --------------------------------------------------

  return (
    <>
      {/* <div className="relative bg-[rgb(48,48,48)] w-full h-fit rounded-[.2rem] mt-[1rem] pl-[1rem] py-[.4rem]">

     <motion.p initial = {{y:0}} animate = {{y: emptyInput ? -10 : 0}} className="text-[rgba(152,152,152,1)] absolute pointer-events-none w-full left-[1rem] place-self-center">
          Your email address or profile URL
          </motion.p>
       
           <input
          className={`place-self-center text-white transition duration-200  translate-y-[0px] h-[2.5rem]  focus:outline-none active:outline-none  w-full 
            ${emptyInput && "translate-y-[7.5px]"

            }
            `}
          type="email"
          value={userEmail}
           
          onKeyDown={(e) => handleKeyDown(e)}
          onChange={(e) => dispatch(setUserEmail({ email: e.target.value.replace(/\s/g,"") }))}

          autoFocus
          // initial = {{y:5}} animate = {{y: emptyInput ? 8 : 0}}
        /> 
    </div> */}

      {/* this is universal input for all auth fields  */}
      <AuthorizationInputTemplate<{ userEmail: string }>
        placeholder="Your email address or profile URL"

        isTypePassword={false}

        sliceReducer={setUserEmail}
        sliceKey="userEmail"
        sliceState={userEmail}

        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
          handleKeyDown(e, "userEmail")
        }
        inputError = {inputError}
      ></AuthorizationInputTemplate>


       { inputError !== null && inputError.length && (
      
      <section className="text-red-500 mt-[.2rem] text-[.8rem] h-fit w-full">
        <p>{inputError}</p>
      </section>)
      
      }
    </>
  );
};
