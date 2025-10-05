import { useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight,  } from "lucide-react";
import {
  useHomeAppDispatch,
  useHomeAppSelector,
} from "../../../../redux/hooks/homeHook";

import { motion} from "motion/react"
import { setMoveSlider } from "../../../../redux/storages/homeSlice";
// import {  } from "motion/react-client";

export const Slider = ({id}: {id: string}) => { 
  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
  
  const recomendationPlaylists = Array.from({length:15}, (_, i) => i);

  const sliderValue = useHomeAppSelector(
    (state) => state.home_page.sliders[id]
  );
  const dispatch = useHomeAppDispatch();

  const sliderRef = useRef<HTMLDivElement | null>(null);
  const arrowRightRef = useRef<HTMLButtonElement>(null);
  const arrowLeftRef = useRef<HTMLButtonElement>(null);


  const getQuarterOfScrollbarWindow = () => {
    if (!sliderRef.current) return 0
    return (sliderRef.current?.scrollWidth - sliderRef.current?.clientWidth) / 4; 
  }
  const getFullOfScrollbarWindow = () => {
     if (!sliderRef.current) return 0
    return (sliderRef.current?.scrollWidth - sliderRef.current?.clientWidth);
  } 
  useEffect(() => {

    const arrowRight = arrowRightRef.current;
    const arrowLeft = arrowLeftRef.current;

    if (!arrowRight || !arrowLeft) return;

    const displacementRight = async () => {
      dispatch(setMoveSlider({id, value:60, direction: "right"}));
      await sleep(200);
      dispatch(setMoveSlider({id, value:60, direction: "left"}));

    }
    const displacementLeft = async () => {
      dispatch(setMoveSlider({id, value:60, direction: "left"}));
      await sleep(200);
      dispatch(setMoveSlider({id, value:60, direction: "right"}));
    }
    arrowRight.addEventListener("mouseenter", displacementRight);
    arrowLeft.addEventListener("mouseenter", displacementLeft);

    return ()=> { arrowRight.removeEventListener("mouseenter", displacementRight) 
           arrowLeft.removeEventListener("mouseenter", displacementLeft)
    }
  },[dispatch]);
   
  useEffect(() => {
    if (sliderRef.current) {
        sliderRef.current.scrollTo({
            left: sliderValue,
            behavior: "smooth",
        })
        console.log(sliderRef.current.scrollWidth);
    }
  }, [sliderValue]);
  
  return (
    <>
      <main
        ref={sliderRef}
        className=" w-[100%] select-none pb-6 grid grid-cols-auto  grid-rows-1 overflow-hidden relative h-fit pt-2"
      >
        <button ref = {arrowRightRef} onClick = {()=> dispatch(setMoveSlider({id, value: getQuarterOfScrollbarWindow(), direction: "right"}))} className={`w-[2rem] ${(sliderValue == getFullOfScrollbarWindow() && sliderValue != 0) ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-all"} duration-200  fixed bg-[rgb(48,48,48)] transition lg:left-[60%] md:left-[52%] aspect-[1/1] place-self-center  z-[100]  rounded-[10rem]`}>
          <ArrowRight
            className="place-self-center text-white"
            size={15}
          ></ArrowRight>
        </button>
       
         <button ref = {arrowLeftRef} onClick = {()=> dispatch(setMoveSlider({id,value: getQuarterOfScrollbarWindow(), direction: "left"}))} className={`w-[2rem] ${(!sliderValue) ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-all"} duration-200 transition  fixed bg-[rgb(48,48,48)] left-[1rem] aspect-[1/1] place-self-center  z-[100]  rounded-[10rem]`}>
            <ArrowLeft
            className="place-self-center text-white"
            size={15}
          ></ArrowLeft>
        </button>
        <motion.section
          className={`flex flex-row relative w-fit  py-2 gap-x-[1rem] grid-rows-1   `}
        >
          {recomendationPlaylists.map((item, index) => (
            <motion.div className="flex h-full  flex-col   overflow-[hidden]  w-fit">
              <div className=" lg:h-[10rem] md:h-[8rem] lg:w-[10rem] md:w-[8rem]  rounded-[.5rem] overflow-hidden">
                <img
                  src="https://i1.sndcdn.com/artworks-FzJ3RGZo9g5vUILH-uB58tA-t500x500.jpg"
                  className="w-full h-full aspect-[1/1]" 
                  style={{ objectFit: "fill" }}
                  alt=""
                />
              </div>
              <p className="font-bold whitespace-nowrap lg:text-[14px] md:text-[12px] overflow-hidden text-ellipsis lg:w-[10rem] md:w-[8rem]  text-white ">
              <span>
                Pianissimo Epilogue - Silent Hill 2 (Slowed Reverbed and
                Extended) <br /> <span className="text-[rgb(152,152,152)] text-ellipsis whitespace-nowrap">
                    Old account Follow nigga - 
                Extended
                </span>
                </span>
              </p>
              {/* <p className="text-white"> {item}</p> */}
            </motion.div>
          ))}

        </motion.section>
      </main>
    </>
  );
};
