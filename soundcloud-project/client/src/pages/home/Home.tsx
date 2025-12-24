import React from "react";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";

import { ChevronDown } from "lucide-react";
// redux
import {
  useHomeAppDispatch,
  useHomeAppSelector,
} from "@redux-hook/homeHook";

import { ArtistTools } from "./right sections/ArtistTools";
// import { setIsToolsOpened } from "../../../redux/storages/homeSlie";
// import { Slider } from "../../global/Slider";
import { SlidersContent } from "./homeConfig";
import { setIsUserLogged, setIsUserLoggedValue } from "@redux-storage/authSlice";
import { UndergroundResources } from "@global/UndergroundResources";
import { useAuthAppDispatch, useAuthAppSelector } from "@redux-hook/authHook";
import { useNavigate } from "react-router-dom";

export const Home = () => {

      const isUserLogged = useAuthAppSelector((state)=> state.authorization.isUserLogged)
 
      const navigate = useNavigate();
  const dispatch = useHomeAppDispatch();

  const handleSignOut = () => {
    navigate("/logout");
    dispatch(setIsUserLoggedValue({logged: false}))
  }

  return (
    <>
        <AnimatePresence>
      <motion.main data-cy = "home-page"
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 10 }}
        className="relative pt-2 z-[100] w-[100%]  h-[100vh] grid grid-rows-1 md:grid-cols-10 lg:grid-cols-9"
      >
        
        <section className=" w-[100%] h-[200vh]  relative col-span-6 flex flex-col pt-4 pr-4">
         {SlidersContent.map((item, index) => (
           <div key = {index}>
              <header className='text-white text-2xl font-bold'>{item.title}</header>
          {/* <Slider content = {LikedCardsObject}></Slider> */}
          </div>
         ))}
          <button data-cy = "logout-test-button" onClick={()=> handleSignOut} className="text-4xl text-black bg-white rounded-[.5rem]">Log out</button>
        </section>

        <section className="h-fit w-[100%] sticky bottom-0 pl-2 py-2 relative lg:col-span-3 md:col-span-4">

          {isUserLogged &&
          <ArtistTools/>
        }
         <UndergroundResources/>
        </section>
      </motion.main>
          </AnimatePresence>
    </>
  );
};
