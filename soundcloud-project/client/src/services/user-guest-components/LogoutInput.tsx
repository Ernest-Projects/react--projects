import { useState } from "react";
import {motion} from "motion/react";


export const LogoutInput =() => {

    const [isInputOnFocus,setIsInputOnFocus] = useState(false);

    return <>
     <motion.input
            onFocus={() => setIsInputOnFocus(true)}
            onBlur={() => setIsInputOnFocus(false)}
            animate={{
              boxShadow: isInputOnFocus
                ? "0px 0px 0px .5px rgb(152,152,152)"
                : "0px 0px 0px 0px rgb(152,152,152)", 
            }}
            transition={{duration: 0.3}}
            type="text"
            placeholder="Search for artist, bands, tracks, podcasts"
            className={`w-[100%]  h-[100%] p-[1rem] text-sm rounded-[.2rem] focus:border-none hover:outline-none focus:outline-none active:outline-none`}
          />
    </>
}