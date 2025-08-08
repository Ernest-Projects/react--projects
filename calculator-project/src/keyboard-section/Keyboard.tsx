
import {useState} from 'react'
import styles from "./Keyboard.module.scss"
import { KeyData } from "./keyboardData"

type KeyboardProps = {
    onKeyPress: (value: string, allow: boolean) => void;
}
export const Keyboard = ({onKeyPress}: KeyboardProps ) => {
    const keys = Object.entries(KeyData);
    const [isResized, setIsResized] = useState(false);
    // const keyFunction = (value: string, sucess: boolean) => {
    //     onSelectKey(value);
    //     onAllowed(sucess);
    // }
    return (<>
    
    <section className = {styles.keyboard}>
        {keys.map(([key, value]) => {
        return <><button key = {key} onClick = {() => onKeyPress(value.abbr, (value.output == true ? true : false))} className={styles[key]}>{value.abbr == "calc" ? (<span className="material-symbols-outlined">pinch_zoom_out</span>) : (value.abbr)}</button></>
})}
    </section>
    </>)
}