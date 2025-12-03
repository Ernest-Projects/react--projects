import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Sparkles, Sparkle } from "lucide-react";
import { ArtistToolsButtons } from "../homeConfig";

import {useState} from "react";
import { div } from "motion/react-client";

export const ArtistTools = () => {


  const [isToolsOpened, setIsToolsOpened] = useState<boolean>(false)
  
  return (
    <>
      <motion.section
        transition={{ duration: 0.1 }}
        className="h-fit w-[100%]   relative "
      >
        <button  onClick={() => setIsToolsOpened(prev => !prev)} className="w-[100%] h-fit relative flex flex-cols justify-between pb-6 ">
          <header className="font-bold text-sm text-white">ARTIST TOOLS</header>
          <motion.div
            className="flex justify-center"
            animate={{ rotate: isToolsOpened ? 180 : 0 }}
          >
            <button className="hover:pointer border-none w-[75%] place-self-end">
              <ChevronDown
                className="hover:pointer place-self-center text-white"
              />
            </button>
          </motion.div>
          <p className="w-[100%] h-[.2px] bottom-[1.5rem] pointer-events-none absolute bg-[rgb(70,70,70)]"></p>
        </button>
        <motion.div
          style={{ gridTemplateRows: "auto auto" }}
          animate={{
            height: isToolsOpened ? "auto" : "fit-content",
            rowGap: isToolsOpened ? "1rem" : "0rem",
          }}
          className={`w-[100%] h-fit  grid gap-x-[.6rem] grid-y-[1rem] grid-cols-4 relative`}
        >
            {ArtistToolsButtons.slice(0, isToolsOpened ? 8 : 4).map(
              (item, index) => (
                                <motion.div
                  animate={{ opacity: 1, scale: 1 }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.1 }}
                  key={index}
                  className="border grid p-2 min-w-[3rem] grid-rows-2 group overflow-hidden relative grid-cols-1 align-center justify-center border-[rgb(70,70,70)] h-full rounded-[.5rem] "
                >
                  <div className="w-[50%] aspect-[1/1]  place-self-center  h-fit">
                    <img
                      className="w-[100%] h-[100%]"
                      style={{ objectFit: "contain" }}
                      src={item.image}
                      alt=""
                    />
                  </div>
                  <div className="text-white text-sm relative  text-center place-content-center pt-2">
                    <p className="text-[.7rem]">
                      {item.content}
                      
                      </p>
                    <motion.div className={`w-[150%] ease-out transition  group-hover:opacity-100 place-self-center text-[.7rem]  text-black font-bold pointer-events-none place-self-center opacity-0 bottom-1 duration-100  ${index == 7 || index == 6 ? "bg-[rgb(186,158,94)]" : "bg-[rgb(117,100,245)]"} h-fit bg-[rgb(117,100,245)] absolute`}>
                      Upgrade
                    </motion.div>
                  </div>
                  <Sparkle
                    size={45}
                    className={` ${index == 7 || index == 6 ? "text-[rgb(186,158,94)]" : "text-[rgb(117,100,245)]"} absolute top-[-10px] right-[-10px]  place-self-center px-4`}
                  />
                </motion.div>
              )
            )}
        </motion.div>
        <div className=" w-full flex flex-cols align-center  bg-[rgb(50,44,91)] rounded-[.3rem] my-[1rem] h-fit ">
          <Sparkles
            size={50}
            className="text-[rgb(111,94,230)]  place-self-center px-4"
          />
          <p className="text-white text-[.8rem]  place-self-center">
            Unlock Artist tools from UAH 69.99/month.
          </p>
        </div>
      </motion.section>
    </>
  );
};
