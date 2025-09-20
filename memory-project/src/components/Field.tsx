import { Card } from "./Card";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useEffect, useRef } from "react";
import { setGameStartState, setQuantityOfCards, setResetHisoryOfCards, setRestartTheGameButton } from "../store/store";

// field for cards
export const Field = () => {
    const sleep = (ms: number) => new Promise((res) => setTimeout(res,ms));
    const isGameState = useAppSelector((state) => state.game.gameStartState);
    const quantityOfCards = useAppSelector((state) => state.game.quantityOfCards);
    const cardsArray = useAppSelector((state) => state.game.cardsArray);
    const isGameEnded = useAppSelector((state) => state.game.isGameEnded);
 
    const fieldRef = useRef<HTMLElement>(null);
    const dispatch = useAppDispatch()

    // this function for button that reset all game 
  const handleResetGame = () => {
    dispatch(setGameStartState(true));
    dispatch(setQuantityOfCards(quantityOfCards));
    dispatch(setResetHisoryOfCards())
    dispatch(setRestartTheGameButton(false));
  }

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
          fieldStyle.style.gridTemplateColumns = "repeat(4, minmax(0, 1fr))";
          fieldStyle.style.gridTemplateRows = "repeat(3, minmax(0, 1fr))";
        }
         if (quantityOfCards === 18) {
          fieldStyle.style.gridTemplateColumns = "repeat(6, minmax(0, 1fr))";
          fieldStyle.style.gridTemplateRows = "repeat(3, minmax(0, 1fr))";
        }
       
        if(isGameState) {
          if (quantityOfCards === 24) {
          fieldStyle.style.gridTemplateColumns = "repeat(8, minmax(0, 1fr))";
          fieldStyle.style.gridTemplateRows = "repeat(3, minmax(0, 1fr))";
        }
          fieldStyle.style.transform = "rotateX(45deg) translateZ(-10rem) translateY(-10%)"
        }
        else {
          if (quantityOfCards === 24) {
          fieldStyle.style.gridTemplateColumns = "repeat(6, minmax(0, 1fr))";
          fieldStyle.style.gridTemplateRows = "repeat(4, minmax(0, 1fr))";
        }
          fieldStyle.style.transform = "rotateX(0deg) rotateY(-25deg) translateZ(-1rem)"
          fieldStyle.style.transformStyle ="none"
        }
        await sleep(400);
        fieldStyle.style.pointerEvents = "all";
        fieldStyle.style.opacity = "1"
      }
      asyncFunction()
    },[isGameState, quantityOfCards])
    // shadow for cards (SOOO STUPID)
    // const shadow = [];
    // for (let i =0; i < quantityOfCards; i++) {
    //   shadow.push(<p  className="w-[100%] h-[100%] flex justify-center pointer-events-none align-items">
    //     <p style = {{boxShadow: "0 0 10px 100px black"}} className={`transition duration-500 absolute place-self-center bg-black w-[10%] h-[20%] `} ></p>
    //   </p>)
    // }

  return (
    <>
      <section ref = {fieldRef} style = {{ backgroundImage: "linear-gradient(to bottom, rgb(25,25,25), rgb(45,45,45))", transformStyle: "preserve-3d", transformOrigin: "50% 0%"}}
        className={`flex ${isGameEnded ? "[transform:rotateX(35deg)] h-[25rem] opactity-0" : "[transform:rotateX(15deg)]"} perspective-[1000px] gap-[.5rem] min-w-[30rem] transform  border  justify-center  transition duration-100 align-center bg-[rgb(25,25,25)] p-[4rem]  relative  grid w-[100%] h-[100%]`}
      >
        {/* for shadows */}
        {/* <div ref = {shadowFieldRef} className="absolute  gap-[2rem] grid grid-cols-3 place-self-center border grid-rows-2 w-[100%] h-[100%]">
          {shadow}
 
           </div> */}
        {!isGameEnded ? Object.values(cardsArray).slice(0, quantityOfCards).map((el, index) => { 
          return <Card key={index} id = {index} value = {el.cardNumberAndImageObject} ></Card>;
        }): isGameState ? <button onClick={()=> handleResetGame()} className="font-mono text-3xl absolute text-white animate-ping transition duration-100 place-self-center w-full aspect-[1/1] hover:scale(1.05) bg-black rounded-[.5rem]">restart the game!</button> : Object.values(cardsArray).slice(0, quantityOfCards).map((el, index) => { 
          return <Card key={index} id = {index} value = {el.cardNumberAndImageObject} ></Card>;
        })}
      </section>
    </>
  );
};
