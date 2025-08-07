import React, { useRef } from "react";
import styles from "./Window.module.scss";

type InputValueProps = {
  inputValue: string;
  setinputValue: (value: string) => void;
  themeMode: boolean;
};

const InputContainer: React.FC<InputValueProps> = ({
  inputValue,
  setinputValue,
  themeMode,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    inputRef.current?.focus();
  };

  return (
    <>
      <div className={styles.inputArea} onClick={handleClick}>
        <input
          type="text"
          style={{ color: themeMode === true ? "black" : "white" }}
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setinputValue(e.target.value)}
          placeholder="Enter your value..."
        />
      </div>
    </>
  );
};

export default InputContainer;
