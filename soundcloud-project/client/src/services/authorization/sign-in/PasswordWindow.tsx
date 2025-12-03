import { motion } from "motion/react";
// redux aliase
import {
  setClearAuthorizationData,
  setIsUserLoggedValue,
  setUserPassword,
  setIsAuthorizationWindowOpened,
  setUserDisplayName,
} from "@redux-storage/authSlice";

import { Eye, EyeOff } from "lucide-react";

import { useAuthAppDispatch, useAuthAppSelector } from "@redux-hook/authHook";
import { useNavigate } from "react-router-dom";

import React, { useEffect, useRef, useState } from "react";
import { AuthorizationInputTemplate } from "../components/AuthorizationInputTemplate";

type EmailWindowProps = {
  handleLoginUser: () => void;
};

export const PasswordWindow = ({ handleLoginUser }: EmailWindowProps) => {
  const userPassword = useAuthAppSelector(
    (state) => state.authorization.userPassword
  );
  const userEmail = useAuthAppSelector(
    (state) => state.authorization.userEmail
  );

  const [notEmptyInput, setNotEmptyInput] = useState<boolean>(true);

  const inputPasswordRef = useRef<HTMLInputElement>(null);

  const dispatch = useAuthAppDispatch();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      e.preventDefault();

      if (notEmptyInput) {
        handleLoginUser();
      }
    }
  };

  return (
    <>
      <div className="flex   flex-col h-[3.3rem] mb-[1rem] pb-[3rem] w-full py-[.4rem] pl-[1rem]  border-red-500">
        <p className="text-[rgba(152,152,152,1)]  pointer-events-none ">
          Your email address or profile URL
        </p>

        <p
          className={` text-white transition duration-200 translate-y-[2px] my-0 focus:outline-none active:outline-none  w-full `}
        >
          {userEmail}
        </p>
      </div>

      {/* this is universal input for all auth fields (BRO I SPENT LITERALY 3 HOURS ON THIS) */}
      <AuthorizationInputTemplate<{ password: string }>
        placeholder="Your password (min. 6 characters)"
        isTypePassword={true}

        sliceReducer={setUserPassword}
        sliceKey={"password"}
        sliceState={userPassword}
        
        ref={inputPasswordRef}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
          handleKeyDown(e)
        }
      ></AuthorizationInputTemplate>
    </>
  );
};
