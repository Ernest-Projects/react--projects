import { useAuthAppSelector } from "@redux-hook/authHook"
import { GoogleLogin } from "@react-oauth/google";
import { useGoogleLogin } from "@react-oauth/google";
import {useState, useEffect} from "react";


import {jwtDecode} from "jwt-decode";
 
export const AuthorizationWithServices = () => {

//  const authorizationWindowId = useAuthAppSelector(state => state.authorization.authorizationWindowId);


    // custom handler for google authorization
      const handleGoogleLogin = useGoogleLogin({
        onSuccess: (responce) => console.log("responce: ", responce),
       onError: () =>  console.log("Load failed")},);

    

    return <>
     {/* authorization service buttons */}

      <header className="text-white pb-[1.5rem] text-2xl font-semibold">Sing in or create an<br/> account</header>
        <p className="text-sm text-[rgb(152,152,152)] pb-[2rem]">
          By clicking on any of the “Continue” buttons below, you agree to SoundCloud’s <a className="text-blue-400" href="">
            Terms of Use
            </a>   and acknowledge our <a className="text-blue-400" href="">Privacy Policy</a>.
        </p>  
     
       <section className="flex pb-[2rem] text-sm flex-col h-fit text-black gap-y-[1rem]">

       <button className="w-full font-medium rounded-[.2rem]  flex flex-row justify-center gap-[.5rem] h-fit text-white py-[.7rem]  bg-[rgba(0,59,179,1)]" > 
        <div className="h-[1rem] place-self-center  aspect-[1/1]"><img className="w-[1rem] h-[1rem] " style = {{objectFit: "fill"}} src="public/icons/authorization-icons/facebook-app-round-white-icon.webp" alt="" /></div>
      Continue with Facebook
       </button>

       <button onClick = {() => handleGoogleLogin()} className="cursor-pointer w-full font-medium  relative rounded-[.2rem] flex flex-row justify-center gap-[.5rem] h-fit text-white py-[.7rem]  bg-[rgba(48,48,48,1)]" > 
        <div className="h-[1rem] place-self-center  aspect-[1/1]"><img className="w-[1rem] h-[1rem] " style = {{objectFit: "fill"}} src="public/icons/authorization-icons/Google__G__logo.svg.webp" alt="" /></div>
        
      Continue with Google
      </button>

       <button className="w-full font-medium rounded-[.2rem] border border-[rgb(38,38,38)] flex flex-row justify-center gap-[.5rem] h-fit text-white py-[.7rem]  bg-black" > 
        <div className="h-[1rem] place-self-center  aspect-[1/1]"><img className="w-[1rem] h-[1rem] invert " style = {{objectFit: "contain"}} src="public/icons/authorization-icons/Apple_logo_black.svg" alt="" /></div>
      Continue with Apple
      </button>

       </section>

          <header className="text-white pb-[1rem] w-full p-0 m-0 leading-[.5rem]">
            Or with email
          </header>
    </>
}