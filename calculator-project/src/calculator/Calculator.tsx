import { useEffect, useState, useRef } from "react";
import styles from "./Calculator.module.scss";
import { Display } from "../display-section/Display";
import { Keyboard } from "../keyboard-section/Keyboard";
import { Author } from "./Author";
import { KeyDataMobile, KeyDataTable } from "../keyboard-section/keyboardData";
// dark/light package!
import {DarkLight} from 'project-additions'
export const Calculator = () => {
  const [pressCount, setPressCount] = useState(0);
  const [isResized, setIsResized] = useState(false);
  const [pressedKey, setPressedKey] = useState<{
    key: string;
    allow: boolean;
    id: number;
  }>({
    key: "",
    allow: false,
    id: 0,
  });
  const [isMode, setIsMode] = useState(false); 
  const keyboardRef = useRef<HTMLElement>(null);
  const [width, setWidth] = useState(document.body.clientWidth);

  const handleSwichMode = () =>{ 
    setIsMode(prev => !prev)
  }
  
  const handlePressing = (key: string, allow: boolean) => {
    setPressCount((prev) => prev + 1);
    setPressedKey({ key, allow, id: pressCount + 1 });
    if (key == "calc") {
      const keyboardStyles = keyboardRef.current;
      if (!keyboardStyles) return;
      keyboardStyles.style.opacity = "0";
      setTimeout(() => {
        setIsResized((prev) => !prev);
        setTimeout(() => {
          keyboardStyles.style.opacity = "1";
        }, 400);
      }, 200);
      console.log(isResized);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key == "r") {
        event.preventDefault();
        const keyboardStyles = keyboardRef.current;
        if (!keyboardStyles) return;
        keyboardStyles.style.opacity = "0";
        setTimeout(() => {
          setIsResized((prev) => !prev);
          setTimeout(() => {
            keyboardStyles.style.opacity = "1";
          }, 400);
        }, 200);
        console.log(`Combination: ${event.ctrlKey} + ${event.key}`);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    const handleSwichModeCombination = (event:KeyboardEvent) => {
      if ((event.ctrlKey) && (event.key == "q" || event.key == "q".toUpperCase())) {
        event.preventDefault()
        setIsMode(prev => !prev);
        console.log(isMode)
      }
    }
    window.addEventListener("keydown", handleSwichModeCombination);

    const onResize = () => {
      setWidth(document.body.clientWidth);
    };

    window.addEventListener("resize", onResize);


    return () => {
      window.removeEventListener("keydown", handleSwichModeCombination);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", onResize);

    };
  }, []);

  return (
    <>
      <main style = {{background: isMode == true ? "rgb(230,230,230)" : "rgb(20,20,20)" }}
        className={`${styles.container} ${
          isResized == true ? styles.tableResize : styles.mobileResize
        }`}
      >
        <Display
        mode = {isMode}
          pressAllow={pressedKey.allow}
          pressKey={pressedKey.key}
          pressId={pressedKey.id}
        />
        <Keyboard
        mode = {isMode}
          ref={keyboardRef}
          keyboardLayot={
            isResized == true && width >= 880 ? KeyDataTable : KeyDataMobile
          }
          isResized={isResized}
          onKeyPress={handlePressing}
          bodyWidth={width}
        />
      </main>
      <Author mode = {isMode}
        authorStyles={{
          authorClass: styles.author,
          authorMobile: styles.authorMobile,
          authorTable: styles.authorTable,
        }}
        isResized = {isResized}
        />
        <DarkLight widthNumber = {850} bodyWidth = {width}  mode = {isMode}
        onSwichTheme={handleSwichMode}
        name = {isMode == false ? "dark" : "light"}/>
        <div style = {{background: isMode == true ? "rgb(250, 250, 250)" : "rgb(35, 35, 35)"}} className={`${styles.background}`}></div>
    </>
  );
};
