import { useEffect, useState, useRef } from "react";
import styles from "./Calculator.module.scss";
import { Display } from "../display-section/Display";
import { Keyboard } from "../keyboard-section/Keyboard";
import { Author } from "./Author";
import { KeyDataMobile, KeyDataTable } from "../keyboard-section/keyboardData";
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

  const keyboardRef = useRef<HTMLElement>(null);
  const [width, setWidth] = useState(document.body.clientWidth);

  useEffect(() => {
    const onResize = () => {
      setWidth(document.body.clientWidth);
    };
    window.addEventListener("resize", onResize);
    console.log(width);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

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

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <>
      <main
        className={`${styles.container} ${
          isResized == true ? styles.tableResize : styles.mobileResize
        }`}
      >
        <Display
          pressAllow={pressedKey.allow}
          pressKey={pressedKey.key}
          pressId={pressedKey.id}
        />
        <Keyboard
          ref={keyboardRef}
          keyboardLayot={
            isResized == true && width >= 880 ? KeyDataTable : KeyDataMobile
          }
          isResized={isResized}
          onKeyPress={handlePressing}
          bodyWidth={width}
        />
      </main>
      <Author
        authorStyles={{
          authorClass: styles.author,
          authorMobile: styles.authorMobile,
          authorTable: styles.authorTable,
        }}
        isResized = {isResized}
      />
    </>
  );
};
