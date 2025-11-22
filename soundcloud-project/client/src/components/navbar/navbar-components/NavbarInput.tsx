import { useState } from "react";
import {motion} from "motion/react";


export const NavbarInput =() => {

    const [isInputOnFocus,setIsInputOnFocus] = useState<boolean>(false);

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
            placeholder="Search"
            className={`w-[100%] h-[100%] p-[1rem] rounded-[.2rem] focus:border-none hover:outline-none focus:outline-none active:outline-none`}
          />
    </>
}