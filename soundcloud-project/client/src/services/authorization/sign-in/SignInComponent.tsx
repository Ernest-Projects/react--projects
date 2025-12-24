import { motion, AnimatePresence } from "motion/react";
// redux aliase
import {
  setAuthorizationWindowId,
  setUserEmail,
  setUserPassword,
  setValidationErrors,
  setIsUserLogged,
  setProvider,
  setIsUserLoggedValue,
} from "@redux-storage/authSlice";

import { useAuthAppDispatch, useAuthAppSelector } from "@redux-hook/authHook";

import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState, type ProviderProps } from "react";
import { PasswordWindow } from "./PasswordWindow";
import { EmailWindow } from "./EmailWindow";
import axios from "axios";
import { ProfileDetailsWindow } from "../sign-up/ProfileDetailsWindow";
import type { Provider } from "../../../app-types/loginTypes";
import { useLocalAuth } from "../hooks/useLocalAuth";



// -----------------------------------------------
// VALIDATION IMPORTS

import type { AuthFieldType, ValidationErrorsProps } from "../../../app-types/errorTypes";
import {
  invalidErrorExists,
  validateUserLocalLogin,
} from "../validation/validateUserLocalLogin";

import { handleFieldValidationAfterKeyDown } from "../validation/input_enter_key/handleFieldValidationAfterKeyDown";


interface InputErrorsProps {
  invalidEmail: string;
  invalidPassword: string;
  // invalidDisplayName: string,
  invalidAge: string;
  // invalidGender: string
}

