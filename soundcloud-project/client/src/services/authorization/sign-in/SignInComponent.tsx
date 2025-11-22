import { motion, AnimatePresence } from "motion/react";
// redux aliase
import {
  setAuthorizationWindowId,
  setUserEmail,
} from "@redux-storage/authSlice";

import { useAuthAppDispatch, useAuthAppSelector } from "@redux-hook/authHook";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AuthorizationButtons } from "src/services/user-guest/navbar/AuthorizationButtons";

export const SignInComponent = () => {
  const navigate = useNavigate();

  const [isInputNotEmpty, setIsInputNotEmpty] = useState<boolean>(false);

  const authorizationWindowId = useAuthAppSelector(
    (state) => state.authorization.authorizationWindowId
  );

  const userEmail = useAuthAppSelector(
    (state) => state.authorization.userEmail
  );

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const dispatch = useAuthAppDispatch();

  const handleEntryUser = async () => {
    await sleep(500);
    dispatch(setAuthorizationWindowId({ windowId: 2 }));
    // dispatch(setIsUserLoggedValue({logged: true}));

    // redirection to main page
    navigate("/discover");
  };

  const handleContinueWithInput = () => {
    if (authorizationWindowId == 1) {
      dispatch(setAuthorizationWindowId({windowId: 2}));
    }
  };  

  useEffect(() => {
   setIsInputNotEmpty(userEmail.length ? true : false);
  }, [userEmail]);


  return (
    <>
      <section className="gap-y-[1rem] flex  h-fit w-full text-sm flex-col">
         {authorizationWindowId == 1 ?
        <motion.header className="text-white w-full p-0 m-0 leading-[.5rem]">
          Or with email
        </motion.header> : ""
        }
        <div  onClick={handleContinueWithInput}
 className="bg-[rgb(48,48,48)] flex align-center text-[.7rem] overflow-hidden w-full h-[2rem] rounded-[.2rem] pl-[1.5rem] py-[1.5rem]">
          <motion.p initial = {{y:0}} animate = {{y: isInputNotEmpty ? -10 : 0}} className="text-[rgba(152,152,152,1)] absolute pointer-events-none place-self-center">
            {" "}
            Your email address or profile URL
          </motion.p>
          <motion.input
            className="place-self-center text-white  focus:outline-none active:outline-none  w-full "
            type="email"
            value={userEmail}
            onChange={(e) => dispatch(setUserEmail({ email: e.target.value }))}
            initial = {{y:5}} animate = {{y: isInputNotEmpty ? 8 : 0}}
           
          />
        </div>
        <button
          onClick={handleEntryUser}
          disabled = {!isInputNotEmpty}
          className={`w-full font-medium rounded-[.2rem]  flex flex-row justify-center gap-[.5rem] h-fit text-black py-[.5rem] ${isInputNotEmpty ? "opacity-[1]" : " opacity-[.6]"}  bg-white`}
        >
          Continue
        </button>
        <a className="text-blue-400 font-medium w-fit" href="">
          Need help?
        </a>
      </section>
    </>
  );
};
