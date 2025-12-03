import { useAuthAppDispatch, useAuthAppSelector } from "@redux-hook/authHook";
import { AuthorizationInputTemplate } from "../components/AuthorizationInputTemplate";
import { setUserAge, setUserDisplayName, setUserGender } from "@redux-storage/authSlice";

export const SignInWithGoogleWindow = () => {
  
  const userDisplayName = useAuthAppSelector(state => state.authorization.userDisplayName);
  const userAge = useAuthAppSelector(state => state.authorization.userAge); 
  const userGender = useAuthAppSelector(state => state.authorization.userGender); 
  
  const dispatch = useAuthAppDispatch();
  
  /*
    AT THE DEVELOPMENT STAGE
    this window apear after choosing of google account (Google OAuth 2.0 login service)
  */

    return <>
        {/* <section className="border w-full h-fit border-red-500 flex flex-col gap-[1rem]">
              <AuthorizationInputTemplate emptyInput = {!} isTypePassword = {false} placeholder = "Your email address or profile URL"
                          value={userEmail}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            dispatch(
                              setUserEmail({ email: e.target.value.replace(/\s/g, "") })
                            );
                          }}
                          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                            handleKeyDown(e)
                          }
                          ></AuthorizationInputTemplate>
        </section> */}
    
    </>
    
}