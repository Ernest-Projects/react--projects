import { useEffect, useState } from "react";
import styles from "./styles/Clicker.module.scss";
import { ClickerButton } from "./clicker-section/ClickerButton";
import { MoneyNavbar } from "./clicker-section/MoneyNavbar";
import { ShopButton } from "./clicker-section/ShopButton";
import { ShopSection } from "./clicker-section/ShopSection";

import {DarkLight, Author} from 'project-additions'


function Clicker() {
  const [countClicker, setCountClicker] = useState(0);

  const [isWindowVisible, setIsWindowVisible] = useState(false);
  const [isMode, setIsMode] = useState(false);

  const [bodyWidth, setBodyWidth] = useState(document.body.offsetWidth);


  useEffect(()=> {
      const offsetBodyWidth = () => {
        setBodyWidth(document.body.offsetWidth);
      }
      window.addEventListener('resize', offsetBodyWidth)
      
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.ctrlKey && (event.key == "q" || event.key == "q".toUpperCase())) {
          event.preventDefault();
          setIsMode(prev => !prev);
        }
      }
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown)
        window.removeEventListener('resize', offsetBodyWidth)
      }
      
  }, [])

  const handleSwichMode = () => {
    setIsMode(prev => !prev)
  }

  const handleClick = () => {
    setCountClicker((prev) => ++prev);
  };

  const handleShopVision = () => {
    setIsWindowVisible((prev) => !prev);
  };

  return (
    <>
      <main
        className={`${styles.container} ${isMode == true ? "bg-[rgb(210,210,210)]" : "bg-[rgb(35,35,35)]"} duration-200 transition relative w-[100vw] h-[100vh] flex align-center content-center`}>
        <section className={`${styles.ShopSection} ${isWindowVisible == true ? "w-[50%]" : "w-[0%]"} transition-[width] duration-200  h-[100%] border`}>
          <ShopSection mode = {isMode} isVisible={isWindowVisible}></ShopSection>
        </section>

        <section
        className={`${styles.LogoSection} transition-[width] duration-200 ${isWindowVisible == true ? "w-[50%]" : "w-[100%]"} grid content-center h-[100%] border`}>
       
          <MoneyNavbar clickerCount={countClicker}></MoneyNavbar>
          <ClickerButton mode = {isMode} onCountClicker={handleClick}></ClickerButton>
          <ShopButton onSetVisible={handleShopVision}></ShopButton>
        
        </section>
      </main>

      {/*connecting packages */}
      <DarkLight onSwichTheme={handleSwichMode} bodyWidth={bodyWidth} widthNumber = {1000}  mode = {isMode} name = {isMode == true ? 'light' : 'dark'} ></DarkLight>
    <Author mode = {isMode} nameAuthor="Clicker game by Ernest"></Author>
    </>
  );
}

export default Clicker;
