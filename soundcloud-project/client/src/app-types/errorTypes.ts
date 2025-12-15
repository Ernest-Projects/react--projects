
// error validation  messages for inputs validations
export interface ValidationErrorsProps {
  userEmail: null | string;
  userPassword: null | string;
  userDisplayName: null | string;
  userAge: null | string;
}

export type AuthFieldType = "userEmail" | "userPassword" | "userDisplayName" | "userAge";