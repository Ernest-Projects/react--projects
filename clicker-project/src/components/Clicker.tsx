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

  const [bodyWidth, setBodyWidth] = useState(document.body.offsetWidth);

  // a variable that specifies the width at which the store closes
  const clottingWidth = 1280;

  const [clickerMoney, setClickerMoney] = useLocalStorage("clickerMoney", 0);

  // levels
  const [upgradeLevels, setUpgradeLevels] = useState<Upgrader>(() => {
    const savedLevels = localStorage.getItem("upgradeLevels");
    if (savedLevels) {
      return JSON.parse(savedLevels) as Upgrader;
    }
    const initial: Upgrader = {};
    Object.values(upgradeDataObject).forEach((u) => {
      initial[u.name] = 1;
    });

    return initial;
  });

  const profitLevel = upgradeLevels["profitableLVL"];
  const autoclickLevel = upgradeLevels["autoclickerLVL"];
  const doubleLevel = upgradeLevels["doubleClickLVL"];

  // price (what the hell is going on right here)
  const [upgradePrices, setUpgradePrices] = useState<Upgrader>(() => {
    const savedPrice = localStorage.getItem("upgradePrices");
    if (savedPrice) {
      return JSON.parse(savedPrice) as Upgrader;
    }

    const initial: Upgrader = {};
    Object.values(upgradeDataObject).forEach((u) => {
      initial[u.name] = 100;
    });
    return initial;
  });

  // DOUBLE CLICK UPGRADER
  // the number to be compared to the range of random numbers
  const [doubleClickChance, setDoubleClickChance] = useLocalStorage(
    "doubleClickChance",
    0
  );
  // timer
  const [countdown, setCountdown] = useState(0);
  const [doubleClickBanner, setDoubleClickBanner] = useState(false);
  const prevDoubleRef = useRef(doubleClickChance);

  // uState that generate random namba
  const [randomNumber, setRandomNumber] = useLocalStorage("randomNumber", 0);

  // AUTOCLICKER UPGRADER
  // time for each autoclick (highter level - less time (highter frequency of clicking))
  const [timeEachClick, setTimeEachClick] = useLocalStorage("timeEachClick", 1);
  const prevAutoclickerLevel = useRef(autoclickLevel);

  // PROFIT CLICK UPGRADER
  // multiplier profit coefficient for third upgrader
  const [coefMultiplier, setCoefMultiplier] = useLocalStorage(
    "coefMultiplier",
    1
  );
  const prevProfitRef = useRef(profitLevel);

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


  useEffect(() => {
    if (!doubleClickBanner) return
    setClickerMoney((prev) => prev + (coefMultiplier * 2)) 
    
  },[countClicker])

  // localStorage for price and levels
  useEffect(() => {
    localStorage.setItem("upgradePrices", JSON.stringify(upgradePrices));
  }, [upgradePrices]);

  useEffect(() => {
    localStorage.setItem("upgradeLevels", JSON.stringify(upgradeLevels));
  }, [upgradeLevels]);

  // UPGRADERS
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
    if (
      autoclickLevel !== undefined &&
      prevAutoclickerLevel.current < autoclickLevel
    ) {
      setTimeEachClick((prev) => Number((prev - 0.1).toFixed(2)));
    }
  }, [autoclickLevel]);

  useEffect(() => {
    const interval = setInterval(() => {
      setClickerMoney((prev) => prev + coefMultiplier);
    }, timeEachClick * 1000);
    return () => clearInterval(interval);
  }, [coefMultiplier]);

  //uEffect for first upgrader: double click time
  useEffect(() => {
    if (doubleLevel !== undefined && prevDoubleRef.current < doubleLevel) {
      setDoubleClickChance((prev) => Number(prev + 50));
      console.log("number that depends on the level: ", doubleClickChance);
    }
    prevDoubleRef.current = profitLevel;
  }, [doubleLevel]);
  useEffect(() => {
    if (randomNumber < doubleClickChance && doubleLevel > 1) {
      console.log("truuu");
      setDoubleClickBanner(true);
      setCountdown(10);
    }
  }, [randomNumber, doubleClickChance]);

  useEffect(() => {
    if (!doubleClickBanner) return;
    const inter = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(inter);
          setDoubleClickBanner(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [doubleClickBanner]);

  useEffect(() => {
    if (!doubleClickBanner) return;

    const timer = setTimeout(() => {
      setDoubleClickBanner(false);
      console.log("fallla");
      console.log("random namba:", randomNumber);
    }, 10000);

    return () => clearTimeout(timer);

    // console.log(doubleClickChance);
    // console.log(doubleClickBanner);
  }, [randomNumber, doubleClickChance]);

  // FUNCIONS
  //function for money navbar

  const handleClick = () => {
    setCountClicker((prev) => ++prev);
    setClickerMoney((prev) => Number((prev + coefMultiplier).toFixed(2)));
    if (!doubleClickBanner) {
      setRandomNumber(Number(getRandom().toFixed(0)));
      console.log("number: ", randomNumber);
    }
  };

  // func for random number in double click upgrader genius logic
  const getRandom = () => {
    return Math.random() * (1000 - 1) + 1;
  };

  // Complete reseting clicker game
  const handleResetClicker = () => {
    console.log("RESEET GAME! (fuck you)");
    setClickerMoney(0);
    setUpgradeLevels(() => {
      const reset: Upgrader = {};
      Object.values(upgradeDataObject).forEach((u) => {
        reset[u.name] = 1;
      });
      return reset;
    });
    setUpgradePrices(() => {
      const reset: Upgrader = {};
      Object.values(upgradeDataObject).forEach((u) => {
        reset[u.name] = 100;
      });
      return reset;
    });
    setCountClicker(0);
    setCoefMultiplier(1);
    setDoubleClickChance(0);
  };

  return (
    <>
      <main
        className={`${styles.container} ${
          isMode == true ? "bg-[#d2d2d2]" : "bg-[rgb(35,35,35)]"
        } duration-200 transition z-[1]  relative w-[100vw] h-[100vh]  flex align-center content-center`}
      >
        {/* FUCKING BULLSHIT THIS BACKGROUND!!!*/}
        {/* <div  className={` origin-top-left absolute place-self-center duration-2000 scale-[2.5]  grid z-[-1] `}>
          <img  className={`${isMode === false ? "invert" : ""} filter transition duration-200`}  src= "../public/bg-light.png"></img>
           </div> */}

        <section
          className={`${styles.ShopSection} ${
            isWindowVisible == true && bodyWidth > clottingWidth
              ? "w-[50%]"
              : "w-[0%]"
          } transition-[width]  duration-200  h-[100%] `}
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
          style={{}}
          className={`${
            styles.LogoSection
          } [transform-style:preserve-3d] perspective-500  transition-[width] duration-200 ${
            isWindowVisible == true && bodyWidth > clottingWidth
              ? "w-[50%]"
              : "w-[100%]"
          } grid content-center relative h-[100%] `}
        >
          {/* double click timer */} 
          <div
            className={`text-orange-500 text-center w-[100%] transition duration-20 animate-bounce  top-[5%] ${
              doubleClickBanner === true ? "opacity-100" : "opacity-0"
            } absolute   text-3xl font-mono`}
          >
            {" "}
            Double click timer: {countdown}
          </div>

          <MoneyNavbar
            mode={isMode}
            coefficient={
              doubleClickBanner ? coefMultiplier * 2 : coefMultiplier
            }
            moneyBalance={clickerMoney}
            clickerCount={countClicker}
            doubleClickBanner={doubleClickBanner}
          ></MoneyNavbar>
          <ClickerButton
            mode={isMode}
            coefficient={coefMultiplier}
            autoclickTiming={timeEachClick}
            doubleClickBanner={doubleClickBanner}
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
        className={` ${
          isWindowVisible === true && bodyWidth > 1280
            ? "opacity-0 pointer-events-none"
            : "opacity-100"
        } absolute z-1 group duration-200 active:scale-[.95] left-[1rem] top-[1rem] rounded-[1rem] p-[.8rem] font-mono bg-[rgb(20,20,20)]`}
      >
        Reset Clicker game
        <div
          className={`absolute  w-[120vw] group-active:opacity-[1] pointer-events-none opacity-0 z-[-2] duration-50 top-[-5rem] left-[-5rem] h-[120vh] ${
            isMode == true
              ? "group-active:bg-[rgb(20,20,20)]"
              : "group-active:bg-[rgb(210,210,210)]"
          } `}
        ></div>
      </div>
      {/*connecting package */}
      <DarkLight
        onSwichTheme={() => setIsMode((prev) => !prev)}
        bodyWidth={bodyWidth}
        side = {true}
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
