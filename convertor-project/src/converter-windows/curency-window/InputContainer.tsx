

import React, {useRef} from "react";
import styles from './Window.module.scss'


type InputValueProps = {
    inputValue: string;
    setinputValue: (value:string) => void;
}

const InputContainer: React.FC<InputValueProps> = ({inputValue, setinputValue}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const handleClick = () => {
        inputRef.current?.focus();
    }

    return (<>
     <div className= {styles.inputArea} onClick={handleClick}>
                <input type="text" ref = {inputRef} value = {inputValue} onChange={(e) =>setinputValue(e.target.value)} placeholder="Enter your value..." />
            </div>
    </>)
}


export default InputContainer;