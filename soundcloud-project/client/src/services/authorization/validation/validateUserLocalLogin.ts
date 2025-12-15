// import type { ValidationError } from "json-schema";
import type { UserInputDataProps } from "../../../app-types/loginTypes";
import type { ValidationErrorsProps } from "../../../app-types/errorTypes";
import { isUserEmailValid, isUserPasswordValid } from "./userDataValidation";

interface InputDataFromLocalPartial {
  userEmail?: string;
  userPassword?: string;
  userDisplayName?: string;
  userAge?: number | null;
}
const InputErrors = {
  emailError: "Enter the valid email!",
  passwordError: "The passoword is incorrect!",
  displayNameError: "This name is already exsist!",
  ageError: "Sorry, but you don't meet SoundCloud's minimum age requirements",
};

export function validateUserLocalLogin(
  data: InputDataFromLocalPartial
): ValidationErrorsProps {
  const errors: ValidationErrorsProps = {
    userEmail: null,
    userPassword: null,
    userDisplayName: null,
    userAge: null,
  };

  //   EMAIL
  if (data.userEmail !== undefined) {
    if (!data.userEmail.trim()) {
      errors.userEmail = "Enter empty field!";
    } else if (!isUserEmailValid(data.userEmail)) {
      errors.userEmail = InputErrors.emailError;
    } else {
      errors.userEmail = null;
    }
  }

  //   ----------------------

  // PASSWORD
  if (data.userPassword !== undefined) {
    // alert("Error message: " + errors.userPassword);
    if (!data.userPassword.trim()) {
      errors.userPassword = "Fill empty field!";
    } else if (!isUserPasswordValid(data.userPassword)) {
      errors.userPassword = InputErrors.passwordError;
    } else {
      errors.userPassword = null;
    }
  }

  //   ----------------------
  // DISPLAY NAME

  if (data.userDisplayName !== undefined) {
    if (!data.userDisplayName.trim()) {
      errors.userDisplayName = "Fill empty field!";
    } else if (data.userDisplayName.length < 1) {
      errors.userDisplayName = InputErrors.displayNameError;
    } else {
      errors.userDisplayName = null;
    }
  }

  //   ----------------------
  // AGE

  if (data.userAge !== undefined) {
    if (data.userAge !== null) {
      if (data.userAge < 14) {
        errors.userAge = InputErrors.ageError;
      } else if (data.userAge > 100) {
        errors.userAge = "Incorrect format!";
      } else {
        errors.userAge = null;
      }
    }
  }
  return errors;
}

export const invalidErrorExists = (errors: ValidationErrorsProps): boolean => {
  return Object.values(errors).some((err) => err !== null);
};
