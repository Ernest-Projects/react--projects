import { motion, AnimatePresence } from "motion/react";
// redux aliase
import {
  setAuthorizationWindowId,
  setUserEmail,
  setUserPassword,
  setIsUserLoggedValue,
  setClearAuthorizationData,
} from "@redux-storage/authSlice";

import { useAuthAppDispatch, useAuthAppSelector } from "@redux-hook/authHook";

import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { AuthorizationButtons } from "src/services/user-guest-components/navbar/AuthorizationButtons";
import { PasswordWindow } from "./PasswordWindow";
import { EmailWindow } from "./EmailWindow";
import axios from "axios";
import { SignInWithGoogleWindow } from "../sign-up/SignInWithGoogleWindow";

export const SignInComponent = () => {
  const navigate = useNavigate();

  const [isInputNotEmpty, setIsInputNotEmpty] = useState<boolean>(false);

  const authorizationWindowId = useAuthAppSelector(
    (state) => state.authorization.authorizationWindowId
  );

  // useEffect(() => {
  //   const handleEnterPressed = (e: KeyboardEvent) => {

  //     if (e.key == "Enter") {
  //       // e.preventDefault();

  //       if (inputOnFocus && isInputNotEmpty) {
  //         alert("Enter is entered when input in focus (what)");
  //         dispatch(setAuthorizationWindowId({windowId: 3}));
  //        }

  //     }
  //   }
  //   window.addEventListener("keydown", handleEnterPressed);

  // return () => (
  //   window.removeEventListener("keydown", handleEnterPressed)
  // )

  // /    onEnterClicked();
  // }, [])

  const userEmail = useAuthAppSelector(
    (state) => state.authorization.userEmail
  );

  const userPassword = useAuthAppSelector(
    (state) => state.authorization.userPassword
  );

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const dispatch = useAuthAppDispatch();

  // if user in password window (windowId = 3), then set isUserLogged = true and close auth window
  const handleLoginUser = () => {
    dispatch(setIsUserLoggedValue({ logged: true }));
    dispatch(setClearAuthorizationData());

    alert("legged");

    navigate("/discover");
    return;
  };

  // request to the server
  const handleAddUserInDatabase = async () => {
    try {
      const responce = await fetch("http://localhost:3000/api/users/add", {
        method: "POST",
        headers: { "Content-Type": "Application/json" },
        body: JSON.stringify({
          data: { user_email: userEmail, user_password: userPassword },
        }),
      });

      //  if responce cant be reached
      if (!responce.ok) {
        console.error("Responce error:", responce.status);
      }

      const result = await responce.json();
      console.log("Server responce: ", result);

      //  success? Add data in uState
      if (result.success) {
        console.log("data successfully added in database!");
      } else {
        // if success is false (user already exsists)
        alert("User already exsists with this name! Please choose another");
      }
      return;
    } catch (err) {
      console.error(err);
    }
  };

  // 'continue' button when clicked
  const handleEntryUser = async () => {
    await sleep(500);
    if (authorizationWindowId == 3) {
      await handleAddUserInDatabase();
      handleLoginUser();

      console.log("email: ", userEmail);
      console.log("Password: ", userPassword);
    }

    if (!userPassword.length || !userEmail.length) {
      setIsInputNotEmpty(false);
    }

    if (userEmail.length) {
      dispatch(setAuthorizationWindowId({ windowId: 3 }));
    }

    // if (authorizationWindowId == 4) {
    // }
  };

  // move to next window when input clicked
  const handleContinueWithInput = () => {
    if (authorizationWindowId == 1) {
      dispatch(setAuthorizationWindowId({ windowId: 2 }));
    }
  };

  // set semitransparent and disabled 'continue' button, when input empty
  useEffect(() => {
    if (authorizationWindowId == 2 || authorizationWindowId == 1) {
      setIsInputNotEmpty(userEmail.length ? true : false);
    } else if (authorizationWindowId == 3) {
      setIsInputNotEmpty(userPassword.length ? true : false);
    }
  }, [userPassword, userEmail, authorizationWindowId]);

  return (
    <>
      <section className="gap-y-[1rem]  flex  h-fit w-full text-sm flex-col">
        <div
          onClick={handleContinueWithInput}
          className=" flex flex-col gap-[1rem] align-center text-[.7rem] overflow-hidden w-full h-fit "
        >
          <AnimatePresence mode="sync">
            {authorizationWindowId == 2 || authorizationWindowId == 1 ? (
              <motion.div
                key="email"
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 40, opacity: 0 }}
              >
                <EmailWindow />
              </motion.div>
            ) : authorizationWindowId == 3 ? (
              <motion.div
                key="password"
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }} 
                exit={{ y: 40, opacity: 0 }}
              >
                <PasswordWindow handleLoginUser={handleLoginUser} />
              </motion.div> 
            ) : (
              authorizationWindowId == 4 && (
                <motion.div
                  key="first-entry-data"
                  initial={{ y: -40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 40, opacity: 0 }}
                >
                  <SignInWithGoogleWindow />
                </motion.div>
              )
            )}
          </AnimatePresence>
        </div>

        <button
          onClick={handleEntryUser}
          disabled={!isInputNotEmpty}
          className={`w-full font-medium rounded-[.2rem]  flex flex-row justify-center gap-[.5rem] h-fit text-black py-[.5rem] ${
            isInputNotEmpty ? "opacity-[1]" : " opacity-[.6]"
          }  bg-white`}
        >
          Continue
        </button>

        <a className="text-blue-400 text-[.7rem] font-medium w-fit" href="">
          {authorizationWindowId == 3 ? "Forgot your password?" : "Need help?"}
        </a>
      </section>
    </>
  );
};
