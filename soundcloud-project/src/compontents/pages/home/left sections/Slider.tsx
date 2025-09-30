import React from "react";
import { useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  useHomeAppDispatch,
  useHomeAppSelector,
} from "../../../../redux/hooks/homeHook";

import { AnimatePresence, motion} from "motion/react"
import { setMoveSlider } from "../../../../redux/storages/homeSlice";

export const Slider = ({id}: {id: string}) => {
  const recomendationPlaylists = [
    1, 2, 14, 15, 16, 17, 18, 19, 20,1, 2, 14, 15, 16, 17, 18, 19, 20,1, 2, 14, 15, 16, 17, 18, 19, 20,1, 2, 14, 15, 16, 17, 18, 19, 20,1, 2, 14, 15, 16, 17, 18, 19, 20,
  ];

  const sliderValue = useHomeAppSelector(
    (state) => state.home_page.sliders[id]
  );
  const dispatch = useHomeAppDispatch();

  const sliderRef = useRef<HTMLDivElement | null>(null);

  const getQuarterOfScrollbarWindow = () => {
    if (!sliderRef.current) return 0
    return (sliderRef.current?.scrollWidth - sliderRef.current?.clientWidth) / 4; 
  }
  const getFullOfScrollbarWindow = () => {
     if (!sliderRef.current) return 0
    return (sliderRef.current?.scrollWidth - sliderRef.current?.clientWidth);
  }
  
  useEffect(() => {
    if (sliderRef.current) {
        sliderRef.current.scrollTo({
            left: sliderValue,
            behavior: "smooth"
        })
        console.log(sliderRef.current.scrollWidth);
    }
  }, [sliderValue]); 
  
  return (
    <>
      <main
        ref={sliderRef}
        className=" w-[100%]  grid grid-cols-auto  grid-rows-1 overflow-hidden relative h-fit pt-2"
      >
        <motion.button initial = {{scale: 1, opacity: 1, pointerEvents: "all"}} animate = {(sliderValue == getFullOfScrollbarWindow()) ? {scale: 0, opacity: 0}  : {scale: 1, opacity: 1}} onClick = {()=> dispatch(setMoveSlider({id, value: getQuarterOfScrollbarWindow(), direction: "right"}))} className="w-[2rem] opacity-100 fixed bg-[rgb(48,48,48)] left-[59%] aspect-[1/1] place-self-center  z-[100]  rounded-[10rem]">
          <ArrowRight
            className="place-self-center text-white"
            size={15}
          ></ArrowRight>
        </motion.button>
       
         <motion.button initial = {{scale: 1, opacity: 1, pointerEvents: "all"}} animate = {!sliderValue ? {scale: 0, opacity: 0}  : {scale: 1, opacity: 1}} onClick = {()=> dispatch(setMoveSlider({id,value: getQuarterOfScrollbarWindow(), direction: "left"}))} className="w-[2rem] opacity-100 fixed bg-[rgb(48,48,48)] left-[1rem] aspect-[1/1] place-self-center  z-[100]  rounded-[10rem]">
            <ArrowLeft
            className="place-self-center text-white"
            size={15}
          ></ArrowLeft>
        </motion.button>
        <motion.section
          className={`flex flex-row relative w-fit h-[14rem]   py-2 gap-x-[1rem] grid-rows-1   `}
        >
          {recomendationPlaylists.map((item, index) => (
            <div className="flex h-full   flex-col   overflow-[hidden]  w-fit">
              <div className=" h-[10rem]  aspect-[1/1]  rounded-[.5rem] overflow-hidden">
                <img
                  src="https://i1.sndcdn.com/artworks-FzJ3RGZo9g5vUILH-uB58tA-t500x500.jpg"
                  className="w-full h-full aspect-[1/1]"
                  style={{ objectFit: "fill" }}
                  alt=""
                />
              </div>
              <p className="font-bold whitespace-nowrap text-[14px] overflow-hidden text-ellipsis w-[10rem]  text-white ">
              <span>
                Pianissimo Epilogue - Silent Hill 2 (Slowed Reverbed and
                Extended) <br /> <span className="text-[rgb(152,152,152)] text-ellipsis whitespace-nowrap">
                    Old account Follow nigga - 
                Extended
                </span>
                </span>
              </p>
              {/* <p className="text-white"> {item}</p> */}
            </div>
          ))}

          {/* </div>
      <div className='flex h-full flex-row pb-4 border borde-red-500 w-[20%]'>   
        <div className=" aspect-[1/1] rounded-[.5rem] overflow-[]">
        <img src="https://i1.sndcdn.com/artworks-FzJ3RGZo9g5vUILH-uB58tA-t500x500.jpg" className='w-full h-full' style = {{objectFit: "contain"}} alt="" />
        </div>
    </div>
      <div  className='flex h-full flex-row pb-4 border borde-red-500 w-[20%]'>   
        <div className=" aspect-[1/1] rounded-[.5rem] overflow-[]">
        <img src="https://i1.sndcdn.com/artworks-FzJ3RGZo9g5vUILH-uB58tA-t500x500.jpg" className='w-full h-full' style = {{objectFit: "contain"}} alt="" />
        </div>
    </div>
      <div className='flex h-full flex-row pb-4 border borde-red-500 w-[20%]'>   
        <div className=" aspect-[1/1] rounded-[.5rem] overflow-[]">
        <img src="https://i1.sndcdn.com/artworks-FzJ3RGZo9g5vUILH-uB58tA-t500x500.jpg" className='w-full h-full' style = {{objectFit: "contain"}} alt="" />
        </div>
    </div> */}
        </motion.section>
      </main>
    </>
  );
};
