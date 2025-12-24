// animations
import { AnimatePresence } from "motion/react";
import {motion} from "motion/react";

// router
import { Route, Routes, Navigate, Outlet } from "react-router-dom";
import { UndergroundResources } from "@global/UndergroundResources";
import  {LibraryTabs } from "../components/library-sections/index";


export const Library = () => {

return (<> 
 
<AnimatePresence>
<motion.main initial = {{opacity: 0, y: 0}} animate = {{opacity:1, y: 10}} className="flex flex-col h-fit  gap-[3rem]"> 
 
    <LibraryTabs></LibraryTabs>
    
    <Outlet/>    {/* see router.tsx */}

    <UndergroundResources></UndergroundResources>
</motion.main>
    </AnimatePresence> 
</>);
};
