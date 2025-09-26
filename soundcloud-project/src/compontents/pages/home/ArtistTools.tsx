import { motion,AnimatePresence } from "motion/react";
import { ChevronDown,Sparkles, Sparkle} from "lucide-react";
import {
  useHomeAppDispatch,
  useHomeAppSelector,
} from "../../../redux/hooks/homeHook";
import { ArtistToolsButtons } from "./homeConfig";
import { setIsToolsOpened } from "../../../redux/storages/homeSlice";
export const ArtistTools = () => {
    
    const toolsOpened = useHomeAppSelector(
      (state) => state.home_page.isToolsOpened
    );
    const dispatch = useHomeAppDispatch();
  return (
    <>
      <motion.section transition={{duration: 0.1}} className="h-fit w-[100%]  relative ">
        <div className="w-[100%] h-fit relative flex flex-cols justify-between pb-6 ">
          <header className="font-bold text-sm text-white">ARTIST TOOLS</header>
          <motion.div className="flex justify-center" animate={{ rotate: toolsOpened ? 180 : 0 }}>
            <button className="hover:pointer  place-self-center">
              <ChevronDown
                className="hover:pointer place-self-center text-white"
                onClick={() => dispatch(setIsToolsOpened())}
              />
            </button>
          </motion.div>
          <p className="w-[100%] h-[.2px] bottom-[1.5rem] absolute bg-[rgb(70,70,70)]"></p>
        </div>
        <motion.div
          style={{ gridTemplateRows: "auto auto" }}
          animate={{
            height: toolsOpened ? "auto" : "fit-content",
          }}
          className="w-[100%] h-fit  grid gap-x-[.6rem] gap-y-[1rem] grid-cols-4 relative"
        >
            <AnimatePresence>
          {ArtistToolsButtons.slice(0, toolsOpened ? 8 : 4).map(
            (item, index) => (

                <motion.button
                animate={{ opacity: 1, scale: 1 }}
                initial={{ opacity: 0, scale: 0.9 }}
                exit={{opacity: 0, scale: 0.9}}
                transition={{ duration: 0.1 }}
                key={index}
                className="border grid p-2 grid-rows-2 group overflow-hidden relative grid-cols-1 align-center justify-center border-[rgb(70,70,70)] w-[100%] h-full rounded-[.5rem] "
                >
                <div className="w-[60%] aspect-[1/1]  place-self-center  h-fit">
                  <img
                    className="w-[100%] h-[100%]"
                    style={{ objectFit: "contain" }}
                    src={item.image}
                    alt=""
                    />
                </div>
                <div className="text-white text-sm text-center pt-4">
                  {item.content}
                </div>
                            <Sparkle size = {45} className="text-[rgb(117,100,245)] absolute top-[-10px] right-[-10px]  place-self-center px-4"/>
                            <motion.div className="w-full ease-out transition group-hover:opacity-100 pointer-events-none  opacity-0 duration-400 h-fit bg-[rgb(117,100,245)] absolute bottom-4">Upgrade</motion.div>
              </motion.button>
            )
        )}
        </AnimatePresence>
        </motion.div>
        <div className=" w-full flex flex-cols align-center  bg-[rgb(50,44,91)] rounded-[.3rem] my-[1rem] h-[3rem]">
            <Sparkles size = {50} className="text-[rgb(111,94,230)]  place-self-center px-4"/>
            <p className="text-white text-sm place-self-center">Unlock Artist tools from UAH 69.99/month.</p>
        </div>
      </motion.section>
    </>
  );
};
