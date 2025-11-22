
import { setAuthorizationWindowId, setUserEmail } from "@redux-storage/authSlice";
import { motion } from "motion/react";


import {
  useAuthAppDispatch,
  useAuthAppSelector,
} from "@redux-hook/authHook";


export const SignInWindow = () => {

    
     const authorizationWindowId = useAuthAppSelector(
    (state) => state.authorization.authorizationWindowId
  );
    return <>
            <motion.section transition={{delay: 0}} initial = {{y: -1000}} animate = {{y: -1000}} className =  {`rounded-[.2rem] border w-[28rem]  place-self-center absolute h-[37.5rem] p-[1.5rem] bg-[rgb(18,18,18)]`}>
        </motion.section>
    </>
}