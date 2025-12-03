import { motion } from "motion/react";
// redux aliase
import {
  setAuthorizationWindowId,
  setUserEmail,
} from "@redux-storage/authSlice";

import { AuthorizationInputTemplate } from "../components/AuthorizationInputTemplate";

import { useEffect, useState } from "react";

import { useAuthAppDispatch, useAuthAppSelector } from "@redux-hook/authHook";

type EmailWindowProps = {
  emptyInput: boolean;
};

export const EmailWindow = () => {
  const userEmail = useAuthAppSelector(
    (state) => state.authorization.userEmail
  );
  const dispatch = useAuthAppDispatch();

  const [isNotEmptyInput, setIsNotEmptyInput] = useState<boolean>(true);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      e.preventDefault();
      if (isNotEmptyInput) {
        dispatch(setAuthorizationWindowId({ windowId: 3 }));
      }
    }
  };

  useEffect(() => {
    setIsNotEmptyInput(userEmail.length !== 0);
  }, [userEmail]);

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
      <AuthorizationInputTemplate
        placeholder="Your email address or profile URL"

        isTypePassword={false}

        sliceReducer={setUserEmail}
        sliceKey="email"
        sliceState={userEmail}

        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
          handleKeyDown(e)
        }
      ></AuthorizationInputTemplate>
    </>
  );
};