export const  SignInComponent = () => {
  const navigate = useNavigate();

  const [isInputNotEmpty, setIsInputNotEmpty] = useState<boolean>(false);

  const authorizationWindowId = useAuthAppSelector(
    (state) => state.authorization.authorizationWindowId
  );
  // --------------------------------------------------------


  // GOOGLE DATA OBJECT
  const userGoogleData = useAuthAppSelector(
    (state) => state.authorization.userGoogleData
  );
  // --------------------------------------------------------

  // ERRORS OBJECT
  const validationErrors = useAuthAppSelector(
    (state) => state.authorization.validationErrors
  );

  // --------------------------------------------------------
  // ALL INPUT FIELDS
  const userEmail = useAuthAppSelector(
    (state) => state.authorization.userInputData.userEmail
  );

  const userPassword = useAuthAppSelector(
    (state) => state.authorization.userInputData.userPassword
  );

  const userDisplayName = useAuthAppSelector(
    (state) => state.authorization.userInputData.userDisplayName
  );

  const userAge = useAuthAppSelector(
    (state) => state.authorization.userInputData.userAge
  );

  const userGender = useAuthAppSelector(
    (state) => state.authorization.userInputData.userGender
  );

  const userInputData = useAuthAppSelector(
    (state) => state.authorization.userInputData
  );

  const dispatch = useAuthAppDispatch();
  // --------------------------------------------------------

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  // -----------------------------------------------------------------------------

  // success await continue after fetching google data
  useEffect(() => {
    const handleSetData = async () => {
      if (userGoogleData) {
        // last window
        await sleep(1000);

        dispatch(setAuthorizationWindowId({ windowId: 4 }));
        alert("google data: " + userGoogleData);

        Object.values(userGoogleData).map((_) => console.log(_ + "\n"));
      }
    };

    handleSetData();
  }, [userGoogleData]);

  // -----------------------------------------------------------------------------

  // set input errors

  // validate all inputs
  const validateAllInputFields = () => {};
  // -----------------------------------------------------------------------------

  // test 'continue button '

  const handleEntryUser = async () => {
    await sleep(500);

    // errors
    let errors: ValidationErrorsProps = {
      userEmail: null,
      userPassword: null,
      userDisplayName: null,
      userAge: null,
    };

    if (authorizationWindowId == 1) {
      // set provider right here, only one time
      errors = validateUserLocalLogin({ userEmail });
      dispatch(setValidationErrors(errors));

      if (errors.userEmail !== null) {
        return;
      } else {
        dispatch(
          setAuthorizationWindowId({ windowId: authorizationWindowId + 2 })
        );
      }
    }
    // email and password window
    if (authorizationWindowId == 2) {
      console.log("User");
      dispatch(setProvider({ type: "local" }));

      errors = validateUserLocalLogin({ userEmail });
      dispatch(setValidationErrors(errors));
      // alert("errors: " + errors);

      if (errors.userEmail !== null) {
        return;
      } else {
        dispatch(
          setAuthorizationWindowId({ windowId: authorizationWindowId + 1 })
        );
      }
    }

    // email and password window
    if (authorizationWindowId == 3) {
      console.log("Password");

      errors = validateUserLocalLogin({ userPassword });
      dispatch(setValidationErrors(errors));

      if (errors.userPassword !== null) {
        return;
      } else {
        dispatch(
          setAuthorizationWindowId({ windowId: authorizationWindowId + 1 })
        );
      }
    }

    // invalidEmail: "Enter a valid email address!", invalidPassword: "This password is incorrect!",invalidAge: "Sorry, but you don't meet SoundCloud's minimum age requirements"
    if (authorizationWindowId == 4) {
      errors = validateUserLocalLogin({ userDisplayName, userAge });
      dispatch(setValidationErrors(errors));

      if (errors.userDisplayName !== null || errors.userAge !== null) {
        return;
      } else {
        // GET ANSWER FROM SERVER
        const result = await useLocalAuth(userInputData);

        // IF SUCCESS
        if (result.ok) {
         
          // SET LOGGED
          // CLOSE AUTHORIZATION WINDOW
          dispatch(setIsUserLogged());

          return;
        }

        if (result.reason == "USER_EXISTS") {
          errors.userDisplayName = "User already exists! Change email address!";
          dispatch(setValidationErrors(errors));
        }
      }
    }

    return;
  };

  const getValueByField = (field: AuthFieldType) => {
  switch (field) {
    case "userEmail":
      return userEmail;
    case "userPassword":
      return userPassword;
    case "userDisplayName":
      return userDisplayName;
    case "userAge":
      return userAge ?? 0;
    }
  };


  // move to next window when input clicked
  const handleContinueWithInput = (e: React.KeyboardEvent<HTMLInputElement>, type: AuthFieldType) => {
    // alert("handleContinueWithInput!");
   if (type == "userAge") return; 
    handleFieldValidationAfterKeyDown(e, type, authorizationWindowId, getValueByField(type),  dispatch);
  };

  return (
    <>
      <section data-cy = "sign-in-component" className="gap-y-[1rem]  flex  h-fit w-full text-sm flex-col">
        <div
          className=" flex flex-col gap-[1rem] align-center text-[.7rem] overflow-hidden w-full h-fit "
        >
          <AnimatePresence mode="sync">
            {authorizationWindowId == 2 || authorizationWindowId == 1 ? (
              <motion.div data-cy = "email-input"
                key="email"
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 40, opacity: 0 }}
              >
                <EmailWindow
                  handleSetGlobalNotEmptyInputs={(value) =>
                    setIsInputNotEmpty(value)
                  }
                  handleKeyDown ={handleContinueWithInput}
                  inputError={validationErrors.userEmail}
                />
              </motion.div>
            ) : authorizationWindowId == 3 ? (
              <motion.div
                key="password"
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 40, opacity: 0 }}
              >
                <PasswordWindow
                  handleSetGlobalNotEmptyInputs={(value) =>
                    setIsInputNotEmpty(value)
                  }
                  // validation function from validation/input_enter_key
                  handleKeyDown={handleContinueWithInput}
                  inputError={validationErrors.userPassword}
                />
              </motion.div>
            ) : (
              authorizationWindowId == 4 && (
                <motion.div
                  key="name-age-gender"
                  initial={{ y: -40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 40, opacity: 0 }}
                >
                  <ProfileDetailsWindow
                    handleSetGlobalNotEmptyInputs={(value) =>
                      setIsInputNotEmpty(value)
                    }
                    inputError={{userDisplayName: validationErrors.userDisplayName, userAge: validationErrors.userAge}}
                  />
                </motion.div>
              )
            )}
          </AnimatePresence>
        </div>

        <button data-cy = "registration-continue-button"
          onClick={handleEntryUser}
          disabled={!isInputNotEmpty}
          className={`w-full font-medium rounded-[.2rem]  flex flex-row justify-center gap-[.5rem] h-fit text-black py-[.8rem] ${
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
