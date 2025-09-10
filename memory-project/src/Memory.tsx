import { useAppSelector, useAppDispatch } from "./hooks";
import styles from "./Memory.module.scss";
import { Field } from "./components/Field";
import { SettingWindow } from "./components/SettingsWindow";

//  imported package!

import { DarkLight } from "project-additions";
import { useEffect, useRef } from "react";
import { setGameStartState } from "./store/store";

function Memory() {
  const sleep = (ms: number) => new Promise((res) => setTimeout(res,ms));
  let elements = [];
  for (let i = 0; i < 125; i++) {
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
  const animate = useAppSelector((state) => state.game.animateActive);
  const dispatch = useAppDispatch();


  const loadingRef = useRef<HTMLDivElement>(null);

  useEffect(()=> {
      const asyncFunction = async () => {
        const loadingStyle = loadingRef.current;
        if (!loadingStyle) return
        loadingStyle.style.opacity = "1";
        loadingStyle.style.pointerEvents = "none";
        await sleep(200);
        loadingStyle.style.opacity = "0";
       
      }
      asyncFunction()
    },[isGameState])

  // background (STUPID)

  return (
    <>
    <div ref={loadingRef} className={`bg-[rgb(25,25,25)] transition duration-200 w-[100vw] h-[100vh] pointer-events-none opacity-0 absolute z-[100]`}></div>
      <main
        
        className={` w-[100vw] flex z-[1] justify-center align-center border relative gap-[1%] bg-[rgb(35,35,35)] m-0 p-[1%]  h-[100vh]`}
      > 
        {/* </div> */}
        {isGameState === true ? <button className={`absolute transition duration-200 hover:scale-[1.05] bg-[rgb(20,20,20)] rounded-[.5rem] left-[2rem] font-mono text-white text-2xl top-[2rem] p-4`} onClick= {() => dispatch(setGameStartState())}>Settings</button> : <SettingWindow></SettingWindow>}
        <section
          style={{ transform: "translateZ(-5rem)" }}
          className={`${isGameState === true ? "relative" : "absolute"} perspective-[1500px]  place-self-center right-6  h-[90vh] transition duration-100 `}
        >
          <Field></Field>
        </section>
        <div
          className={`text-4xl text-white font-mono font-bold absolute bottom-[1rem] left-[1rem]`}
        >
          Memory game by Ernest
        </div>
        {/* background (IT'S WORK) */}
        <div
          className={`grid absolute  grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-[2rem] z-[-1] grid-rows-[repeat(auto-fill,minmax(100px,1fr))] w-[100vw] top-[0]`}
        >
          {elements}
        </div>
      </main>
      {/* <DarkLight></DarkLight> */}
    </>
  )}
export default Memory
