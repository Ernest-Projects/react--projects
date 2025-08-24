import { useEffect, useRef, useState } from "react";
import styles from "./styles/Clicker.module.scss";
import { ClickerButton } from "./clicker-section/ClickerButton";
import { MoneyNavbar } from "./clicker-section/MoneyNavbar";
import { ShopButton } from "./clicker-section/ShopButton";
import { ShopSection } from "./clicker-section/ShopSection";
import { upgradeDataObject } from "../gameData";

import { useLocalStorage } from "./hooks/useLocalStorage";
import { DarkLight } from "project-additions";
// import { upgradeDataObject } from "../gameData";

type Upgrader = {
  [key: string]: number;
};


function Clicker() {
  // useLocalStorage hook!
  const [countClicker, setCountClicker] = useLocalStorage("countClicker", 0);
  const [isWindowVisible, setIsWindowVisible] = useLocalStorage(
    "isWindowVisible",
    false
  );
  
  const [isMode, setIsMode] = useLocalStorage("isMode", false);
  // for dynamic backgroud
  const elements = [];
  for (let i = 0; i < 600; i++) {
    elements.push(<div className={`h-fit z-[-1] duration-200 ${isMode == true ? "": "filter invert"} aspect-[1/1] m-0 p-2 w-[4rem] rotate-[-45deg]`} key={i}><img className="z-[-1]" src="../../public/306186.svg" alt="" /></div>);
  } 
  const [bodyWidth, setBodyWidth] = useState(document.body.offsetWidth);
  
  // a variable that specifies the width at which the store closes
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
  const autoclickLevel = upgradeLevels["autoclickerLVL"]
  
  // price (what the hell is going on right here)
  const [upgradePrices, setUpgradePrices] = useState<Upgrader>(() => {
    const initial: Upgrader = {};
    Object.values(upgradeDataObject).forEach((u) => {
      initial[u.name] = 100;
    });
    return initial;
  });

  // multiplier profit coefficient for third upgrader
  const [coefMultiplier, setCoefMultiplier] = useState(1);
  
  // time for each autoclick (highter level - less time (highter frequency of clicking))
  const [timeEachClick, setTimeEachClick] = useState(2)

  const prevProfitRef = useRef(profitLevel);
  const prevAutoclickerLevel = useRef(autoclickLevel);

  // -----------------------------------------------------------------------------


  // dynamically getting body width
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
  
  
  // increase coef for upgrade price
  // this uEffect for profit click upgrader
  useEffect(() => {
    if (profitLevel !== undefined && prevProfitRef.current < profitLevel) {
      setCoefMultiplier((prev) => Number((prev * 2).toFixed(1)));
    }
    prevProfitRef.current = profitLevel;
  }, [profitLevel]);
  
  // uEffects for autoclicker 
  useEffect(() => {
    if (autoclickLevel !== undefined && prevAutoclickerLevel.current < autoclickLevel) {
      setTimeEachClick((prev) => Number((prev - 0.1).toFixed(1)))
    }
  },[autoclickLevel])
  useEffect(()=> {
    const interval = setInterval(() => {
      setClickerMoney((prev) => prev + coefMultiplier)
    }, (timeEachClick * 1000))
    return () => clearInterval(interval)
  }, [coefMultiplier])


  //function for money navbar 
  const handleClick = () => {
    setCountClicker((prev) => ++prev);
    setClickerMoney((prev) => Number((prev + coefMultiplier).toFixed(2)));
  };

  // Complete reseting clicker game
  const handleResetClicker = () => {
    setClickerMoney(0);
    setCountClicker(0);
    setCoefMultiplier(1);
  };

  return (
    <>
    

      <main
        className={`${styles.container} ${
          isMode == true ? "bg-[rgb(210,210,210)]" : "bg-[rgb(35,35,35)]"
        } duration-200 transition z-[1] relative w-[100vw] h-[100vh] flex align-center content-center`}
      >
        <div  className={`${styles.rotateBackground} pointer-events-none absolute gap-[5rem] place-self-center duration-2000  grid w-[300%] h-[300%] z-[-1] left-[-100%] top-[-100%]  grid-cols-[repeat(auto-fill,minmax(50px,1fr))] `}>{elements} </div>
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
            // decresease money function after upgrade one of upgraders
            decreaseMoney={(price) => setClickerMoney((prev) => prev - price)}
            // for levels
            increaseLevels={upgradeLevels}
            onIncreaseLevels={setUpgradeLevels}
            // for prices
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
            coefficient={coefMultiplier}
            autoclickTiming = {timeEachClick}
            onCountClicker={handleClick}
          ></ClickerButton>
          <ShopButton
            mode={isMode}
            onSetVisible={() => setIsWindowVisible((prev) => !prev)}
            width={bodyWidth}
          ></ShopButton>
        </section>
      </main>
      {/* add reset-button for reset all game*/}
      <div
        onClick={() => handleResetClicker()}
        className="absolute z-1 group duration-200 active:scale-[.95] left-[1rem] top-[1rem] rounded-[1rem] p-[.8rem] font-mono bg-[rgb(20,20,20)]"
      >
        Reset Clicker game
        <div
          className={`absolute  w-[120vw] group-active:opacity-[1] pointer-events-none opacity-0 z-[-100] duration-100 top-[-5rem] left-[-5rem] h-[120vh] group-active:bg-[rgb(20,20,20)] `}
        ></div>
      </div>
      {/*connecting package */}
      <DarkLight
        onSwichTheme={() => setIsMode((prev) => !prev)}
        bodyWidth={bodyWidth}
        widthNumber={700}
        mode={isMode}
        name={isMode == true ? "light" : "dark"}
      ></DarkLight>

      {/* third project 'by Ernest' */}
      <div
        className={`bottom-[1rem] absolute font-mono left-[3rem] font-bold text-[2.3rem] ${
          isMode === true ? "text-black" : "text-white"
        }`}
      >
        Clicker game by Ernest
      </div>

    </>
  );
}

export default Clicker;
// thanks for your attention!