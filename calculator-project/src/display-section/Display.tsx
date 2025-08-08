

import styles from './Display.module.scss'
import { useEffect, useState } from 'react';
type DisplayProps = {
    pressAllow: boolean;
    pressKey: string;
    pressId: number
}

export const Display = ({pressAllow, pressKey, pressId}: DisplayProps) => {
    const [arrayValues, setArrayValues] = useState("");
    useEffect(()=> {
        if (arrayValues.length < 15) {
            setArrayValues(prev => prev + (pressAllow == true ? pressKey : ""));
        }
    },[pressId])
    
    return (
        <>
        <section className={styles.display}>
            <p className={styles.output}>{arrayValues}</p>
        </section>
        </>)
}