import React, { forwardRef, useState } from "react";
import { useAuthAppDispatch } from "@redux-hook/authHook";
import type { PayloadActionCreator } from "@reduxjs/toolkit";

import { Eye, EyeOff } from "lucide-react";
import type { JSX } from "react/jsx-dev-runtime";

import {motion } from "motion/react";

interface AuthorizationInputTemplateProps<T extends Record<string, number | string>> {
  placeholder: string;
  isTypePassword: boolean;

  // like "setUserDisplayName"
  sliceReducer: PayloadActionCreator<T>;
  // like "displayName" key in payload object 
  sliceKey: keyof T;
  
  // 
  sliceState: string;
  inputAttrs?: React.InputHTMLAttributes<HTMLInputElement>;

  // onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

export const AuthorizationInputTemplate = forwardRef(
  <T extends Record<string, any>>(
    { placeholder, sliceState, isTypePassword, onKeyDown ,  sliceReducer, sliceKey, inputAttrs }: AuthorizationInputTemplateProps<T>,
    ref: React.Ref<HTMLInputElement>
  ) => {
    const dispatch = useAuthAppDispatch();

    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    const [isInputNotEmpty, setIsInputNotEmpty] = useState<boolean>(true);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

      const val = e.target.value.replace(/\s/g, "");

      // create dynamicaly object of type 'payload' (like in slice)
      const payload = { [sliceKey]: val } as T;
      dispatch(sliceReducer(payload));

      setIsInputNotEmpty(val.length !== 0);
    };
    
    return (
      <motion.div className="flex bg-[rgb(48,48,48)] relative justify-center  flex-col rounded-[.2rem] h-[3.3rem]  w-full py-[.5rem] pl-[1rem]  border-red-500">
          <motion.p initial = {{y:0}} animate = {{y: isInputNotEmpty ? -10 : 0}} className="text-[rgba(152,152,152,1)] absolute pointer-events-none w-full h-fit left-[1rem] place-self-center">
          {placeholder}
          </motion.p>
        <input
        // all atributes for input tag (<HTMLInputElement> type)
          {...inputAttrs}
          ref={ref}

          autoFocus

          value={sliceState} 
          onKeyDown={onKeyDown}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
            handleChange(e)
          }
          type={isTypePassword ? (isPasswordVisible ? "text" : "password") : "text"}
          className={`text-white h-[2.5rem] w-full transition duration-200 place-self-center ${isInputNotEmpty && "translate-y-[8px]"} translate-y-[0] focus:outline-none active:outline-none `}
        />
       
 {isTypePassword && (
          <button
            onClick={() => setIsPasswordVisible((prev) => !prev)}
            className="absolute place-self-center text-[rgb(152,152,152)] right-[1rem]"
          >
            {!isPasswordVisible ? (
              <Eye strokeWidth={1.2} />
            ) : (
              <EyeOff strokeWidth={1.2} />
            )}
          </button>
        )}
      </motion.div>
    );
  }
) as <T extends Record<string, number | string>>(props: AuthorizationInputTemplateProps<T> & { ref?: React.Ref<HTMLInputElement> }) => JSX.Element;






