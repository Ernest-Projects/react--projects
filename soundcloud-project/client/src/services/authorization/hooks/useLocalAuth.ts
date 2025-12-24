import { resourceUsage } from "process";
import type { UserInputDataProps } from "../../../app-types/loginTypes";


type ServerResponce = | {ok: true} | {ok: false; reason: "USER_EXISTS"}
    | {ok: false; reason: "SERVER_ERROR"}



  // request to the server
 export const useLocalAuth = async (inputData:UserInputDataProps ): Promise<ServerResponce> => {
    try {
      const user = {
          user_display_name: inputData.userDisplayName,
        user_email: inputData.userEmail,
        user_password: inputData.userPassword,
        user_age: inputData.userAge,
        user_gender: inputData.userGender,
        provider: inputData.provider
      };
      console.log("---------------------------------------: ");

      console.log("user entered all data: ", user);

      const responce = await fetch(`${import.meta.env.VITE_API_USER_LOCAL_URL}`, { // from .env
        method: "POST",
        headers: { "Content-Type": "Application/json" },
        body: JSON.stringify({
          data: user,
        }),
      });

      //  if responce cant be reached
      if (!responce.ok) {
        console.error("Responce error:", responce.status);
        return {ok: false, reason: "SERVER_ERROR"}
      }

      const result = await responce.json();
      console.log("Server responce: ", result);
      // alert("responce: " + result);

      //  success? Add data in uState
      if (result.success) {
        console.log("data successfully added in database!");
        // alert("data successfult added in database!")
        return {ok: true}
        // if user data successfuly setted in database
        // handleLoginUser();
      }
      if (result.message == "user exist") {
        // if success is false (user already exsists)
        // alert("User already exists with this name! Please choose another");
        return {ok: false, reason: "USER_EXISTS"};
      }

        return {ok: false, reason: "SERVER_ERROR"};


    } catch (err) {
      console.error(err);
              return {ok: false, reason: "SERVER_ERROR"};

    }
  };