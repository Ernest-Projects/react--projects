import { setAnimateActive, setGameStartState, setQuantityOfCards } from "../store/store";
import { useAppSelector, useAppDispatch } from "../hooks";
import { useRef } from "react";
export const SettingWindow = () => {
  // async await
  const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

  const buttonObject = {
    six: {
      text: "6",
    },
    eight: {
      text: "8",
    },
    twelwe: {
      text: "12",
    },
    eighthteen: {
      text: "18",
    },
  };
  const quantity = Object.values(buttonObject);
  const buttons = [];
  for (let i = 0; i < quantity.length; i++) {
    buttons.push(
      <button
        onClick={() => handleSetQuanitty(Number(quantity[i].text))}
        style={{ boxShadow: "inset 0 0 0 2px black, inset 0 0 0 4px white" }}
        className={`font-mono hover:scale-[1.05] transition duration-200 p-4 w-[25%] text-white `}
      >
        {quantity[i].text}
      </button>
    );
  }

  const isGameStarted = useAppSelector((state) => state.game.gameStartState);
  const quantityOfCards = useAppSelector((state) => state.game.quantityOfCards);
  const animate = useAppSelector((state) => state.game.animateActive);
  const dispatch = useAppDispatch();

  const settingsRef = useRef<HTMLElement>(null);

  const handleSetQuanitty = (quantity: number) => {
    if (quantity === 6) {
      dispatch(setQuantityOfCards(6));
    }
    else if (quantity === 8) {
      dispatch(setQuantityOfCards(8))
    }
    else if (quantity === 12) {
      dispatch(setQuantityOfCards(12))
    }
    else {
      dispatch(setQuantityOfCards(18))
    }
    console.log(quantityOfCards);
  };
  const handleAnimate = async () => {
    dispatch(setGameStartState());
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
        className={` 
         absolute left-6 w-[35rem] place-self-center  min-w-[25rem] place-self-center  aspect-[1/1] bg-[rgb(25,25,25)] p-2 transition flex flex-col justify-center align-center `}
      >
        <header className={`fonst-mono text-white text-4xl text-center `}>
          Cards setttings
        </header>
        <br />
        <div
          className={`relative border w-[100%] gap-[5%] flex align-center justify-center p-4 h-fit font-mono text-2xl text-white`}
        >
          {" "}
          {buttons}
        </div>
        <button
          onClick={() => handleAnimate()}
          style={{ transform: "rotateZ(0deg)" }}
          className={`font-mono transition text-white hover:scale-[1.2] w-[50%] bottom-[0] rounded-[.5rem] bg-red-500  p-4 place-self-center justify-center absolute `}
        >
          Start game
        </button>
      </section>
    </>
  );
};
