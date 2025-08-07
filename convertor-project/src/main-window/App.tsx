import Header from "../header/Header";
import { useEffect, useState } from "react";
import styles from "./App.module.scss";
import Convertor from "../converter-windows/curency-window/Convertor";
import { base } from "../data/window-data";

function App() {

  // initializing default converter
  const [selectConverter, setSelectConverter] = useState("weight");

  const handleSelect = (name: string) => {
    setTimeout(()=> {
      setSelectConverter(name);  
    },100)
  }

  const convertorChoosing = () => {
    if (selectConverter == "weight") {

    }
  }
  useEffect(() => {
    convertorChoosing();
  }, [selectConverter]);

  return (
    <>
      <Header commonClass={styles.headerP} onSelect = {handleSelect}/>
      <main className={styles.container}>
        {Object.entries(base).map(([key, converter]) => {
          return <Convertor key={key} data={converter} isActive = {selectConverter === key} />;
        })}
      </main>

      <p className={styles.author}> Converter by Ernest</p>
    </>
  );
}
export default App;
