import { validateUserLocalLogin } from "../validateUserLocalLogin";

import type { ValidationErrorsProps } from "@app-types/errorTypes";
import type { AuthFieldType } from "@app-types/errorTypes";

import {
  setAuthorizationWindowId,
  setValidationErrors,
} from "@redux-storage/authSlice";

export const handleFieldValidationAfterKeyDown = (
  e: React.KeyboardEvent<HTMLInputElement>,
  type: AuthFieldType,
  authorizationWindowId: number,
  value: string | number,
  dispatch: any
) => {
  if (e.key != "Enter") return;

  e.preventDefault();
  // validateUserLocalLogin({validationErrors.email});
  let result: ValidationErrorsProps = {
    userEmail: null,
    userPassword: null,
    userDisplayName: null,
    userAge: null,
  };

  // if (authorizationWindowId == 1) {
  //   dispatch(
  //     setAuthorizationWindowId({ windowId: authorizationWindowId + 1 })
  //   );
  // }

  result = validateUserLocalLogin({ [type]: value });
  // alert("handleFieldValidationAfterKeyDown!");

  if (result[type] == null) {
    if (type == "userEmail") {
      dispatch(
        setAuthorizationWindowId({ windowId: authorizationWindowId + 2 })
      );
      return;
    }
    dispatch(setAuthorizationWindowId({ windowId: authorizationWindowId + 1 }));
    // alert("Here is no valid error!!");
  } else {
    dispatch(setValidationErrors(result));
  }
};
