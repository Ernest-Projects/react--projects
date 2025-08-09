

import styles from './Display.module.scss'
import { useEffect, useState } from 'react';
type DisplayProps = {
    pressAllow: boolean;
    pressKey: string;
    pressId: number;
    mode: boolean
}

export const Display = ({pressAllow, pressKey, pressId, mode}: DisplayProps) => {
    const [arrayValues, setArrayValues] = useState("");
    useEffect(()=> {
        if (arrayValues.length < 15) {
            setArrayValues(prev => prev + (pressAllow == true ? pressKey : ""));
        }
    },[pressId])
    
    return (
        <>
        <section className={styles.display}>
            <p className={styles.output} style ={{color: mode == true ? "black" : "white"}}>{arrayValues}</p>
        </section>
        </>)
}