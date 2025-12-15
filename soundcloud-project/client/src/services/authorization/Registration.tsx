
import {
  useAuthAppDispatch,
  useAuthAppSelector,
} from "../../redux/hooks/authHook";

// import { setIsUserLogged } from "../../../src/redux/storages/globalSlice";

import { X } from "lucide-react";

import { motion, AnimatePresence } from "motion/react";
import { createPortal } from "react-dom";
import {
  setAuthorizationWindowId,
  setIsAuthorizationWindowOpened,clearAllUserData
} from "@redux-storage/authSlice";
import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { SignInComponent } from "./sign-in/SignInComponent";
import { AuthorizationWithServices } from "./sign-up/AuthorizationWithServices";
import { MainWindow } from "./windows/MainWindow";
import { LogInWindows } from "./windows/LogInWindows";
import { span } from "motion/react-client";
import { SignInWithGoogleWindow } from "./sign-up/SignInWithGoogleWindow";

// import { GoogleLogin } from "@react-oauth/google";
import { TestComponent } from "./sign-in/testComponent";

export const Registration = () => {
  const [closeAuthorizationWindow, setCloseAuthorizationWindow] =
    useState<boolean>(true);

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const dispatch = useAuthAppDispatch();

  const userDataFromGoogle = useAuthAppSelector(state => state.authorization.userGoogleData);

  const authorizationWindowId = useAuthAppSelector(
    (state) => state.authorization.authorizationWindowId
  );
  const isAuthorizationWindowOpened = useAuthAppSelector(
    (state) => state.authorization.isAuthorizationWindowOpened
  );

  const handleCloseAuthorizationWindow = async () => {
    dispatch(clearAllUserData())
    
    document.documentElement.style.overflow = "visible";

    dispatch(setIsAuthorizationWindowOpened({opened: false}));
    dispatch(setAuthorizationWindowId({windowId: 1}));

  };

 
  // facebook button bg
  // rgba(0, 59, 179, 1)

  return createPortal( 
    <motion.main
      transition={{}}
      className={` fixed w-[100vw] left-0 top-0 h-[100vh] flex justify-center align-center ${
        isAuthorizationWindowOpened
          ? "z-[10000] pointer-events-all"
          : "z-[-100] opacity-[0] pointer-events-none"
      }`}
    >

      <TestComponent/>


      {/* semitransparent background  */}
      <div
        className={`bg-white duration-200 w-full h-full transition ${
          isAuthorizationWindowOpened ? "opacity-[.4]" : "opacity-[0]"
        }`}
      ></div>

        <AnimatePresence>

      {/* authorization windows (depends from id) */}
      {isAuthorizationWindowOpened && (


      <motion.section
      initial = {{ opacity: 0, y: -100}} animate = {{opacity: 1, y: 0}} exit={{opacity: 0  , y:  -100}}
        style={{transform: "translateX(0%) translateY(0%)", transformOrigin:"top"}}
        className={`rounded-[.2rem] border w-[28rem] place-self-center gap-[1rem] absolute h-fit p-[1.5rem] bg-[rgb(18,18,18)]`}
      >
        {authorizationWindowId == 1 ? (
          
          <motion.div key = "main" initial={{y:-40,  opacity: 0}} animate = {{y: 0, opacity:1}} exit={{y:40, opacity:0}}>
            <MainWindow />
          </motion.div>

        ) : ([2,3,4].includes(authorizationWindowId)) && (
          
          <motion.div key = "email/password" initial={{y:-40,  opacity: 0}} animate = {{y: 0, opacity:1}} exit={{y:40, opacity:0}}>
          <LogInWindows/>
          </motion.div>

        ) 
      }
        

      </motion.section> 
      )}
        </AnimatePresence>

{/* 


      <AnimatePresence mode="wait">
  {authorizationWindowId === 1 ? (
    <motion.section
      key="main"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      style={{ transform: "translate(50%, -50%)" }}
      className="rounded-[.2rem] border w-[28rem] place-self-center absolute h-fit p-[1.5rem] bg-[rgb(18,18,18)]"
    >
      <MainWindow close={closeAuthorizationWindow} />
    </motion.section>
  ) : (
    <motion.section
      key="email"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      style={{ transform: "translate(50%, -50%)" }}
      className="rounded-[.2rem] border w-[28rem] place-self-center absolute h-fit p-[1.5rem] bg-[rgb(18,18,18)]"
    >
      <<LogInWindow></LogInWindow> />
    </motion.section>
  )}
</AnimatePresence> */}




      {/*button to close auth window */}
      <button
        onClick={handleCloseAuthorizationWindow}
        className="w-fit h-fit group rounded-[10rem] p-[.2rem] bg-[rgb(48,48,48)] text-white absolute right-[3rem] top-[3rem]"
      >
        <span className="group-hover:opacity-[.7]">
          <X />
        </span>
      </button>

    </motion.main>,
    document.body
  );
};
