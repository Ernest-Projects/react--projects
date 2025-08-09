
import {forwardRef} from 'react'
import styles from "./Keyboard.module.scss"

type keyboardLayotProps = {
    abbr: string;
    output: boolean
}
type KeyboardProps = {
    onKeyPress: (value: string, allow: boolean) => void;
    isResized: boolean;
    keyboardLayot: Record<string,keyboardLayotProps>;
    bodyWidth: number;
}
export const Keyboard = forwardRef<HTMLElement, KeyboardProps>(({onKeyPress, isResized, keyboardLayot, bodyWidth  }, ref) => {
    const keys = Object.entries(keyboardLayot);
  
    return (<>
    <section ref = {ref} className = {`${styles.keyboard} ${isResized == true && bodyWidth >= 880 ? styles.tableKeyboard : styles.mobileKeyboard}`}>
        {keys.map(([key, value]) => {
        return <><button key = {key} onClick = {() => onKeyPress(value.abbr, (value.output == true ? true : false))} className={`${styles[key]} ${isResized == true && bodyWidth >= 880 ? styles.tableButton : styles.mobileButton}`}>{value.abbr == "calc" ? (<span className="material-symbols-outlined">pinch_zoom_out</span>) : (value.abbr)}</button></>
})}
    </section>
    </>)
})