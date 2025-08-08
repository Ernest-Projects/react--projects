import { useEffect, useState,useRef } from 'react'
import styles from './Calculator.module.scss'
import { Display } from '../display-section/Display'
import { Keyboard } from '../keyboard-section/Keyboard'
import {Author} from './Author'
import { KeyData } from '../keyboard-section/keyboardData'
export const Calculator = () => {

  const [pressCount, setPressCount] = useState(0);
  const [pressedKey, setPressedKey] = useState<{key: string, allow: boolean, id: number}>({
    key: "", allow: false, id: 0
  })


  const handlePressing = (key: string, allow: boolean) => {
    setPressCount(prev => prev + 1);
    setPressedKey({key, allow, id: pressCount + 1})

  }




  return (
    <>
    <main className={styles.container}>
            <Display pressAllow = {pressedKey.allow} pressKey = {pressedKey.key} pressId = {pressedKey.id}/>
            <Keyboard onKeyPress = {handlePressing}/>
      </main>
      <Author authorClass = {styles.author}/>
  </>
  )
}

