import Header from "../header/Header";
import { useEffect, useState } from "react";
import styles from "./App.module.scss";
import Convertor from "../converter-windows/curency-window/Convertor";
import { base } from "../data/window-data";
// dark/light package!
import { DarkLight } from "project-additions";

function App() {
  // initializing default converter
  const [selectConverter, setSelectConverter] = useState("weight");
  const [isMode, setIsMode] = useState(false);

  const handleSwich = () => {
    setIsMode((prev) => !prev);
  };
  const handleSelect = (name: string) => {
    setTimeout(() => {
      setSelectConverter(name);
    }, 100);
  };

// hook for keyboard combination to swiching dark/light theme
  useEffect(()=> {
    const handleSwichCombination = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && (event.key == "q" || event.key == "q".toUpperCase())) {
        setIsMode(prev => !prev)
        event.preventDefault();
      }
    }
    window.addEventListener("keydown", handleSwichCombination);
    return () => {window.removeEventListener("keydown", handleSwichCombination)}
  }, [])

  return (
    <>
      <div
        className={`${styles.background} ${
          isMode === true ? styles.backgroundLight : styles.backgroundDark
        }`}
      ></div>
      <Header
        commonClass={`${styles.headerP} ${
          isMode === true ? styles.lightHeaderP : styles.darkHeaderP
        }`}
        onSelect={handleSelect}
      />
      <main className={styles.container}>
        {Object.entries(base).map(([key, converter]) => {
          return (
            <Convertor
              key={key}
              data={converter}
              isActive={selectConverter === key}
              themeMode={isMode}
            />
          );
        })}
      </main>
      <DarkLight
        mode={isMode}
        onSwichTheme={handleSwich}
        name={isMode == false ? "dark" : "light"}
      />
      <p
        className={`${styles.author} ${
          isMode === true ? styles.authorLight : styles.authorDark
        }`}
      >
        {" "}
        Converter by Ernest
      </p>
    </>
  );
}
export default App;
