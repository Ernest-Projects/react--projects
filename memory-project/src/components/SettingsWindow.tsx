import {
  setGameStartState,
  setQuantityOfCards,
  setRestartTheGameButton,
  setSpeedOfCardAnimation,
} from "../store/store";
import { useAppSelector, useAppDispatch } from "../hooks";
import { useRef } from "react";
export const SettingWindow = () => {
  // async await
  const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

  // objects for repeating elemests

  const buttonObject = {
    buttons: [
      { quantity: "6" },
      { quantity: "8" },
      { quantity: "12" },
      { quantity: "18" },
       { quantity: "24"},
    ],
  };
  const speedChoiceObject = {
    buttons: [
      { speed: "0.5", context: "slow" },
      { speed: "1", context: "normal" },
      { speed: "2", context: "fast" },
      { speed: "4", context: "faster" },
      { speed: "5", context: "super fast" },
    ],
  };

  const speedButtons = speedChoiceObject.buttons;
  const speed = [];
  for (let i = 0; i < speedButtons.length; i++) {
    speed.push(
      <button
        onClick={() => handleSpeedOfAnimaion(Number(speedButtons[i].speed))}
        style={{ boxShadow: "inset 0 0 0 2px black, inset 0 0 0 4px white" }}
        className={`font-mono hover:scale-[1.05] transition duration-200 p-4 w-[100%] text-white `}
      >
        {speedButtons[i].context}
      </button>
    );
  }
  const quantityButtons = buttonObject.buttons;
  const quantity = [];
  for (let i = 0; i < quantityButtons.length; i++) {
    quantity.push(
      <button
        onClick={() => handleSetQuanity(Number(quantityButtons[i].quantity))}
        style={{ boxShadow: "inset 0 0 0 2px black, inset 0 0 0 4px white" }}
        className={`font-mono hover:scale-[1.05] transition duration-200 p-4 w-[100%] text-white `}
      >
        {quantityButtons[i].quantity}
      </button>
    );
  }

  const isGameStarted = useAppSelector((state) => state.game.gameStartState);
  const quantityOfCards = useAppSelector((state) => state.game.quantityOfCards);
  const bodyWidth = useAppSelector((state) => state.game.bodyWidth);
  const dispatch = useAppDispatch();

  const settingsRef = useRef<HTMLElement>(null);

  const handleSetQuanity = (quantity: number) => {
    if (quantity === 6) {
      dispatch(setQuantityOfCards(6));
    } else if (quantity === 8) {
      dispatch(setQuantityOfCards(8));
    } else if (quantity === 12) {
      dispatch(setQuantityOfCards(12));
    } else if (quantity === 18) {
      dispatch(setQuantityOfCards(18));
    }
    else if (quantity === 24) {
      dispatch(setQuantityOfCards(24));
    }
    dispatch(setRestartTheGameButton(false));
  };

  const handleSpeedOfAnimaion = (speed: number) => {
    dispatch(setSpeedOfCardAnimation(speed));
  };
  const handleAnimate = async () => {
    dispatch(setRestartTheGameButton(false));
    dispatch(setGameStartState(true));
    dispatch(setQuantityOfCards(quantityOfCards));
    const settingsStyle = settingsRef.current;
    if (!settingsStyle) return;
    await sleep(250);
    if (isGameStarted) {
      settingsStyle.style.position = "absolute";
    } else {
      settingsStyle.style.position = "relative";
    }
    await sleep(500);
  };

  return (
    <>
      <section
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgb(20,20,20), rgb(25,25,25)",
        }}
        ref={settingsRef}
        className={` ${bodyWidth < 1400 ? "" : "left-6"}
         absolute w-[35rem] place-self-center  min-w-[25rem] place-self-center  aspect-[1/1] bg-[rgb(25,25,25)] p-2 transition flex flex-col justify-center align-center `}
      >
        <header
          className={`fonst-mono place-self-center absolute top-[2rem] text-white text-4xl text-center `}
        >
          Cards setttings
        </header>
        <br />
        <div className="flex flex-row w-[100%]">
        <div
          className={`relative text-purple-400 w-[100%] gap-[5%] flex flex-col align-center justify-center p-4 h-fit font-mono text-md `}
        >
          {"Quantity of cards:"}
          {quantity}
        </div>
        <div
          className={`relative text-orange-400 w-[100%] gap-[5%] flex-col flex align-center justify-center p-4 h-fit font-mono text-md `}
        >
          {"Speed of card animation:"} 
          {speed}
        </div>

        </div>
        <button
          onClick={() => handleAnimate()}
          style={{ transform: "rotateZ(0deg)" }}
          className={`font-mono transition  text-white z-[100000] hover:scale-[1.2] w-[50%] bottom-[2rem] rounded-[.5rem] bg-[rgb(15,15,15)]  p-4 place-self-center justify-center absolute `}
        >
          {"Start game"}
        </button>
      </section>
    </>
  );
};
