import { useEffect, useRef, useState } from 'react'
import styles from './Main.module.scss'

import MainCard from '../cards/main-card/Main-card'
import SecondCard from '../cards/second-card /Second-card';
import type { ISecondCard } from '../../../types';

import {cards} from '../../../cards-object'

function PET() {

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const refCont = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])
  useEffect(() => {

    if (windowWidth > 700 && refCont.current) {
      refCont.current.style.gridTemplateColumns = "repeat(3, 1fr)";
    } else if (refCont.current) {
      if (windowWidth < 500) {
        refCont.current.style.gridTemplateColumns = "repeat(1, 1fr)";

      }
      else if (refCont.current) {
        refCont.current.style.gridTemplateColumns = "repeat(2, 1fr)";
        refCont.current.style.backgroundColor = "transparent";
      }
    }
  }, [windowWidth]);


  return <>
    <main ref={refCont} className={styles.MainContainer}>

      {/* main card */}
      <MainCard></MainCard>
      {/* all cards: */}
      {cards.map((card, index) => {
        return (
          <SecondCard name={card.name} content={card.content} componentStyle={card.componentStyle} index={index} ></SecondCard>
        )
      })}
    </main>
  </>
}

export default PET
