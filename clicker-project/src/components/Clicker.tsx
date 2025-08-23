import { useEffect, useRef, useState } from "react";
import styles from "./styles/Clicker.module.scss";
import { ClickerButton } from "./clicker-section/ClickerButton";
import { MoneyNavbar } from "./clicker-section/MoneyNavbar";
import { ShopButton } from "./clicker-section/ShopButton";
import { ShopSection } from "./clicker-section/ShopSection";

import { useLocalStorage } from "./hooks/useLocalStorage";
import { DarkLight, Author } from "project-additions";
import { upgradeDataObject } from "../gameData";
// import { upgradeDataObject } from "../gameData";

type Upgrader = {
  [key: string]: number;
};

function Clicker() {
  const [countClicker, setCountClicker] = useLocalStorage("countClicker", 0);
  const [isWindowVisible, setIsWindowVisible] = useLocalStorage(
    "isWindowVisible",
    false
  );
  const [isMode, setIsMode] = useLocalStorage("isMode", false);
  const [bodyWidth, setBodyWidth] = useState(document.body.offsetWidth);

  const clottingWidth = 1280;

  const [clickerMoney, setClickerMoney] = useLocalStorage("clickerMoney", 0);

  // levels
  const [upgradeLevels, setUpgradeLevels] = useState<Upgrader>(() => {
    const initial: Upgrader = {};
    Object.values(upgradeDataObject).forEach((u) => {
      initial[u.name] = 1;
    });

    return initial;
  });
  const profitLevel = upgradeLevels["profitableLVL"];

  // price
  const [upgradePrices, setUpgradePrices] = useState<Upgrader>(() => {
    const initial: Upgrader = {};
    Object.values(upgradeDataObject).forEach((u) => {
      initial[u.name] = 100;
    });

    return initial;
  });

  const [coefMultiplier, setCoefMultiplier] = useState(1);
  
  const prevProfitRef = useRef(profitLevel)

  // -----------------------------------------------------------------------------

  useEffect(() => {
    const offsetBodyWidth = () => {
      setBodyWidth(document.body.offsetWidth);
    };
    window.addEventListener("resize", offsetBodyWidth);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.ctrlKey &&
        (event.key == "q" || event.key == "q".toUpperCase())
      ) {
        event.preventDefault();
        setIsMode((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", offsetBodyWidth);
    };
  }, []);

  useEffect(() => {
    if (profitLevel !== undefined && prevProfitRef.current < profitLevel) {
      setCoefMultiplier((prev) => Number((prev + 0.1).toFixed(1)));
    }
    prevProfitRef.current = profitLevel
  }, [profitLevel]);

  const handleClick = () => {
    setCountClicker((prev) => ++prev);
    setClickerMoney((prev) => prev + 1);
    console.log(clickerMoney);
  };

  return (
    <>
      <main
        className={`${styles.container} ${
          isMode == true ? "bg-[rgb(210,210,210)]" : "bg-[rgb(35,35,35)]"
        }  duration-200 transition relative w-[100vw] h-[100vh] flex align-center content-center`}
      >
        <section
          className={`${styles.ShopSection} ${
            isWindowVisible == true && bodyWidth > clottingWidth
              ? "w-[50%]"
              : "w-[0%]"
          } transition-[width] duration-200  h-[100%] `}
        >
          <ShopSection
            mode={isMode}
            moneyBalance={clickerMoney}
            bodyWidth={bodyWidth}
            increaseLevels={upgradeLevels}
            onIncreaseLevels={setUpgradeLevels}
            upgradePrices={upgradePrices}
            onUpgradePrices={setUpgradePrices}
            isVisible={bodyWidth > clottingWidth ? isWindowVisible : false}
          ></ShopSection>
        </section>

        <section
          style={{ perspective: "800px" }}
          className={`${
            styles.LogoSection
          } [transform-style:preserve-3d] perspective-500  transition-[width] duration-200 ${
            isWindowVisible == true && bodyWidth > clottingWidth
              ? "w-[50%]"
              : "w-[100%]"
          } grid content-center relative h-[100%] `}
        >
          <MoneyNavbar
            mode={isMode}
            coefficient={coefMultiplier}
            moneyBalance={clickerMoney}
            clickerCount={countClicker}
          ></MoneyNavbar>
          <ClickerButton
            mode={isMode}
            coefficient = {coefMultiplier}
            onCountClicker={handleClick}
          ></ClickerButton>
          <ShopButton
            mode={isMode}
            onSetVisible={() => setIsWindowVisible((prev) => !prev)}
            width={bodyWidth}
          ></ShopButton>
        </section>
      </main>
      <div className="">
        <button onClick={() => useLocalStorage("clickerMoney", 0)} className="">
          Reset
        </button>
      </div>
      {/*connecting packages */}
      <DarkLight
        onSwichTheme={() => setIsMode((prev) => !prev)}
        bodyWidth={bodyWidth}
        widthNumber={700}
        mode={isMode}
        name={isMode == true ? "light" : "dark"}
      ></DarkLight>
    </>
  );
}

export default Clicker;
