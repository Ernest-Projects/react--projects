import { useAuthAppDispatch, useAuthAppSelector } from "@redux-hook/authHook";
import { AuthorizationInputTemplate } from "../components/AuthorizationInputTemplate";
import { setUserAge, setUserDisplayName, setUserGender } from "@redux-storage/authSlice";

import { useState, useEffect } from "react";

import { setAuthorizationWindowId } from "@redux-storage/authSlice";
export const SignInWithGoogleWindow = () => {
  
  const userDisplayName = useAuthAppSelector(state => state.authorization.userDisplayName);
  const userAge = useAuthAppSelector(state => state.authorization.userAge); 
  const userGender = useAuthAppSelector(state => state.authorization.userGender); 
  
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
         dispatch(setAuthorizationWindowId({ windowId: 3 }));
       }
     }
   };

     useEffect(() => {
       setIsInputNotEmpty(userDisplayName.length !== 0);
     }, [userDisplayName]);

    return <>

        {/* this is universal input for all auth fields (BRO I SPENT LITERALY 3 HOURS ON THIS) */}
        <AuthorizationInputTemplate<{ displayName: string }>
          placeholder="Display name"
          isTypePassword={false}
  
          sliceReducer={setUserDisplayName}
          sliceKey={"displayName"}
          sliceState={userDisplayName}
          
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
            handleKeyDown(e)
          }
        ></AuthorizationInputTemplate>

        <p className="text-[rgb(152,152,152)]">Your display name can be anything you like. Your name or artist <br/> name are good choices.</p>

         <AuthorizationInputTemplate<{ age: number }>
          placeholder="Age (required)"
          isTypePassword={false}
  
          sliceReducer={setUserAge}
          sliceKey={"age"}
          sliceState={userAge}
          
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
            handleKeyDown(e)
          }
        ></AuthorizationInputTemplate>
    
    </>
}