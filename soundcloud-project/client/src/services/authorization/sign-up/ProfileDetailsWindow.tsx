import { useAuthAppDispatch, useAuthAppSelector } from "@redux-hook/authHook";
import { AuthorizationInputTemplate } from "../components/AuthorizationInputTemplate";
import { setUserAge, setUserDisplayName, setUserGender } from "@redux-storage/authSlice";

import { useState, useEffect } from "react";

import { setAuthorizationWindowId } from "@redux-storage/authSlice";
import type { ValidationErrorsProps } from "@app-types/errorTypes";
type InputFields = {
  displayName: string | null;
  age: string | null
}

interface SignInWithGoogleWindowProps  {
  handleSetGlobalNotEmptyInputs: (value: boolean) => void;
  inputError: Pick<ValidationErrorsProps, "userDisplayName" | "userAge">;
}
export const ProfileDetailsWindow = ({ handleSetGlobalNotEmptyInputs, inputError}: SignInWithGoogleWindowProps) => {
     
  const userDisplayName = useAuthAppSelector(state => state.authorization.userInputData.userDisplayName);
  const userAge = useAuthAppSelector(state => state.authorization.userInputData.userAge); 
  const userGender = useAuthAppSelector(state => state.authorization.userInputData.userGender); 
  
  const dispatch = useAuthAppDispatch(); 

  const [isNotEmptyInput, setIsInputNotEmpty] = useState<boolean>(false);
  
  /*
    AT THE DEVELOPMENT STAGE
    this window apear after choosing of google account (Google OAuth 2.0 login service)
  */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
     if (e.key == "Enter") {
       e.preventDefault();
       if (isNotEmptyInput) { 
        //  dispatch(setAuthorizationWindowId({ windowId: 3 }));
       }
     }
   };

     useEffect(() => {
      // alert(userAge);
      if (userDisplayName.length !== 0 && ( userAge !== null) && userGender !== null) {
        setIsInputNotEmpty(true);
        handleSetGlobalNotEmptyInputs(true);
      }else {
        setIsInputNotEmpty(false);
        handleSetGlobalNotEmptyInputs(false);

      }
     }, [userDisplayName, userAge, userGender]);

    return <>

        {/* this is universal input for all auth fields (BRO I SPENT LITERALY 3 HOURS ON THIS) */}
        {/* display name input */}

        <div className="flex flex-col mb-4 gap-3">

        <AuthorizationInputTemplate<{ userDisplayName: string }>
          placeholder="Display name"
          isTypePassword={false}
          inputError= {inputError.userDisplayName}

                  inputAttrs={{ "data-cy": "registration-display-name" } as any}

  
          sliceReducer={setUserDisplayName}
          sliceKey={"userDisplayName"}
          sliceState={userDisplayName}
          
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
            handleKeyDown(e)
          }
        ></AuthorizationInputTemplate>



        { inputError.userDisplayName !== null && inputError.userDisplayName.length ? (
      
      <section className="text-red-500 mt-[.2rem] text-[.8rem] h-fit w-full">
        <p>{inputError.userDisplayName}</p>
      </section>) :         <p className="text-[rgb(152,152,152)] text-[.8rem]"> Your display name can be anything you like. Your name or artist  name are good choices.</p>

      
      }
        </div>


        <div className="flex flex-col gap-4">



{/* age (required) input */}
         <AuthorizationInputTemplate<{ userAge: number }>
          placeholder="Age (required)"
          isTypePassword={false}
  
                    inputError= {inputError.userAge}

                                      inputAttrs={{ "data-cy": "registration-age" } as any}


          sliceReducer={setUserAge}
          sliceKey={"userAge"}
          sliceState={userAge}
          
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
            handleKeyDown(e)
          }
        ></AuthorizationInputTemplate>

         { inputError.userAge !== null && (
      
      <section className="text-red-500 mt-[.2rem] text-[.8rem] h-fit w-full">
        <p>{inputError.userAge}</p>
      </section>)
      
      }

    

{/* gender input */}
    <AuthorizationInputTemplate<{ userGender: "male" | "female" }>
          placeholder="Gender (required)"
          isTypePassword={false}

                    inputError= {null}

                                      inputAttrs={{ "data-cy": "registration-gender" } as any}

          sliceReducer={setUserGender}
          sliceKey={"userGender"}
          sliceState={userGender}
          
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
            handleKeyDown(e)
          }
        ></AuthorizationInputTemplate>
        </div>

    </>
}