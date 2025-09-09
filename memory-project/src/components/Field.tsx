import { Cards } from "../cards";
import { Card } from "./Card";
import { useAppSelector } from "../hooks";
import { useEffect, useRef } from "react";
import { QueryStatus } from "@reduxjs/toolkit/query";

// field for cards
export const Field = () => {
    const sleep = (ms: number) => new Promise((res) => setTimeout(res,ms));
    const isGameState = useAppSelector((state) => state.game.gameStartState);
    const quantityOfCards = useAppSelector((state) => state.game.quantityOfCards);
    const fieldRef = useRef<HTMLElement>(null);

    useEffect(()=> {
      const asyncFunction = async () => {
        const fieldStyle = fieldRef.current;
        if (!fieldStyle) return
        fieldStyle.style.opacity = "0";
        fieldStyle.style.pointerEvents = "none";
        await sleep(400);
        if (quantityOfCards === 6) {
          fieldStyle.style.gridTemplateColumns = "repeat(3, minmax(0, 1fr))";
          fieldStyle.style.gridTemplateRows = "repeat(2, minmax(0, 1fr))";

        }
         if (quantityOfCards === 8) {
          fieldStyle.style.gridTemplateColumns = "repeat(4, minmax(0, 1fr))";
          fieldStyle.style.gridTemplateRows = "repeat(2, minmax(0, 1fr))";

        }
         if (quantityOfCards === 12) {
          fieldStyle.style.padding = "2rem";
          fieldStyle.style.gap = ".5rem";
          fieldStyle.style.gridTemplateColumns = "repeat(4, minmax(0, 1fr))";
          fieldStyle.style.gridTemplateRows = "repeat(3, minmax(0, 1fr))";

        }
         if (quantityOfCards === 18) {
          fieldStyle.style.gridTemplateColumns = "repeat(6, minmax(0, 1fr))";
          fieldStyle.style.gridTemplateRows = "repeat(3, minmax(0, 1fr))";
        }
       
        if(isGameState) {
          fieldStyle.style.transform = "rotateX(45deg) translateZ(-10rem)"
        }
        else {
          fieldStyle.style.transform = "rotateX(0deg) translateZ(-1rem)"
          fieldStyle.style.transformStyle ="none"
        }
        await sleep(400);
        fieldStyle.style.pointerEvents = "all";
        fieldStyle.style.opacity = "1"
      }
      asyncFunction()
    },[isGameState, quantityOfCards])

   

  return (
    <>
      <section ref = {fieldRef} style = {{ backgroundImage: "linear-gradient(to bottom, rgb(25,25,25), rgb(45,45,45))", transformStyle: "preserve-3d", transformOrigin: "50% 0%"}}
        className={`flex perspective-[1600px] transform  border  gap-[2rem] justify-center min-w-[25rem] transition duration-100 align-center bg-[rgb(25,25,25)] p-[4rem] opacity-100  relative  grid w-[100%] h-[100%]`}
      >
        {Object.values(Cards).slice(0, quantityOfCards).map((el, index) => { 
          return <Card key={index} name={el.id}></Card>;
        })}
      </section>
    </>
  );
};

// grid-cols-[repeat(auto-fit,minmax(150px,1fr))]