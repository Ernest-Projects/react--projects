// object typing for database
export type UserDataProps = {
    type: string,
    data: Record<string, unknown>
};


// props typization in Authorization compo
export interface AuthorizationProps {
  userLogged: boolean;
  loggedOrRegistered: boolean;
  
  onLoggedOrRegistered: () => void;
  handleSendUserData: (data: UserDataProps) => void;
};



// registration
export type UserRegistrationProps = {
  user_name: string;
  user_email: string;
  user_password: string;
  confirm_user_password: string;
};
// login
export type UserLoginProps = {
  user_name: string;
  user_password: string;
};