import React from "react";
import { useEffect, useRef } from "react";
import { motion } from "motion/react";

import { ChevronDown } from "lucide-react";
// redux
import {
  useHomeAppDispatch,
  useHomeAppSelector,
} from "../../../redux/hooks/homeHook";

import { ArtistTools } from "./ArtistTools";
import { setIsToolsOpened } from "../../../redux/storages/homeSlice";

export const Home = () => {
  // const  = us
  const toolsOpened = useHomeAppSelector(
    (state) => state.home_page.isToolsOpened
  );
  const dispatch = useHomeAppDispatch();
  return (
    <>
      <motion.main
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 10 }}
        className="relative pt-2 z-[100] w-[100%]  h-fit grid grid-rows-1 grid-cols-8"
      >
        <section className=" w-[100%] h-fit col-span-5 pr-6">
          <header className="text-white text-lg">More of what you like</header>
        </section>

        <section className="h-fit w-[100%]  px-2 py-2 relative col-span-3">
         <ArtistTools></ArtistTools>
        </section>
      </motion.main>
    </>
  );
};
