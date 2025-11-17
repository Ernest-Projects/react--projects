import {
  useRef,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";

import { Eye, EyeOff } from "lucide-react";

import { isPrimaryPointer, motion } from "motion/react";
import { input } from "motion/react-client";

import type { UserDataProps } from "../../types/withTypes";

interface AuthorizationProps {
  userLogged: boolean;
  loggedOrRegistered: boolean;
  
  onLoggedOrRegistered: () => void;
  
  handleSendUserData: (data: UserDataProps) => void;
} 
type UserRegistrationProps = {
  user_name: string;
  user_email: string;
  user_password: string;
  confirm_user_password: string;
};

type UserLoginProps = {
  user_name: string;
  user_password: string;
};

export const Authorization = ({
  loggedOrRegistered,
  onLoggedOrRegistered,

  handleSendUserData,
}: AuthorizationProps) => {
  // const [userName, setUserName] = useState<string>("");
  const [userDataRegistration, setUserDataRegistration] =
    useState<UserRegistrationProps>({
      user_name: "",
      user_email: "",
      user_password: "",
      confirm_user_password: "",
  });
  const [userDataLogin, setUserDataLogin] = useState<UserLoginProps>({
    user_name: "",
    user_password: "",
  });

  const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false);
  const buttonVisibleRef = useRef<HTMLButtonElement>(null);
  const inputPasswordRef = useRef<HTMLInputElement>(null);

  const handleSubmitUser = async () => {
    if (loggedOrRegistered == false) {
      const empty = Object.values(userDataRegistration).some(
        (item) => item === ""
      );

      //  checking the validity of the entered data

      if (empty) {
        alert("please, fill all fields, man!");
        return;
      }
      if (
        userDataRegistration.confirm_user_password !==
        userDataRegistration.user_password
      ) {
        alert("Fail to confirm password!");
        return;
      }
      if (
        !userDataRegistration.user_email.includes("@") ||
        userDataRegistration.user_email.length >= 51
      ) {
        alert("Wrong email.Try again");
        return;
      }

      const userData = { type: "registration", data: userDataRegistration };

      try {
        const responce = await fetch("http://localhost:4000/api/users/add", {
          method: "POST",
          headers: { "Content-Type": "Application/json" },
          body: JSON.stringify(userData),
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
          handleSendUserData(userData);
        } else {
          // if success is false (user already exsists)
          alert("User already exsists with this name! Please choose another");
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      const empty = Object.values(userDataLogin).some((item) => item === "");

      //  checking the validity of the entered data
      if (empty) {
        alert("please, fill all fields, man!");
        return;
      }

      const userData = { type: "login", data: userDataLogin };

      try {
        const responce = await fetch("http://localhost:4000/api/users/check", {
           method: "POST", headers: { "Content-Type": "Application/json" }, body: JSON.stringify(userData) 
        });

        console.log("user data? ", userData)

        if (!responce.ok) {
          console.error("Responce error (here, row 134):", responce.status);
        }

        const result = await responce.json();

        if (result.success) {
          console.log("user successfully finded in database!");
          if (!result.user) return
          handleSendUserData(userData);
        } else {
          alert("Wrong user name or password!");
        }
      } catch (err) {
        console.error(err);
      }
    }
  };
  // need to add boolean parameter for login/registration + set object {type: login/register, userData: {}}

  const handleSetUserData = (type: string, data: string) => {
    if (!loggedOrRegistered) {
      setUserDataRegistration((prev) => ({
        ...prev,
        [type]: data,
      }));
    } else {
      setUserDataLogin((prev) => ({
        ...prev,
        [type]: data,
      }));
    }
  };

  // button for login/registration switch
  const handleChangeUserEntry = (e: any) => {
    e.preventDefault();
    setUserDataLogin({
      user_name: "",
      user_password: "",
    });

    setUserDataRegistration({
      user_name: "",
      user_email: "",
      user_password: "",
      confirm_user_password: "",
    });

    setIsVisiblePassword(false);
  };

  //  uEffect for visible / transparent password button
  useEffect(() => {
    if (inputPasswordRef.current) {
      inputPasswordRef.current.type = isVisiblePassword ? "text" : "password";
    }
  }, [isVisiblePassword]);

  return (
    <>
      <motion.div className="border-red-500 px-[2rem] w-full h-full bg-red rounded-[1rem]">
        <header className="text-2xl pl-0 p-[1rem] font-bold">
          {" "}
          {loggedOrRegistered ? "Hello there, mate!" : "Are you new here?"}{" "}
        </header>

        {!loggedOrRegistered ? (
          <motion.section className="gap-[.75rem] flex flex-col">
            <form action="" className="">
              <header className="font-bold">Username: </header>
              <input
                className="border border-[rgba(15,18,51,1)]  p-[.2rem] px-[1rem]  focus:outline-none w-full rounded-[.25rem] border-[2px]"
                type="text"
                value={userDataRegistration.user_name}
                placeholder="Enter user name"
                onChange={(e) => handleSetUserData("user_name", e.target.value)}
              />
            </form>
            <form action="">
              <header className="font-bold">Email: </header>
              <input
                className="border border-[rgba(15,18,51,1)]  p-[.2rem] px-[1rem]  focus:outline-none w-full rounded-[.25rem] border-[2px]"
                type="text"
                value={userDataRegistration.user_email}
                placeholder="Enter user email"
                onChange={(e) =>
                  handleSetUserData("user_email", e.target.value)
                }
              />
            </form>
            <form action="" className="relative">
              <header className="font-bold">Password: </header>
              <input
                className="border border-[rgba(15,18,51,1)] focus:outline-none w-full p-[.2rem] px-[1rem] rounded-[.25rem] border-[2px]"
                type="password"
                ref={inputPasswordRef}
                value={userDataRegistration.user_password}
                maxLength={25}
                placeholder="Enter user password"
                onChange={(e) => {
                  handleSetUserData("user_password", e.target.value);
                  setIsVisiblePassword(false);
                }}
              />
              <button
                ref={buttonVisibleRef}
                onClick={(e) => {
                  setIsVisiblePassword((prev) => !prev);
                  e.preventDefault();
                }}
                className="absolute right-[.5rem]   aspect-[1/1] w-fit place-self-center border-red-500"
              >
                {" "}
                {isVisiblePassword ? <Eye /> : <EyeOff />}
              </button>
            </form>
            <form action="">
              <header className="font-bold">Confirm password: </header>
              <input
                className="border border-[rgba(15,18,51,1)]  p-[.2rem] px-[1rem]  focus:outline-none w-full rounded-[.25rem] border-[2px]"
                type="password"
                maxLength={25}
                value={userDataRegistration.confirm_user_password}
                placeholder="Confirm user password"
                onChange={(e) =>
                  handleSetUserData("confirm_user_password", e.target.value)
                }
              />
            </form>
          </motion.section>
        ) : (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: !loggedOrRegistered ? 0 : 1 }}
            className="gap-[1rem] flex flex-col"
          >
            <form action="" className="">
              <header className="font-bold">Username: </header>
              <input
                className="border border-[rgba(15,18,51,1)]  p-[.5rem] px-[1rem]  focus:outline-none w-full rounded-[.25rem] border-[2px]"
                type="text"
                value={userDataLogin.user_name}
                placeholder="Enter user name"
                onChange={(e) => handleSetUserData("user_name", e.target.value)}
              />
            </form>

            <form action="" className="relative">
              <header className="font-bold">Password: </header>
              <input
                className="border border-[rgba(15,18,51,1)]  p-[.5rem] px-[1rem]  focus:outline-none w-full rounded-[.25rem] border-[2px]"
                type="password"
                ref={inputPasswordRef}
                value={userDataLogin.user_password}
                maxLength={25}
                placeholder="Enter user password"
                onChange={(e) => {
                  handleSetUserData("user_password", e.target.value);
                  setIsVisiblePassword(false);
                }}
              />
              <button
                ref={buttonVisibleRef}
                onClick={(e) => {
                  setIsVisiblePassword((prev) => !prev);
                  e.preventDefault();
                }}
                className="absolute right-[.5rem]   aspect-[1/1] w-fit place-self-center border-red-500"
              >
                {" "}
                {isVisiblePassword ? <Eye /> : <EyeOff />}
              </button>
            </form>
          </motion.section>
        )}
        <motion.section
          animate={{ height: loggedOrRegistered ? "fit-content" : "full" }}
          className={`w-full gap-[1rem] flex flex-col my-[2rem]`}
        >
          <button
            className="bg-[rgba(15,18,51,1)] rounded-[.5rem] text-white font-bold py-[1rem]"
            onClick={() => handleSubmitUser()}
          >
            {loggedOrRegistered ? "Login" : "Register"}
          </button>
          <button onClick={() => onLoggedOrRegistered()}>
            {" "}
            {loggedOrRegistered
              ? "You don't have an acccount?"
              : "Do you have an account?"}{" "}
            <a
              onClick={(e) => {
                handleChangeUserEntry(e);
              }}
              className="text-blue-600"
              href=""
            >
              {loggedOrRegistered ? "Register" : "Log in"}
            </a>{" "}
          </button>
        </motion.section>
      </motion.div>
    </>
  );
};
