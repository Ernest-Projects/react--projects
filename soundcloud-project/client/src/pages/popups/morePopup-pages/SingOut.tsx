import { UndergroundResources } from "@global/UndergroundResources"
import {motion} from "motion/react";
import { li } from "motion/react-m";
import {useState} from "react";

export const SignOut = () =>{

    return <>
    <motion.main data-cy = "sign-out-window"
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 10 }} className="flex justify-center flex-col h-fit  align-center w-full">
    <header className="text-3xl font-semibold text-white py-[5rem] place-self-center"> You've signed out. Now go mobile!</header>

        <UndergroundResources/>
    </motion.main>
    </>
}