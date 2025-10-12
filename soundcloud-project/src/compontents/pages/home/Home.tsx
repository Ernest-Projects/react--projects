import React from "react";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";

import { ChevronDown } from "lucide-react";
// redux
import {
  useHomeAppDispatch,
  useHomeAppSelector,
} from "../../../redux/hooks/homeHook";

import { ArtistTools } from "./right sections/ArtistTools";
import { setIsToolsOpened } from "../../../redux/storages/homeSlice";
import { Slider } from "../../global/Slider";
import { SlidersContent } from "./homeConfig";

export const Home = () => {

      const LikedCardsObject = Array.from({length: 15}, (_, i) =>({image: `https://picsum.photos/300/200?random=${i}`, type: "track", title: {header: `Track name ${i}`, subtitle:`track author ${i}`}})) 
 
  // const  = us
  const toolsOpened = useHomeAppSelector(
    (state) => state.home_page.isToolsOpened
  );
  const dispatch = useHomeAppDispatch();
  return (
    <>
        <AnimatePresence>
      <motion.main
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 10 }}
        className="relative pt-2 z-[100] w-[100%]  h-[100vh] grid grid-rows-1 md:grid-cols-10 lg:grid-cols-9"
      >
        
        <section className=" w-[100%] h-[200vh]  relative col-span-6 flex flex-col pt-4 pr-4">
         {SlidersContent.map((item, index) => (
           <div key = {index}>
              <header className='text-white text-2xl font-bold'>{item.title}</header>
          <Slider content = {LikedCardsObject}></Slider>
          </div>
         ))}
        </section>

        <section className="h-fit w-[100%] sticky bottom-0 pl-2 py-2 relative lg:col-span-3 md:col-span-4">
         <ArtistTools></ArtistTools>
        </section>
      </motion.main>
          </AnimatePresence>
    </>
  );
};
