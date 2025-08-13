import { useState } from 'react'
import  styles from './styles/Clicker.module.scss'
import  {ClickerButton} from './clicker-section/ClickerButton'
import {MoneyNavbar} from './clicker-section/MoneyNavbar'
import { ShopButton } from './clicker-section/ShopButton';


// import {DarkLight} from 'project-additions'
function App() {
  const [countClicker, setCountClicker] = useState(0);
  
    const handleClick = () => {
      setCountClicker(prev => ++prev); }

  
  return (
    <>

    <main className = {`${styles.container} relative w-[100vw] h-[100vh] flex align-center content-center`}>
      <section className={`${styles.ShopSection} w-[50%] h-[100%] border`}>
     
      </section>
     <section className={`${styles.LogoSection} w-[50%] grid content-center h-[100%] border`}>
      <MoneyNavbar clickerCount = {countClicker}></MoneyNavbar>
      <ClickerButton onCountClicker = {handleClick}></ClickerButton>
      <ShopButton></ShopButton>
      </section>
    </main>

    </>
  )
}

export default App
