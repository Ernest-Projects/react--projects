import { useEffect, useRef , useState } from "react";
import { ArrowLeft, ArrowRight,  } from "lucide-react";

import { motion} from "motion/react"
import { TrackTitle } from "./TrackTitle";
// import {  } from "motion/react-client";

type CardTitlesProps = {
  image: string,
  type: string,
  title: {
    header: string,
    subtitle: string
  }
}
type SliderProps = {
  content: CardTitlesProps[]
}

export const Slider = ({content}: SliderProps) => { 
  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
  
  // const recomendationPlaylists = Array.from({length:15}, (_, i) => i);

  const sliderRef = useRef<HTMLDivElement | null>(null);
  const arrowRightRef = useRef<HTMLButtonElement>(null);
  const arrowLeftRef = useRef<HTMLButtonElement>(null);

  const [moveSlider, setMoveSlider] = useState<number>(0);

  const getQuarterOfScrollbarWindow = () => {
    if (!sliderRef.current) return 0
    return (sliderRef.current?.scrollWidth - sliderRef.current?.clientWidth) / 4; 
  }
  const getFullOfScrollbarWindow = () => {
     if (!sliderRef.current) return 0
    return (sliderRef.current?.scrollWidth - sliderRef.current?.clientWidth);
  } 
  const setSliderPosition = (value: number, direction: string) =>  {
    if (direction == "right") {
      setMoveSlider((prev) => prev += value)
    }
    else if (direction == "left") {
      setMoveSlider((prev) => prev -= value)
    }
  }
  useEffect(() => {

    const arrowRight = arrowRightRef.current;
    const arrowLeft = arrowLeftRef.current;

    if (!arrowRight || !arrowLeft) return;
    
    const displacementRight = async () => {
      setSliderPosition( 60, "right");
      await sleep(200);
      setSliderPosition(60, "left");
    }
    const displacementLeft = async () => {
      setSliderPosition( 60, "left");
      await sleep(200);
      setSliderPosition( 60, "right");
    }
    arrowRight.addEventListener("mouseenter", displacementRight);
    arrowLeft.addEventListener("mouseenter", displacementLeft);

    return ()=> { arrowRight.removeEventListener("mouseenter", displacementRight) 
           arrowLeft.removeEventListener("mouseenter", displacementLeft)
    }
  },[moveSlider]);
   
  useEffect(() => {
    if (sliderRef.current) {
        sliderRef.current.scrollTo({
            left: moveSlider,
            behavior: "smooth",
        })
        console.log(sliderRef.current.scrollWidth);
    }
  }, [moveSlider]);
  
  return (
    <>
      <main
        ref={sliderRef}
        className=" w-[100%] select-none pb-6 grid grid-cols-auto  grid-rows-1 overflow-hidden relative h-fit pt-2"
      >
        <button ref = {arrowRightRef} onClick = {()=> setSliderPosition(getQuarterOfScrollbarWindow(), "right")} className={`w-[2rem] ${(moveSlider == getFullOfScrollbarWindow() && moveSlider != 0) ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-all"} duration-200  fixed bg-[rgb(48,48,48)] transition lg:left-[61%] md:left-[53%] aspect-[1/1] place-self-center  z-[100]  rounded-[10rem]`}>
          <ArrowRight
            className="place-self-center text-white"
            size={15}
          ></ArrowRight>
        </button>
         <button ref = {arrowLeftRef} onClick = {()=>  setSliderPosition(getQuarterOfScrollbarWindow(), "left")} className={`w-[2rem] ${(!moveSlider) ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-all"} duration-200 transition  fixed bg-[rgb(48,48,48)] left-[1rem] aspect-[1/1] place-self-center  z-[100]  rounded-[10rem]`}>
            <ArrowLeft
            className="place-self-center text-white"
            size={15}
          ></ArrowLeft>
        </button>
        <motion.section
          className={`flex flex-row relative w-fit  py-2 gap-x-[1.5rem] grid-rows-1`}
        >
          {content.map((item, index) => (
          <TrackTitle key = {index} trackData = {item}></TrackTitle>
          ))}
        </motion.section>
      </main>
    </>
  );
};