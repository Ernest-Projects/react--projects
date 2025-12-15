export interface UserLoginDataProps  {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  email: string;
  email_verified: boolean;
  locale: string;
}


// google responce after choosing google account
export interface GoogleLoginResponceProps  {
  access_token: string;
  authuser?: string;
  expires_in: number;
  prompt: string;
  scope: string;
  token_type: string;
}

// This marker indicates whether the user is logging in manually or through Google.
export type Provider  = "local" | "google" | null;
 

// user input data entered by himself
export interface UserInputDataProps {
  userEmail: string;
  userPassword: string;
  userDisplayName: string;
  userAge: number | null;
  userGender: "male" | "female" | null;
  provider: Provider
}
