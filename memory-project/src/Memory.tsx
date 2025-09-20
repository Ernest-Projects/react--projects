import { useAppSelector, useAppDispatch } from "./hooks";
import styles from "./Memory.module.scss";
import { Field } from "./components/Field";
import { SettingWindow } from "./components/SettingsWindow";

//  imported package! (not for vercel)
// import { DarkLight } from "project-additions";

import { useEffect, useRef } from "react";
import { setBodyWidth, setGameStartState, setQuantityOfCards, setThemeMode } from "./store/store";

function Memory() {
  const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));
  let elements = [];
  for (let i = 0; i < 91; i++) {
    elements.push(
      <div
        className={` ${styles.backgroundRotate} transform bg-[radial-gradient(rgb(65,65,65),rgb(25,25,25))] transition duration-200 animate-ping overflow-hidden bg-[rgb(45,45,45)] absolute top-[0] aspect-[1/1] w-[100px] relative flex justify-center `}
      >
        {" "}
        <span className=" rounded-[10rem] absolute place-self-center  aspect-[1/1] w-[1rem] z-[5] bg-[rgb(20,20,20)]"></span>{" "}
        <p
          className={`rounded-[10rem] w-full aspect-[1/1] absolute left-[50%] top-[-50%] bg-[rgb(35,35,35)]`}
        ></p>{" "}
        <p
          className={`rounded-[10rem] w-full aspect-[1/1] absolute left-[-50%] top-[50%] bg-[rgb(35,35,35)]`}
        ></p>{" "}
        <p
          className={`rounded-[10rem] w-full aspect-[1/1] absolute left-[-50%] top-[-50%] bg-[rgb(35,35,35)]`}
        ></p>{" "}
        <p
          className={`rounded-[10rem] w-full aspect-[1/1] absolute left-[50%] top-[50%] bg-[rgb(35,35,35)]`}
        ></p>
      </div>
    );
  }

  const isGameState = useAppSelector((state) => state.game.gameStartState);
  const bodyWidth = useAppSelector((state) => state.game.bodyWidth);
  const quantityOfCards = useAppSelector((state) => state.game.quantityOfCards);
  const isMode = useAppSelector((state) => state.game.themeMode);
  const dispatch = useAppDispatch();

  const loadingRef = useRef<HTMLDivElement>(null);

  const handleStartFinishGame = () => {
    dispatch(setGameStartState(false))
    dispatch(setQuantityOfCards(quantityOfCards));
  }

  useEffect(() => {
    const asyncFunction = async () => {
      const loadingStyle = loadingRef.current;
      if (!loadingStyle) return;
      loadingStyle.style.opacity = "1";
      loadingStyle.style.pointerEvents = "none";
      await sleep(200);
      loadingStyle.style.opacity = "0";
    };
    asyncFunction();
  }, [isGameState]);

  useEffect(() => {
    const handleChangeThemeKey = (event: KeyboardEvent) => {
      if (event.ctrlKey && (event.key == "r" || event.key == "R")) {
        event.preventDefault();
        dispatch(setThemeMode());
      }
       if (event.ctrlKey && (event.key == "e" || event.key == "E")) {
        event.preventDefault();
      }
    }
    window.addEventListener("keydown", handleChangeThemeKey);
    return () => (window.removeEventListener("keydown", handleChangeThemeKey))
  }, )

  useEffect(() => {
    const resizeBodyWidth = () => {
      dispatch(setBodyWidth(document.body.offsetWidth));
    };
    addEventListener("resize", resizeBodyWidth);
    return () => removeEventListener("resize", resizeBodyWidth);
  }, [document.body.offsetWidth]);

  return (
    <>
      <div
        ref={loadingRef}
        className={`bg-[rgb(25,25,25)] transition duration-200 w-[100vw] overflow-[hidden] overflow-hidden h-[100vh] pointer-events-none opacity-0 absolute z-[100]`}
      ></div>
      <main
        className={` ${isMode ? "invert" : ""} transition duration-200 w-[100vw]  flex z-[1] justify-center align-center border relative gap-[1%] bg-[rgb(35,35,35)] m-0 p-[1%]  h-[100vh]`}
      >
        {/* </div> */}
        {isGameState === true ? (
          <button
            className={`absolute transition z-[10000] duration-200 hover:scale-[1.05] bg-[rgb(20,20,20)] rounded-[.5rem] left-[2rem] font-mono text-white text-2xl top-[2rem] p-4`}
            onClick={() => handleStartFinishGame()}
          >
            Settings
          </button>
        ) : (
          <SettingWindow></SettingWindow>
        )}
        <section
          style={{ transform: "translateZ(-5rem)" }}
          className={`${
            isGameState === true ? "relative" : "absolute"
          } perspective-[1500px] place-self-center right-6  h-[90vh] transition duration-100 `}
        > {(bodyWidth < 1400 && !isGameState) ? "" : <Field></Field>}
        </section>
        <div
          className={`text-4xl text-white font-mono font-bold absolute bottom-[1rem] left-[1rem]`}
        >
          Memory game by Ernest
        </div>
        {/* background (IT'S WORK!!!) */}
        <div
          className={` transition duration-200 grid absolute  grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-[2rem] z-[-1] grid-rows-[repeat(auto-fill,minmax(100px,1fr))] w-[100vw] top-[0]`}
        >
          {elements}
        </div>
          {/* change theme of game */}
          <div className={`absolute w-[100vw] ${isMode ? "invert" : ""}`}>

        {/* <DarkLight
          onSwichTheme={() => dispatch(setThemeMode())}
          bodyWidth={bodyWidth}
          widthNumber={900}
          side = {isGameState ? true : false}
          name={isMode == true ? "light" : "dark"}
        ></DarkLight> */}
          </div>
      </main>
      {/* <DarkLight></DarkLight> */}
    </>
  );
}
export default Memory;

// thanks for your attention!